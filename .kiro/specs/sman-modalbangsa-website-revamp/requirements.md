# Requirements Document

## Introduction

Dokumen ini mendefinisikan kebutuhan untuk **Revamp Portal Resmi SMAN Modal Bangsa** menjadi portal informasi modern berbasis arsitektur *headless CMS*. Frontend dibangun dengan Next.js (App Router) sebagai *Static Site Generation* (SSG) dan *Incremental Static Regeneration* (ISR), sementara konten dinamis (berita) tetap dikelola oleh WordPress yang sudah ada melalui endpoint `https://sman-modalbangsa.sch.id/wp-json/wp/v2/posts`.

Portal harus melayani empat persona utama: Calon Siswa & Orang Tua, Siswa Aktif, Guru & Staf, serta Masyarakat Umum/Alumni. Antarmuka mengadopsi prinsip UI/UX bersih ala portal pemerintahan modern (referensi: jabarprov.go.id) dengan dukungan dwibahasa (Indonesia & Inggris), aksesibilitas WCAG 2.1 AA, performa Lighthouse tinggi, serta integrasi *quick links* ke layanan internal (CBT, SPMB, E-Voting OSIS).

Lingkup dokumen ini adalah kebutuhan fungsional dan non-fungsional untuk situs publik. Pembangunan ulang aplikasi internal (CBT, E-Voting) berada di luar lingkup; portal hanya menyediakan tautan keluar ke aplikasi tersebut.

## Glossary

- **Portal**: Frontend Next.js publik SMAN Modal Bangsa yang dibangun dalam pekerjaan ini.
- **CMS**: WordPress yang sudah ada di `https://sman-modalbangsa.sch.id`, sumber konten berita.
- **WP_API**: Endpoint REST WordPress `https://sman-modalbangsa.sch.id/wp-json/wp/v2/`.
- **News_Service**: Modul Portal yang berkomunikasi dengan WP_API untuk mengambil, melakukan caching, dan menyajikan berita.
- **Renderer**: Komponen Portal yang melakukan parsing dan sanitasi `content.rendered` HTML dari WP_API sebelum ditampilkan.
- **i18n_Service**: Modul internasionalisasi Portal yang mengelola label antarmuka dan konten statis dalam Bahasa Indonesia (ID) dan Bahasa Inggris (EN).
- **Static_Page**: Halaman konten statis yang di-*generate* saat build (Sejarah, Visi & Misi, Fasilitas, Profil Kepala Sekolah, Prestasi, Kontak).
- **Quick_Links**: Pintasan navigasi pada Hero Section menuju layanan eksternal (CBT, SPMB/PPDB, E-Voting OSIS, Pengumuman, Jadwal, Prestasi).
- **Hero_Section**: Bagian utama beranda yang berisi *headline*, *search bar*, dan Quick_Links berbentuk ikon.
- **Bento_Grid**: Tata letak kartu berita dengan ukuran bervariasi pada beranda dan halaman daftar berita.
- **Search_Service**: Modul Portal yang melakukan pencarian berita berdasarkan kata kunci melalui WP_API.
- **Locale**: Kode bahasa aktif Portal, bernilai `id` atau `en`.
- **Default_Locale**: Locale awal yang digunakan ketika pengunjung tidak menentukan preferensi, bernilai `id`.
- **ISR**: *Incremental Static Regeneration*, mekanisme Next.js untuk merevalidasi halaman statis berdasarkan interval waktu.
- **Featured_Image**: Gambar utama post yang berasal dari `_embedded['wp:featuredmedia'][0].source_url` pada respons WP_API.
- **WCAG_AA**: Web Content Accessibility Guidelines versi 2.1 level AA.
- **LCP**: *Largest Contentful Paint*, metrik Core Web Vitals.
- **CLS**: *Cumulative Layout Shift*, metrik Core Web Vitals.
- **INP**: *Interaction to Next Paint*, metrik Core Web Vitals.
- **SEO**: *Search Engine Optimization*.

## Requirements

### Requirement 1: Arsitektur Headless dan Konfigurasi Dasar

**User Story:** Sebagai pengelola sekolah, saya ingin Portal terpisah dari CMS namun tetap mengambil konten dari WordPress yang ada, agar tim konten dapat terus menggunakan WordPress tanpa migrasi data.

#### Acceptance Criteria

1. THE Portal SHALL dibangun menggunakan Next.js dengan App Router, *Server-Side Rendering* (SSR), dan *Static Site Generation* (SSG).
2. THE Portal SHALL menggunakan Tailwind CSS dan ShadCN/UI sebagai sistem desain dasar.
3. THE Portal SHALL membaca *base URL* WP_API dari variabel lingkungan `NEXT_PUBLIC_WP_API_BASE_URL` saat build dan saat runtime.
4. WHEN variabel lingkungan `NEXT_PUBLIC_WP_API_BASE_URL` tidak terdefinisi pada saat build, THE Portal SHALL menggagalkan proses build dengan pesan kesalahan yang menyebutkan nama variabel tersebut.
5. THE Portal SHALL menyajikan halaman beranda, daftar berita, dan halaman Static_Page sebagai SSG dengan ISR berinterval revalidasi maksimum 600 detik.
6. THE Portal SHALL menggunakan font sans-serif modern (Inter atau Plus Jakarta Sans) yang dimuat melalui mekanisme `next/font` agar tidak menimbulkan *flash of unstyled text*.

### Requirement 2: Beranda dan Hero Section

**User Story:** Sebagai pengunjung, saya ingin halaman beranda yang ringkas dan jelas, agar saya dapat menemukan informasi atau layanan yang saya butuhkan dalam waktu singkat.

#### Acceptance Criteria

1. THE Portal SHALL menampilkan Hero_Section pada halaman beranda yang memuat nama sekolah, slogan singkat, satu *search bar*, dan kumpulan Quick_Links berbentuk ikon.
2. THE Hero_Section SHALL menampilkan minimal empat Quick_Links dengan label: Jadwal, Pengumuman, SPMB, dan Prestasi.
3. WHEN pengunjung mengetik kata kunci pada *search bar* Hero_Section dan mengirim formulir, THE Portal SHALL mengarahkan ke halaman daftar berita dengan parameter kueri pencarian terisi kata kunci tersebut.
4. THE Portal SHALL menampilkan delapan berita terbaru pada beranda dalam tata letak Bento_Grid yang memuat thumbnail, judul, kategori, dan tanggal publikasi.
5. WHEN beranda diakses pada lebar viewport kurang dari 768 piksel, THE Portal SHALL menyusun Bento_Grid menjadi satu kolom vertikal.
6. THE Portal SHALL menampilkan blok ringkasan profil sekolah pada beranda dengan tautan menuju halaman Sejarah, Visi & Misi, dan Fasilitas.

### Requirement 3: Portal Berita - Daftar dan Pencarian

**User Story:** Sebagai pengunjung, saya ingin menelusuri dan mencari berita sekolah, agar saya dapat mengikuti perkembangan terbaru SMAN Modal Bangsa.

#### Acceptance Criteria

1. THE News_Service SHALL mengambil daftar berita dari `WP_API/posts?_embed` dengan dukungan parameter `page`, `per_page`, `search`, dan `categories`.
2. THE Portal SHALL menyediakan halaman daftar berita pada rute `/berita` yang menampilkan kartu berita dalam Bento_Grid atau *card grid* dengan thumbnail Featured_Image, judul, ringkasan, kategori, dan tanggal.
3. WHEN pengunjung mengisi kolom pencarian pada halaman daftar berita, THE Search_Service SHALL meminta WP_API dengan parameter `search` berisi kata kunci dan menampilkan hasilnya.
4. WHEN pengunjung memilih satu kategori pada filter, THE News_Service SHALL meminta WP_API dengan parameter `categories` berisi ID kategori yang dipilih.
5. THE Portal SHALL menampilkan kontrol *pagination* dengan ukuran halaman 12 berita per halaman dan menampilkan nomor halaman aktif.
6. IF respons WP_API menghasilkan daftar kosong, THEN THE Portal SHALL menampilkan pesan keadaan kosong dalam Locale aktif disertai tautan kembali ke beranda.
7. IF permintaan ke WP_API gagal atau menghasilkan kode status 5xx, THEN THE Portal SHALL menampilkan pesan kesalahan ramah pengguna dalam Locale aktif dan menyediakan tombol coba lagi.
8. THE News_Service SHALL menerapkan ISR pada halaman daftar berita dengan interval revalidasi maksimum 300 detik.

### Requirement 4: Portal Berita - Halaman Detail

**User Story:** Sebagai pengunjung, saya ingin membaca isi berita lengkap dengan format yang rapi, agar saya memperoleh informasi yang utuh dan kredibel.

#### Acceptance Criteria

1. THE Portal SHALL menyediakan halaman detail berita pada rute `/berita/[id]` dengan parameter `id` berasal dari field `id` WP_API.
2. THE News_Service SHALL mengambil detail berita dari `WP_API/posts/{id}?_embed` saat halaman detail di-*generate* atau divalidasi ulang.
3. THE Renderer SHALL melakukan parsing `content.rendered` menggunakan `html-react-parser` dan sanitasi HTML untuk menghapus elemen `<script>`, atribut `on*`, dan URL `javascript:` sebelum dirender.
4. THE Portal SHALL menampilkan judul berita dari `title.rendered`, tanggal publikasi dari `date` dalam format lokal sesuai Locale aktif, kategori, dan Featured_Image dari `_embedded['wp:featuredmedia'][0].source_url`.
5. THE Portal SHALL merender Featured_Image menggunakan `next/image` dengan atribut `alt` yang diisi dari `_embedded['wp:featuredmedia'][0].alt_text`, atau dari `title.rendered` apabila `alt_text` kosong.
6. IF parameter `id` pada rute tidak cocok dengan post manapun pada WP_API, THEN THE Portal SHALL mengembalikan halaman 404 yang sesuai Locale aktif.
7. THE Portal SHALL menampilkan tiga berita terkait pada bagian bawah halaman detail berdasarkan kesamaan kategori.
8. THE Portal SHALL menyediakan tombol berbagi tautan ke WhatsApp, Facebook, dan salin tautan pada halaman detail berita.
9. THE News_Service SHALL menerapkan ISR pada halaman detail berita dengan interval revalidasi maksimum 600 detik.

### Requirement 5: Halaman Profil dan Informasi Publik

**User Story:** Sebagai calon siswa atau orang tua, saya ingin mengakses informasi profil sekolah yang lengkap, agar saya dapat menilai kelayakan SMAN Modal Bangsa sebagai pilihan pendidikan.

#### Acceptance Criteria

1. THE Portal SHALL menyediakan Static_Page untuk: Sejarah pada `/profil/sejarah`, Visi & Misi pada `/profil/visi-misi`, Fasilitas pada `/profil/fasilitas`, Profil Kepala Sekolah pada `/profil/kepala-sekolah`, dan Prestasi pada `/profil/prestasi`.
2. THE Portal SHALL menyediakan Static_Page Kontak pada `/kontak` yang memuat alamat, peta lokasi *embed*, nomor telepon, surel, dan tautan media sosial resmi.
3. THE Portal SHALL menyimpan konten Static_Page dalam berkas sumber repositori (mis. MDX atau JSON) dalam dua versi Locale: `id` dan `en`.
4. WHEN Locale aktif berubah, THE Portal SHALL menampilkan versi konten Static_Page yang sesuai dengan Locale tersebut tanpa mengarahkan pengunjung keluar dari halaman yang sedang dibuka.
5. THE Portal SHALL menampilkan menu sub-navigasi pada bagian Profil yang berisi tautan ke seluruh Static_Page profil.
6. WHERE halaman Prestasi memuat daftar prestasi, THE Portal SHALL menampilkan setiap prestasi dengan judul, tahun, tingkat (sekolah, kabupaten, provinsi, nasional, internasional), dan keterangan singkat.

### Requirement 6: Sistem Multibahasa (i18n)

**User Story:** Sebagai pengunjung internasional atau alumni di luar negeri, saya ingin mengakses Portal dalam Bahasa Inggris, agar saya memahami informasi sekolah tanpa hambatan bahasa.

#### Acceptance Criteria

1. THE i18n_Service SHALL mendukung dua Locale dengan kode `id` (Bahasa Indonesia) dan `en` (Bahasa Inggris).
2. THE Portal SHALL menggunakan `id` sebagai Default_Locale.
3. THE Portal SHALL menyediakan tombol pengalih bahasa pada navigasi atas yang menampilkan Locale aktif dan opsi Locale lainnya.
4. WHEN pengunjung menekan tombol pengalih bahasa, THE Portal SHALL berpindah ke Locale yang dipilih dan tetap pada halaman yang sedang dibuka.
5. THE Portal SHALL menyimpan preferensi Locale terakhir pada *cookie* bernama `NEXT_LOCALE` dengan masa berlaku minimal 365 hari.
6. THE i18n_Service SHALL menerjemahkan label navigasi, *footer*, tombol, pesan kesalahan, pesan keadaan kosong, dan seluruh konten Static_Page ke dalam dua Locale.
7. WHERE konten berita berasal dari WP_API dan hanya tersedia dalam Bahasa Indonesia, THE Portal SHALL menampilkan konten asli tanpa terjemahan otomatis dan menampilkan label informatif dalam Locale aktif yang menyatakan bahwa konten berita disajikan dalam Bahasa Indonesia.
8. THE Portal SHALL merefleksikan Locale aktif pada atribut `lang` elemen `<html>` setiap halaman.

### Requirement 7: Quick Links ke Layanan Eksternal

**User Story:** Sebagai siswa aktif, saya ingin akses cepat ke layanan internal sekolah dari beranda, agar saya tidak perlu mengingat URL masing-masing aplikasi.

#### Acceptance Criteria

1. THE Portal SHALL menyediakan Quick_Links menuju layanan: CBT, SPMB/PPDB, dan E-Voting OSIS.
2. THE Portal SHALL membaca URL tujuan setiap Quick_Link dari berkas konfigurasi dalam repositori.
3. WHEN pengunjung memilih satu Quick_Link, THE Portal SHALL membuka URL tujuan pada tab baru dengan atribut `rel="noopener noreferrer"`.
4. WHERE URL tujuan suatu Quick_Link belum dikonfigurasi, THE Portal SHALL menyembunyikan Quick_Link tersebut dari tampilan.
5. THE Portal SHALL menampilkan setiap Quick_Link dengan ikon, label dalam Locale aktif, dan deskripsi pendek satu kalimat.

### Requirement 8: Aksesibilitas

**User Story:** Sebagai pengguna dengan keterbatasan motorik atau penglihatan, saya ingin mengakses Portal dengan teknologi bantu, agar saya memperoleh informasi yang setara dengan pengguna lainnya.

#### Acceptance Criteria

1. THE Portal SHALL memenuhi WCAG_AA pada seluruh halaman publik.
2. THE Portal SHALL menyediakan navigasi penuh menggunakan papan ketik tanpa membutuhkan tetikus.
3. THE Portal SHALL menampilkan indikator fokus visual pada setiap elemen interaktif yang menerima fokus papan ketik.
4. THE Portal SHALL menjaga rasio kontras teks terhadap latar minimal 4.5:1 untuk teks normal dan 3:1 untuk teks besar.
5. THE Portal SHALL menyediakan atribut `alt` deskriptif untuk setiap gambar konten dan atribut `alt` kosong untuk gambar dekoratif.
6. THE Portal SHALL menggunakan elemen *landmark* HTML5 (`<header>`, `<nav>`, `<main>`, `<footer>`) dan struktur judul hierarkis (`<h1>` hingga `<h6>`) yang konsisten pada setiap halaman.
7. THE Portal SHALL menyediakan tautan *skip to main content* yang muncul saat menerima fokus papan ketik pertama pada setiap halaman.
8. WHEN pengunjung mengaktifkan preferensi sistem `prefers-reduced-motion`, THE Portal SHALL menonaktifkan animasi non-esensial.

### Requirement 9: Performa dan SEO

**User Story:** Sebagai pengelola sekolah, saya ingin Portal cepat dan mudah ditemukan di mesin pencari, agar lebih banyak calon siswa mengetahui SMAN Modal Bangsa.

#### Acceptance Criteria

1. THE Portal SHALL mencapai skor Lighthouse minimum 90 pada kategori Performance, Accessibility, Best Practices, dan SEO untuk halaman beranda, daftar berita, dan detail berita pada simulasi *mobile* tier menengah.
2. THE Portal SHALL menjaga LCP di bawah 2.5 detik, CLS di bawah 0.1, dan INP di bawah 200 milidetik pada halaman beranda dan halaman detail berita.
3. THE Portal SHALL menyajikan setiap halaman dengan tag `<title>` unik dan *meta description* unik dalam Locale aktif.
4. THE Portal SHALL menyajikan tag *Open Graph* (`og:title`, `og:description`, `og:image`, `og:url`, `og:locale`) dan *Twitter Card* pada setiap halaman.
5. THE Portal SHALL menyajikan `sitemap.xml` yang memuat seluruh halaman publik dan kedua versi Locale.
6. THE Portal SHALL menyajikan `robots.txt` yang mengizinkan *crawler* mengindeks lingkungan produksi dan melarang pengindeksan lingkungan non-produksi.
7. THE Portal SHALL menyertakan data terstruktur `NewsArticle` (schema.org) pada halaman detail berita.
8. THE Portal SHALL melayani Featured_Image dan gambar konten dalam format modern (WebP atau AVIF) menggunakan `next/image`.

### Requirement 10: Keamanan dan Penanganan Konten

**User Story:** Sebagai pengelola sekolah, saya ingin Portal menampilkan konten WordPress secara aman, agar pengunjung tidak terkena risiko skrip berbahaya.

#### Acceptance Criteria

1. THE Renderer SHALL menerapkan sanitasi terhadap `content.rendered` dengan *allowlist* tag dan atribut yang aman sebelum konten dirender ke DOM.
2. THE Portal SHALL menyajikan *header* HTTP `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, dan `X-Frame-Options: DENY` pada seluruh respons halaman.
3. THE Portal SHALL menggunakan HTTPS pada lingkungan produksi.
4. IF Renderer menemukan tag atau atribut di luar *allowlist*, THEN THE Renderer SHALL menghapus tag atau atribut tersebut dan tetap merender sisa konten.
5. THE Portal SHALL membatasi domain sumber gambar `next/image` pada `next.config` hanya pada domain CMS dan domain unggahan resmi sekolah.

### Requirement 11: Penanganan Kesalahan dan Keadaan Loading

**User Story:** Sebagai pengunjung, saya ingin mengetahui apa yang terjadi ketika halaman gagal dimuat, agar saya tahu langkah apa yang dapat saya lakukan.

#### Acceptance Criteria

1. THE Portal SHALL menampilkan halaman 404 khusus dengan pesan dan tautan kembali ke beranda dalam Locale aktif untuk setiap rute yang tidak dikenali.
2. THE Portal SHALL menampilkan halaman 500 khusus dalam Locale aktif untuk setiap kesalahan tak tertangani pada *server*.
3. WHILE halaman atau komponen sedang memuat data, THE Portal SHALL menampilkan *skeleton placeholder* yang menjaga ukuran tata letak agar CLS tidak meningkat.
4. IF permintaan ke WP_API melebihi 8 detik, THEN THE News_Service SHALL membatalkan permintaan dan menampilkan pesan kesalahan beserta tombol coba lagi.
5. THE Portal SHALL mencatat kesalahan *server* tak tertangani ke layanan logging terpadu beserta jejak permintaan tanpa menyertakan data sensitif pengguna.

### Requirement 12: Caching dan Pembaruan Konten

**User Story:** Sebagai tim konten, saya ingin perubahan berita di WordPress tampil pada Portal dalam waktu yang dapat diprediksi, agar siklus publikasi berjalan lancar.

#### Acceptance Criteria

1. THE News_Service SHALL melakukan *fetch* ke WP_API dengan opsi `next: { revalidate: <interval> }` di mana `<interval>` paling besar 300 detik untuk daftar berita dan 600 detik untuk detail berita.
2. WHERE Portal menerima permintaan *webhook* revalidasi pada rute `/api/revalidate` dengan token rahasia yang valid, THE Portal SHALL melakukan revalidasi tag atau path yang ditentukan dalam *payload*.
3. IF *webhook* revalidasi diterima dengan token tidak valid atau tidak ada, THEN THE Portal SHALL menolak permintaan dengan kode status 401.
4. THE News_Service SHALL menggunakan tag *cache* per kategori dan per post agar revalidasi terarah dapat dilakukan.

### Requirement 13: Deployment dan Lingkungan

**User Story:** Sebagai tim teknis, saya ingin proses deployment Portal otomatis dan terbedakan antar lingkungan, agar perubahan dapat diuji sebelum tampil ke publik.

#### Acceptance Criteria

1. THE Portal SHALL memiliki minimal dua lingkungan: *staging* dan *production*, masing-masing dengan domain dan variabel lingkungan terpisah.
2. WHEN sebuah *commit* didorong ke *branch* `main`, THE pipeline deployment SHALL membangun Portal dan menerbitkannya ke lingkungan production.
3. WHEN sebuah *pull request* dibuka terhadap *branch* `main`, THE pipeline deployment SHALL membangun Portal dan menerbitkannya ke lingkungan *preview* atau *staging* dengan URL terpisah.
4. THE Portal SHALL menjalankan *type-check*, *lint*, dan *unit test* pada pipeline sebelum tahap *build* produksi.
5. IF salah satu tahap *type-check*, *lint*, atau *unit test* gagal, THEN THE pipeline deployment SHALL menghentikan proses dan tidak menerbitkan ke lingkungan production.
6. THE Portal SHALL menyajikan *endpoint* `/api/health` yang mengembalikan kode status 200 dan *payload* JSON memuat versi build serta cap waktu saat layanan sehat.

### Requirement 14: Pemetaan Data WP-JSON

**User Story:** Sebagai pengembang frontend, saya ingin pemetaan data WP-JSON ke komponen Portal terdefinisi tegas, agar implementasi konsisten dan mudah dipelihara.

#### Acceptance Criteria

1. THE News_Service SHALL memetakan field `id` WP_API ke segmen rute dinamis `[id]` pada rute `/berita/[id]`.
2. THE Portal SHALL menampilkan `title.rendered` sebagai judul berita pada kartu berita dan halaman detail.
3. THE Renderer SHALL menerima `content.rendered` sebagai sumber isi berita pada halaman detail.
4. THE Portal SHALL menampilkan `excerpt.rendered` sebagai deskripsi pada kartu berita dengan tag HTML dihapus dan dipotong maksimum 180 karakter ketika ditampilkan pada Bento_Grid.
5. THE Portal SHALL menampilkan `date` sebagai tanggal publikasi yang diformat sesuai Locale aktif (`id-ID` untuk `id`, `en-US` untuk `en`).
6. THE Portal SHALL menggunakan `_embedded['wp:featuredmedia'][0].source_url` sebagai sumber Featured_Image pada `next/image`.
7. WHERE field `_embedded['wp:featuredmedia']` tidak tersedia pada respons, THE Portal SHALL menampilkan gambar *placeholder* default yang disediakan dalam aset Portal.
8. THE News_Service SHALL membaca daftar kategori dari `_embedded['wp:term'][0]` dan menampilkan nama kategori pertama pada kartu berita.
