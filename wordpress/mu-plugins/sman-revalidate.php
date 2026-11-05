<?php
/**
 * Plugin Name: SMAN Frontend Revalidate Trigger
 * Description: Setiap postingan diterbitkan, diubah, atau dihapus di WordPress,
 *              picu on-demand revalidation di frontend Next.js (tag "wp" +
 *              jalur artikel terkait) supaya konten baru langsung tampil di
 *              situs utama tanpa menunggu ISR 3600 detik dan tanpa perlu
 *              commit atau redeploy manual.
 *
 * Pemasangan: salin berkas ini ke wp-content/mu-plugins/ di instalasi
 * WordPress (cms.sman-modalbangsa.sch.id). Mu-plugin aktif otomatis.
 *
 * Rahasia: endpoint frontend butuh REVALIDATE_SECRET yang sama dengan
 * /opt/sman-fe/.env di server. Plugin membacanya dari, urut pertama yang ada:
 *   1. Konstanta SMAN_REVALIDATE_SECRET (mis. di wp-config.php), atau
 *   2. Berkas sman-revalidate-secret.php di folder mu-plugins yang sama,
 *      isinya satu baris: <?php return '...nilai secret...';
 * Berkas rahasia itu khusus server dan TIDAK ikut repo.
 */

if (!defined('ABSPATH')) {
    exit;
}

// Tipe konten yang tampil di frontend. "post" adalah Berita; sisanya CPT.
const SMAN_REVALIDATE_POST_TYPES = [
    'post',
    'page',
    'agenda',
    'prestasi',
    'pengumuman',
    'editorial',
    'galeri',
    'ekskul',
    'gtk',
    'alumni',
];

// Tipe yang punya jalur detail di frontend (peta sama dengan /api/revalidate).
const SMAN_REVALIDATE_PATH_TYPES = [
    'post',
    'agenda',
    'prestasi',
    'pengumuman',
    'editorial',
    'galeri',
    'ekskul',
];

function sman_revalidate_secret(): string
{
    if (defined('SMAN_REVALIDATE_SECRET') && SMAN_REVALIDATE_SECRET) {
        return (string) SMAN_REVALIDATE_SECRET;
    }
    $secretFile = __DIR__ . '/sman-revalidate-secret.php';
    if (is_readable($secretFile)) {
        $value = include $secretFile;
        if (is_string($value) && $value !== '') {
            return $value;
        }
    }
    return '';
}

function sman_revalidate_frontend_url(): string
{
    if (defined('SMAN_FRONTEND_URL') && SMAN_FRONTEND_URL) {
        return rtrim((string) SMAN_FRONTEND_URL, '/');
    }
    return 'https://sman-modalbangsa.sch.id';
}

function sman_revalidate_fire(string $postType, string $slug): void
{
    // Cegah tembakan ganda untuk konten yang sama dalam satu request.
    static $fired = [];
    $key = $postType . '/' . $slug;
    if (isset($fired[$key])) {
        return;
    }
    $fired[$key] = true;

    $secret = sman_revalidate_secret();
    if ($secret === '') {
        return;
    }

    $url = sman_revalidate_frontend_url() . '/api/revalidate';
    $args = [
        'timeout' => 10,
        'headers' => [
            'Content-Type' => 'application/json',
            'x-revalidate-secret' => $secret,
        ],
    ];

    // 1. Segarkan seluruh data cache bertanda "wp" (beranda + daftar berita).
    wp_remote_post($url, $args + [
        'body' => wp_json_encode(['tag' => 'wp']),
    ]);

    // 2. Segarkan jalur artikel ini secara khusus bila tipenya punya jalur.
    if ($slug !== '' && in_array($postType, SMAN_REVALIDATE_PATH_TYPES, true)) {
        wp_remote_post($url, $args + [
            'body' => wp_json_encode(['type' => $postType, 'slug' => $slug]),
        ]);
    }
}

add_action('transition_post_status', function ($newStatus, $oldStatus, $post) {
    if (!($post instanceof WP_Post)) {
        return;
    }
    if (!in_array($post->post_type, SMAN_REVALIDATE_POST_TYPES, true)) {
        return;
    }
    // Hanya peduli bila konten masuk atau keluar dari status terbit.
    if ($newStatus !== 'publish' && $oldStatus !== 'publish') {
        return;
    }
    $slug = $post->post_name !== '' ? $post->post_name : sanitize_title($post->post_title);
    sman_revalidate_fire($post->post_type, $slug);
}, 10, 3);

// Penghapusan permanen tidak selalu melewati transisi status dari publish
// (mis. dari tong sampah), jadi tangani juga secara eksplisit.
add_action('deleted_post', function ($postId, $post) {
    if (!($post instanceof WP_Post)) {
        return;
    }
    if (!in_array($post->post_type, SMAN_REVALIDATE_POST_TYPES, true)) {
        return;
    }
    $slug = $post->post_name !== '' ? $post->post_name : sanitize_title($post->post_title);
    sman_revalidate_fire($post->post_type, $slug);
}, 10, 2);

// Mengedit isi postingan yang sudah terbit tidak mengubah status, jadi tidak
// tertangkap transition_post_status. Picu dari post_updated bila judul, isi,
// atau kutipan berubah.
add_action('post_updated', function ($postId, $postAfter, $postBefore) {
    if (!($postAfter instanceof WP_Post) || !($postBefore instanceof WP_Post)) {
        return;
    }
    if (!in_array($postAfter->post_type, SMAN_REVALIDATE_POST_TYPES, true)) {
        return;
    }
    if ($postAfter->post_status !== 'publish' || $postBefore->post_status !== 'publish') {
        return;
    }
    if ($postAfter->post_content === $postBefore->post_content
        && $postAfter->post_title === $postBefore->post_title
        && $postAfter->post_excerpt === $postBefore->post_excerpt) {
        return;
    }
    $slug = $postAfter->post_name !== '' ? $postAfter->post_name : sanitize_title($postAfter->post_title);
    sman_revalidate_fire($postAfter->post_type, $slug);
}, 10, 3);
