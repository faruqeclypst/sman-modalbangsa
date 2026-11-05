export interface FAQItem {
  q: string;
  a: string;
}

export interface PJJStepItem {
  num: string;
  title: string;
  mode: string;
  desc: string;
}

export interface ContactPerson {
  name: string;
  phone: string;
  role: string;
  waNumber: string; // E.164 digits only, e.g. 6285261234567
}

export interface PartnerSchool {
  no: number;
  kabupaten: string;
  sekolah: string;
  status: string;
  contacts: ContactPerson[];
}

export interface ScheduleItem {
  kegiatan: string;
  tanggal: string;
}

// Jadwal SPMB Jalur Undangan dan Prestasi TA 2027/2028, sesuai Draft SPMB 2027 dari panitia.
export const getSpmbSchedule = (isId: boolean): ScheduleItem[] => [
  {
    kegiatan: isId ? "Sosialisasi ke Sekolah Undangan" : "Outreach to Invited Schools",
    tanggal: isId ? "4 s.d 8 November 2026" : "November 4 to 8, 2026",
  },
  {
    kegiatan: isId ? "Zoom Meeting dengan Sekolah Undangan" : "Zoom Meeting with Invited Schools",
    tanggal: "9 November 2026",
  },
  {
    kegiatan: isId ? "Pendaftaran Via Web SPMB" : "Registration via the SPMB Website",
    tanggal: isId ? "9 s.d 13 November 2026" : "November 9 to 13, 2026",
  },
  {
    kegiatan: isId ? "Verifikasi Berkas Online (oleh panitia)" : "Online Document Verification (by the committee)",
    tanggal: isId ? "10 s.d 13 November 2026" : "November 10 to 13, 2026",
  },
  {
    kegiatan: isId
      ? "Pengumuman Kelulusan Verifikasi Berkas Online (cek di akun SPMB siswa)"
      : "Announcement of Online Document Verification Results (check your SPMB student account)",
    tanggal: "13 November 2026",
  },
  {
    kegiatan: isId ? "Tes Akademik dan Wawancara" : "Academic Test and Interview",
    tanggal: "14 November 2026",
  },
  {
    kegiatan: isId ? "Tes Kesehatan dan Fisik" : "Health and Physical Test",
    tanggal: "15 November 2026",
  },
  {
    kegiatan: isId
      ? "Pengumuman Akhir Kelulusan SPMB Jalur Undangan dan Prestasi"
      : "Final Admission Announcement for the Invitation and Achievement Tracks",
    tanggal: "17 November 2026",
  },
];

// Syarat Umum SPMB TA 2027/2028, sesuai Draft SPMB 2027 dari panitia.
// Berlaku untuk semua jalur, termasuk Jalur Reguler (Reguler belum dibuka).
export const getSpmbGeneralRequirements = (isId: boolean): string[] =>
  isId
    ? [
        "Siswa aktif kelas III SMP/MTs tahun pelajaran 2026/2027.",
        "Nilai rapor minimal 85,00 untuk mata pelajaran Matematika, IPA, Bahasa Indonesia, Bahasa Inggris, dan Agama pada semester 2, 3, dan 4.",
        "Mampu membaca Al-Quran dengan benar dan lancar.",
        "Memiliki kemampuan dasar berbahasa Inggris.",
        "Berbadan sehat, tidak cacat fisik yang dapat mengganggu kegiatan pembelajaran.",
        "Sanggup tinggal di asrama selama pendidikan.",
      ]
    : [
        "Active third-year SMP/MTs student in the 2026/2027 academic year.",
        "Minimum report card grade of 85.00 in Mathematics, Science, Indonesian, English, and Religion for semesters 2, 3, and 4.",
        "Able to recite the Qur'an correctly and fluently.",
        "Has basic English language skills.",
        "Physically healthy, with no physical condition that would interfere with learning activities.",
        "Willing to live in the dormitory throughout the education period.",
      ];

// Dokumen yang perlu disiapkan pendaftar SPMB TA 2027/2028 (daftar dari panitia).
export const getSpmbDocuments = (isId: boolean): string[] =>
  isId
    ? [
        "Pas foto 3×4.",
        "Kartu Keluarga (KK).",
        "Rapor semester 2, 3, dan 4.",
        "Surat Rekomendasi (khusus Jalur Undangan).",
        "Surat Aktif (khusus Jalur Prestasi).",
        "Sertifikat Prestasi (khusus Jalur Prestasi).",
      ]
    : [
        "3×4 passport-sized photo.",
        "Family Card (Kartu Keluarga).",
        "Report cards for semesters 2, 3, and 4.",
        "Recommendation Letter (Invitation Track only).",
        "Active Student Letter (Achievement Track only).",
        "Achievement Certificate (Achievement Track only).",
      ];

export interface DocumentFormat {
  label: string;
  href: string;
}

// Format surat resmi untuk diunduh pendaftar (berkas Word di Media WordPress).
export const getSpmbDocumentFormats = (isId: boolean): DocumentFormat[] => [
  {
    label: isId
      ? "Unduh Format Surat Rekomendasi Kepala Sekolah (Word)"
      : "Download the Principal Recommendation Letter Format (Word)",
    href: "https://cms.sman-modalbangsa.sch.id/wp-content/uploads/2026/11/Format-Surat_Rekomendasi_Kepala_Sekolah.docx",
  },
  {
    label: isId
      ? "Unduh Format Surat Keterangan Aktif Siswa (Word)"
      : "Download the Active Student Certificate Format (Word)",
    href: "https://cms.sman-modalbangsa.sch.id/wp-content/uploads/2026/11/Format-Surat_Aktif_Siswa.docx",
  },
];

export const getSpmbFaqs = (isId: boolean): FAQItem[] => [
  {
    q: isId ? "Materi tesnya berupa apa saja?" : "What are the test subjects?",
    a: isId
      ? "Materi tes akademik berbasis komputer (CAT) meliputi Matematika, IPA (Fisika & Biologi), Bahasa Inggris, Bahasa Indonesia, dan Pendidikan Agama Islam."
      : "The Computer-Assisted Test (CAT) subjects include Mathematics, Science (Physics & Biology), English, Indonesian, and Islamic Education."
  },
  {
    q: isId ? "Bagaimana mengetahui jadwal tes & wawancara?" : "How to check test and interview schedules?",
    a: isId
      ? "Jadwal pelaksanaan tes tertulis CAT, tes membaca Al-Qur'an, dan wawancara dapat diakses secara berkala melalui akun portal pendaftaran SPMB masing-masing peserta."
      : "Written test, Quran recitation, and interview schedules can be accessed periodically through each participant's SPMB portal account."
  },
  {
    q: isId ? "Apa saja berkas yang harus diunggah?" : "What documents must be uploaded?",
    a: isId
      ? "Dokumen yang perlu disiapkan adalah pas foto 3×4, Kartu Keluarga (KK), dan rapor semester 2, 3, dan 4. Khusus Jalur Undangan ditambah surat rekomendasi dari kepala sekolah, sedangkan khusus Jalur Prestasi ditambah surat aktif dan sertifikat prestasi, yaitu sertifikat atau bukti juara minimal juara 1 tingkat kabupaten dari lomba yang diselenggarakan Kementerian Pendidikan atau Kementerian Agama."
      : "The documents to prepare are a 3×4 passport-sized photo, a Family Card (Kartu Keluarga), and report cards for semesters 2, 3, and 4. Invitation Track applicants must also attach a recommendation letter from their principal, while Achievement Track applicants must also attach an active student letter and an achievement certificate, namely a certificate or proof of at least a first-place win at regency level from a competition held by the Ministry of Education or the Ministry of Religious Affairs."
  },
  {
    q: isId ? "Apakah Jalur Reguler sudah dibuka?" : "Is the Regular Track open yet?",
    a: isId
      ? "Belum. Saat ini SPMB Tahun Ajaran 2027/2028 baru dibuka untuk Jalur Undangan dan Jalur Prestasi. Jalur Reguler termasuk dalam syarat umum, persyaratannya sama dengan yang tercantum pada bagian Syarat Umum, dan jadwal pembukaannya akan diumumkan kemudian."
      : "Not yet. For the 2027/2028 academic year, admissions are currently open only for the Invitation and Achievement Tracks. The Regular Track is included in the general requirements, its requirements are the same as those listed in the General Requirements section, and its opening schedule will be announced later."
  },
  {
    q: isId ? "Apakah ada tes kemampuan membaca Al-Qur'an?" : "Is there a Quran recitation test?",
    a: isId
      ? "Ya, seluruh calon peserta didik diwajibkan mengikuti tes keagamaan berupa kemampuan membaca Al-Qur'an secara fasih dan benar, serta hafalan surat-surat pendek."
      : "Yes, all applicants are required to take a religious test evaluating their capability to recite the Al-Qur'an correctly and memorize short surahs."
  },
  {
    q: isId ? "Bagaimana sistem asrama di SMAN Modal Bangsa?" : "How is the boarding system at SMAN Modal Bangsa?",
    a: isId
      ? "SMAN Modal Bangsa merupakan sekolah berasrama penuh. Semua siswa wajib tinggal di asrama dan mengikuti seluruh kegiatan pembinaan keagamaan serta karakter di asrama."
      : "SMAN Modal Bangsa is a full boarding school. All students are required to live in the dormitories and participate in all religious and character-building activities in the dorms."
  }
];

export const getPjjFaqs = (isId: boolean): FAQItem[] => [
  {
    q: isId ? "Apa itu Program Pendidikan Jarak Jauh (PJJ) SMAN Modal Bangsa?" : "What is the SMAN Modal Bangsa Distance Learning (PJJ) Program?",
    a: isId
      ? "Program PJJ SMAN Modal Bangsa adalah layanan pendidikan jarak jauh yang ditujukan khusus bagi Anak Tidak Sekolah (ATS) dan Lulus Tidak Melanjutkan (LTMS) agar dapat menyelesaikan pendidikan jenjang SMA."
      : "The SMAN Modal Bangsa Distance Learning (PJJ) Program is a distance education service specifically designed for Out-of-School Children (ATS) and Graduates Not Continuing School (LTMS) to complete their high school education."
  },
  {
    q: isId ? "Apa saja syarat utama pendaftaran PJJ?" : "What are the main registration requirements for PJJ?",
    a: isId
      ? "Calon peserta didik harus merupakan Anak Tidak Sekolah (ATS) atau Lulus Tidak Melanjutkan (LTMS) lulusan SMP/MTs sederajat tahun ajaran 2024/2025, telah putus sekolah selama minimal 1 tahun atau drop out, serta berusia maksimal 18 tahun saat pendaftaran."
      : "Applicants must be Out-of-School Children (ATS) or Graduates Not Continuing School (LTMS) who graduated from SMP/MTs in 2024/2025, have been out of school for at least 1 year or dropped out, and are maximum 18 years old at registration."
  },
  {
    q: isId ? "Berkas apa saja yang wajib diunggah saat pendaftaran?" : "What documents must be uploaded during registration?",
    a: isId
      ? "Dokumen yang wajib diunggah adalah scan/foto ijazah SMP/MTs sederajat, Kartu Keluarga (KK), Akta Kelahiran, serta dokumen tambahan seperti sertifikat prestasi jika ada (opsional)."
      : "Required documents include scans/photos of SMP/MTs certificate, Family Card (KK), Birth Certificate, and optional supporting documents such as achievement certificates."
  },
  {
    q: isId ? "Bagaimana cara melakukan pendaftaran PJJ?" : "How do I register for the PJJ Program?",
    a: isId
      ? "Pendaftaran dilakukan secara daring (online) dengan membuat akun di portal resmi SPMB SMAN Modal Bangsa pada menu pendaftaran PJJ, kemudian melengkapi data dan berkas yang diperlukan."
      : "Registration is done online by creating an account on the official SMAN Modal Bangsa SPMB portal under the PJJ registration menu, then filling out the required data and files."
  }
];

export const getPjjSteps = (isId: boolean): PJJStepItem[] => [
  {
    num: "01",
    title: isId ? "Registrasi Akun" : "Account Registration",
    mode: isId ? "Daring" : "Online",
    desc: isId
      ? "Calon peserta didik membuat akun pendaftaran di portal resmi SPMB SMAN Modal Bangsa pada menu pendaftaran PJJ."
      : "Applicants create a registration account on the official SMAN Modal Bangsa SPMB portal under the PJJ registration menu."
  },
  {
    num: "02",
    title: isId ? "Pengisian Data & Unggah Berkas" : "Fill Data & Upload Documents",
    mode: isId ? "Daring" : "Online",
    desc: isId
      ? "Melengkapi biodata diri dan mengunggah dokumen persyaratan (FC Ijazah, KK, Akta Lahir, dan berkas tambahan/prestasi opsional)."
      : "Complete personal biodata and upload required documents (copy of Certificate, KK, Birth Certificate, and optional achievement documents)."
  },
  {
    num: "03",
    title: isId ? "Verifikasi & Seleksi Administrasi" : "Verification & Selection",
    mode: isId ? "Daring" : "Online",
    desc: isId
      ? "Panitia akan memverifikasi kesesuaian dokumen pendaftaran dan pemenuhan syarat utama (Kategori Anak Tidak Sekolah)."
      : "The committee verifies the registration documents and checks eligibility for the Out-of-School Children category."
  },
  {
    num: "04",
    title: isId ? "Pengumuman Hasil Seleksi" : "Admissions Announcement",
    mode: isId ? "Daring" : "Online",
    desc: isId
      ? "Hasil seleksi administrasi dan kelulusan pendaftaran PJJ akan diumumkan secara daring melalui akun pendaftaran masing-masing."
      : "Administrative selection results and PJJ admission status will be announced online via each applicant's portal account."
  }
];

export const mitraSekolah: PartnerSchool[] = [
  {
    no: 1,
    kabupaten: "Kab. Aceh Besar",
    sekolah: "SMAN Modal Bangsa (Induk)",
    status: "Induk",
    contacts: [
      {
        name: "Rahmat, S.Pd",
        phone: "+62 852-6097-8426",
        role: "PIC Sekolah Mitra PJJ SMAN Modal Bangsa",
        waNumber: "6285260978426",
      },
      {
        name: "Alfaruq Asri, S.Pd",
        phone: "+62 853-5990-7696",
        role: "PIC Sekolah Mitra PJJ SMAN Modal Bangsa",
        waNumber: "6285359907696",
      },
    ],
  },
  {
    no: 2,
    kabupaten: "Kab. Bireuen",
    sekolah: "SMAN 1 Simpang Mamplam",
    status: "Mitra",
    contacts: [
      {
        name: "Zahara",
        phone: "+62 852-6079-9992",
        role: "PIC Sekolah Mitra PJJ SMAN 1 Simpang Mamplam",
        waNumber: "6285260799992",
      },
    ],
  },
  {
    no: 3,
    kabupaten: "Kab. Aceh Singkil",
    sekolah: "SMAN 1 Gunung Meriah",
    status: "Mitra",
    contacts: [
      {
        name: "Mami Hastuti, S.Pd., M.Pd",
        phone: "+62 812-6979-9777",
        role: "PIC Sekolah Mitra PJJ SMAN 1 Gunung Meriah",
        waNumber: "6281269799777",
      },
    ],
  },
  {
    no: 4,
    kabupaten: "Kab. Aceh Besar",
    sekolah: "SMAN 1 Seulimeum",
    status: "Mitra",
    contacts: [
      {
        name: "Malahayati",
        phone: "+62 852-6012-3817",
        role: "PIC Sekolah Mitra PJJ SMAN 1 Seulimeum",
        waNumber: "6285260123817",
      },
    ],
  },
  {
    no: 5,
    kabupaten: "Kota Lhokseumawe",
    sekolah: "SMAN 6 Lhokseumawe",
    status: "Mitra",
    contacts: [
      {
        name: "Faisal Ab, S.Pd, M.Pd",
        phone: "+62 852-6076-0764",
        role: "PIC Sekolah Mitra PJJ SMAN 6 Lhokseumawe",
        waNumber: "6285260760764",
      },
    ],
  },
];
