"use client";

import * as React from "react";
import {
  Smartphone,
  Apple,
  Download,
  Shield,
  KeyRound,
  AlertTriangle,
  CheckCircle2,
  LogIn,
  Clock,
  MousePointerClick,
  Send,
  Wrench,
  Phone,
  Lock,
  MonitorSmartphone,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/ui/container";

// ============ Step Accordion ============

const guideSteps = [
  {
    id: "login",
    icon: LogIn,
    title: "Login Pertama Kali",
    items: [
      "Buka aplikasi EXAM AA / Safe Exam Browser",
      "Login menggunakan Username: NISN & Password Default: 12345678",
      "Sistem akan meminta Anda mengganti password",
      "Buat password baru minimal 8 karakter",
      "Simpan dan ingat password Anda dengan baik",
    ],
    note: "Jika lupa password, segera hubungi Tim IT Sekolah.",
  },
  {
    id: "before",
    icon: Clock,
    title: "Sebelum Ujian Dimulai",
    items: [
      "Login menggunakan NISN dan password Anda",
      "Pilih ruang ujian sesuai jadwal",
      "Masukkan Token Ujian dari pengawas",
      "Tekan tombol Mulai Ujian",
      "Countdown waktu akan tampil di bagian atas layar",
    ],
  },
  {
    id: "during",
    icon: MousePointerClick,
    title: "Selama Ujian Berlangsung",
    items: [
      "Klik/tap pilihan jawaban untuk menjawab soal",
      "Jawaban tersimpan otomatis setiap memilih opsi",
      "Gunakan tombol navigasi (\u25C0 \u25B6) atau nomor soal untuk berpindah",
      "Soal yang belum dijawab ditandai warna berbeda",
      "Jawaban dapat diubah kapan saja selama waktu belum habis",
    ],
  },
  {
    id: "end",
    icon: Send,
    title: "Mengakhiri Ujian",
    items: [
      "Pastikan seluruh soal telah dijawab",
      "Tekan tombol Selesai / Submit",
      "Konfirmasi pengumpulan jawaban",
      "Sistem akan memproses hasil ujian secara otomatis",
      "Untuk keluar aplikasi gunakan password: quit",
    ],
  },
];

function GuideAccordion() {
  const [open, setOpen] = React.useState<string>("login");

  return (
    <div className="divide-y divide-[color:var(--border)] rounded-xl border border-[color:var(--border)] bg-white">
      {guideSteps.map((step) => {
        const Icon = step.icon;
        const isOpen = open === step.id;
        return (
          <div key={step.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? "" : step.id)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50"
            >
              <Icon className="size-4 shrink-0 text-[color:var(--primary)]" />
              <span className="flex-1 text-sm font-semibold text-[color:var(--foreground)]">
                {step.title}
              </span>
              <span
                className={`text-xs text-[color:var(--muted-foreground)] transition-transform ${isOpen ? "rotate-90" : ""}`}
              >
                ›
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-[color:var(--border)] bg-gray-50/50 px-5 py-4">
                <ol className="space-y-2">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[color:var(--muted-foreground)]">
                      <span className="mt-px shrink-0 text-xs font-semibold text-[color:var(--primary)]">
                        {i + 1}.
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
                {step.note && (
                  <p className="mt-3 text-xs text-amber-700">⚠️ {step.note}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============ Main Content ============

export function CbtContent() {
  return (
    <section className="py-10 sm:py-14">
      <Container size="lg">
        {/* Intro */}
        <div className="rounded-xl border border-[color:var(--border)] bg-white p-5 sm:p-6">
          <div className="flex gap-4">
            <MonitorSmartphone className="mt-0.5 size-5 shrink-0 text-[color:var(--primary)]" />
            <div>
              <h2 className="text-base font-semibold text-[color:var(--foreground)]">
                Informasi Download & Panduan Aplikasi Ujian CBT
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                Kepada seluruh siswa/i SMA Negeri Modal Bangsa, berikut informasi resmi
                mengenai aplikasi yang <strong>wajib</strong> digunakan selama pelaksanaan
                Ujian CBT. Pastikan aplikasi sudah terinstall dan dapat digunakan sebelum
                hari ujian berlangsung.
              </p>
            </div>
          </div>
        </div>

        {/* Download Cards */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Android */}
          <div className="rounded-xl border border-[color:var(--border)] bg-white">
            <div className="flex items-center gap-3 border-b border-[color:var(--border)] px-5 py-4">
              <Smartphone className="size-5 text-green-600" />
              <div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  Android — Aplikasi EXAM AA
                </p>
              </div>
            </div>
            <div className="p-5">
              <a
                href="https://s.id/exam-mosa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
              >
                <Download className="size-3.5" />
                Download APK
                <ExternalLink className="size-3 opacity-60" />
              </a>

              <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">
                Cara Install
              </h4>
              <ol className="space-y-1.5 text-sm text-[color:var(--muted-foreground)]">
                <li>1. Klik link download lalu tekan tombol Download</li>
                <li>2. Buka file APK yang sudah terdownload</li>
                <li>
                  3. Jika muncul peringatan, aktifkan{" "}
                  <span className="font-medium text-[color:var(--foreground)]">
                    Sumber Tidak Dikenal
                  </span>{" "}
                  di Pengaturan → Keamanan
                </li>
                <li>4. Tunggu proses instalasi selesai</li>
                <li>5. Buka aplikasi, pilih SMA Negeri Modal Bangsa</li>
              </ol>

              <div className="mt-5 rounded-lg bg-gray-50 p-3">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[color:var(--foreground)]">
                  <Shield className="size-3" />
                  Fitur Keamanan
                </p>
                <ul className="space-y-0.5 text-xs text-[color:var(--muted-foreground)]">
                  <li>• Layar terkunci otomatis saat ujian</li>
                  <li>• Tidak dapat membuka aplikasi lain</li>
                  <li>• Screenshot & screen recording dinonaktifkan</li>
                  <li>• Deteksi aktivitas kecurangan</li>
                  <li>• Mode fullscreen otomatis</li>
                </ul>
              </div>
            </div>
          </div>

          {/* iPhone / iPad */}
          <div className="rounded-xl border border-[color:var(--border)] bg-white">
            <div className="flex items-center gap-3 border-b border-[color:var(--border)] px-5 py-4">
              <Apple className="size-5 text-gray-700" />
              <div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  iPhone / iPad — Safe Exam Browser
                </p>
              </div>
            </div>
            <div className="p-5">
              <a
                href="https://s.id/exam-mosa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900"
              >
                <Download className="size-3.5" />
                Download Konfigurasi (.seb)
                <ExternalLink className="size-3 opacity-60" />
              </a>

              <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">
                Cara Install & Penggunaan
              </h4>
              <ol className="space-y-1.5 text-sm text-[color:var(--muted-foreground)]">
                <li>1. Buka App Store, install Safe Exam Browser (gratis)</li>
                <li>2. Download file konfigurasi (.seb) dari link di atas</li>
                <li>3. Buka file .seb yang sudah didownload</li>
                <li>4. File otomatis terbuka di Safe Exam Browser</li>
                <li>5. Aplikasi mengarahkan ke halaman ujian sekolah</li>
              </ol>

              <div className="mt-5 rounded-lg bg-gray-50 p-3">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[color:var(--foreground)]">
                  <Shield className="size-3" />
                  Fitur Keamanan
                </p>
                <ul className="space-y-0.5 text-xs text-[color:var(--muted-foreground)]">
                  <li>• Tidak dapat keluar ke home screen</li>
                  <li>• Screenshot & screen recording dinonaktifkan</li>
                  <li>• Tidak dapat membuka aplikasi lain</li>
                  <li>• Siri & Notification Center diblokir</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notices */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {/* Exit Password */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-2">
              <KeyRound className="size-4 text-amber-600" />
              <h3 className="text-sm font-semibold text-amber-900">
                Password Keluar Aplikasi
              </h3>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-lg bg-white p-3">
              <Lock className="size-4 text-amber-500" />
              <div>
                <p className="text-xs text-[color:var(--muted-foreground)]">Ketik pada kolom password keluar:</p>
                <code className="mt-0.5 inline-block font-mono text-lg font-bold text-amber-900">
                  quit
                </code>
              </div>
            </div>
            <p className="mt-3 text-xs text-amber-700">
              Tanpa tanda kutip. Muncul saat menekan tombol keluar/selesai ujian.
            </p>
          </div>

          {/* Prohibited */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-red-600" />
              <h3 className="text-sm font-semibold text-red-900">Dilarang Keras</h3>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-red-800">
              <li className="flex items-start gap-2">
                <span className="text-red-400">✕</span>
                Force close / swipe close aplikasi
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✕</span>
                Restart HP saat ujian berlangsung
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✕</span>
                Mematikan HP secara paksa
              </li>
            </ul>
            <p className="mt-3 text-xs text-red-600">
              Tercatat sebagai pelanggaran. Ujian dapat terkunci otomatis.
            </p>
          </div>
        </div>

        {/* Usage Guide */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-[color:var(--foreground)]">
            Panduan Penggunaan CBT
          </h2>
          <GuideAccordion />
        </div>

        {/* Troubleshooting */}
        <div className="mt-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[color:var(--foreground)]">
            <Wrench className="size-4" />
            Jika Terjadi Kendala
          </h2>
          <div className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[color:var(--border)] bg-gray-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-[color:var(--muted-foreground)]">
                    Masalah
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-[color:var(--muted-foreground)]">
                    Solusi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border)]">
                {[
                  ["Aplikasi tidak bisa dibuka", "Restart HP lalu buka kembali"],
                  ["Tidak bisa login", "Pastikan NISN benar, hubungi Tim IT"],
                  ["Ujian terkunci", "Angkat tangan, minta bantuan pengawas"],
                  ["Koneksi terputus", "Jawaban tetap tersimpan, tunggu koneksi kembali"],
                  ["Waktu habis", "Jawaban otomatis terkirim"],
                ].map(([problem, solution]) => (
                  <tr key={problem}>
                    <td className="px-5 py-3 font-medium text-[color:var(--foreground)]">
                      {problem}
                    </td>
                    <td className="px-5 py-3 text-[color:var(--muted-foreground)]">
                      {solution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Checklist */}
        <div className="mt-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[color:var(--foreground)]">
            <CheckCircle2 className="size-4 text-[color:var(--primary)]" />
            Checklist Persiapan Ujian
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Aplikasi sudah terinstall dan dapat dibuka",
              "Sudah login dan mengganti password default",
              "Baterai HP minimal 80% atau sambil di-charge",
              "Koneksi WiFi sekolah stabil",
              "Sudah mengetahui NISN dan password login",
              "Sudah mengetahui password keluar: quit",
              "HP dalam kondisi baik dan tidak lemot",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 rounded-lg border border-[color:var(--border)] bg-white px-4 py-3"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[color:var(--primary)]" />
                <span className="text-sm text-[color:var(--foreground)]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="mt-10 rounded-xl border border-[color:var(--border)] bg-white p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-[color:var(--primary)]" />
            <div>
              <h3 className="text-sm font-semibold text-[color:var(--foreground)]">
                Bantuan Teknis
              </h3>
              <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                Jika mengalami kendala, hubungi Tim IT SMA Negeri Modal Bangsa atau
                pengawas ujian di ruangan. Lakukan instalasi dan uji coba jauh hari
                sebelum ujian.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-[color:var(--border)] pt-8 text-center">
          <p className="text-base font-semibold text-[color:var(--foreground)]">
            Selamat Mempersiapkan Ujian
          </p>
          <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
            Semoga sukses dan mendapatkan hasil terbaik.
          </p>
          <p className="mt-1 text-xs text-[color:var(--muted-foreground)]">
            — Tim IT SMA Negeri Modal Bangsa
          </p>
        </div>
      </Container>
    </section>
  );
}
