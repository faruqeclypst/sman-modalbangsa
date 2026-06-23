export interface FAQItem {
  q: string;
  a: string;
}

export interface StepItem {
  num: string;
  title: string;
  desc: string;
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
      ? "Dokumen yang wajib diunggah meliputi scan rapor semester 2, 3, dan 4, pas foto terbaru, surat rekomendasi kepala sekolah, serta sertifikat/piagam prestasi bagi pendaftar jalur prestasi."
      : "Required documents include scanned report cards for semesters 2, 3, and 4, a recent passport-sized photo, principal recommendation letter, and achievement certificates for achievement track applicants."
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

export const getSpmbSteps = (isId: boolean): StepItem[] => [
  {
    num: "01",
    title: isId ? "Registrasi Akun" : "Account Registration",
    desc: isId
      ? "Calon peserta didik membuat akun pendaftaran di portal resmi SPMB menggunakan NISN dan email aktif."
      : "Prospective students register their account on the official SPMB portal using NISN and active email."
  },
  {
    num: "02",
    title: isId ? "Pengisian Rapor & Berkas" : "Grade & Document Submission",
    desc: isId
      ? "Menginput nilai rapor pengetahuan semester 2, 3, dan 4 untuk mata pelajaran utama secara akurat serta mengunggah berkas pendukung."
      : "Accurately input report card grades for semesters 2, 3, and 4 in core academic subjects and upload supporting files."
  },
  {
    num: "03",
    title: isId ? "Verifikasi Berkas" : "Administrative Verification",
    desc: isId
      ? "Pihak panitia memverifikasi kesesuaian berkas nilai rapor dan kelengkapan dokumen administratif secara online."
      : "The admissions committee validates report card grades and uploaded administrative documents online."
  },
  {
    num: "04",
    title: isId ? "Ujian Seleksi CAT" : "Computer-Assisted Test",
    desc: isId
      ? "Mengikuti tes potensi akademik terkomputerisasi secara langsung di lokasi ujian untuk bidang studi utama."
      : "Take the computerized academic aptitude test evaluating core study subjects in person at the exam location."
  },
  {
    num: "05",
    title: isId ? "Tes Agama & Wawancara" : "Religious Test & Interview",
    desc: isId
      ? "Menjalani tes kefasihan membaca Al-Qur'an secara tartil serta wawancara kesiapan menetap di sistem asrama."
      : "Undergo tests for Al-Qur'an recitation fluency and interviews evaluating dormitory boarding suitability."
  },
  {
    num: "06",
    title: isId ? "Pengumuman & Daftar Ulang" : "Announcement & Enrollment",
    desc: isId
      ? "Hasil kelulusan diumumkan melalui portal, dilanjutkan proses verifikasi fisik serta daftar ulang berkas."
      : "Admissions results announced online, followed by in-person physical verification and enrollment registration."
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
    contacts: [],
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
