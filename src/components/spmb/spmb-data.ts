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

export interface PartnerSchool {
  no: number;
  provinsi: string;
  kabupaten: string;
  sekolah: string;
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
    q: isId ? "Siapa saja yang bisa mengikuti program PJJ?" : "Who can participate in the Distance Learning program?",
    a: isId 
      ? "Program PJJ SMA 2026 diperuntukkan bagi guru-guru dari Sekolah Induk dan Sekolah Mitra yang telah ditetapkan oleh Kemendikdasmen."
      : "The PJJ SMA 2026 program is intended for teachers from designated Sekolah Induk and Sekolah Mitra schools selected by the Ministry of Education."
  },
  {
    q: isId ? "Apa peran SMAN Modal Bangsa dalam Program PJJ?" : "What is SMAN Modal Bangsa's role in the PJJ Program?",
    a: isId 
      ? "SMAN Modal Bangsa berperan sebagai Sekolah Induk — menjadi pusat pelatihan tatap muka, pengembangan konten digital, pendampingan guru, dan berbagi praktik baik bagi sekolah-sekolah mitra."
      : "SMAN Modal Bangsa serves as the Sekolah Induk — the hub for in-person training, digital content development, teacher mentoring, and best practice sharing for partner schools."
  },
  {
    q: isId ? "Kapan pelatihan Tahap 2 dilaksanakan di SMAN Modal Bangsa?" : "When is the Stage 2 training held at SMAN Modal Bangsa?",
    a: isId 
      ? "Pelatihan Tahap 2 (Pengembangan Konten dan Media Digital) secara luring dilaksanakan pada 28–30 Juli 2026 di SMAN Modal Bangsa Aceh."
      : "Stage 2 training (Content and Digital Media Development) is held in-person on July 28–30, 2026, at SMAN Modal Bangsa, Aceh."
  },
  {
    q: isId ? "Apa saja yang dipelajari dalam pelatihan PJJ?" : "What topics are covered in the PJJ training?",
    a: isId 
      ? "Pelatihan mencakup empat tahap: kompetensi dasar PJJ (daring), pengembangan konten & media digital termasuk AI (luring), pemanfaatan LMS, serta keterampilan tutorial dan asesmen."
      : "Training covers four stages: basic PJJ competencies (online), content & digital media development including AI (in-person), LMS utilization, and tutorial & assessment skills."
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
    title: isId ? "Kompetensi Dasar PJJ" : "Basic PJJ Competencies",
    mode: isId ? "Daring" : "Online",
    desc: isId
      ? "Peserta mempelajari konsep dan karakteristik PJJ, pembelajaran dan tutorial, evaluasi & asesmen, serta pemanfaatan modul pembelajaran digital."
      : "Participants learn PJJ concepts and characteristics, tutorial and learning strategies, evaluation & assessment, and digital learning module utilization."
  },
  {
    num: "02",
    title: isId ? "Pengembangan Konten & Media Digital" : "Content & Digital Media Development",
    mode: isId ? "Luring — SMAN Modal Bangsa, 28–30 Juli 2026" : "In-Person — SMAN Modal Bangsa, July 28–30, 2026",
    desc: isId
      ? "Pemanfaatan AI dalam pendidikan, penyusunan materi digital, pengembangan bahan ajar interaktif, produksi video pembelajaran, dan pemanfaatan teknologi digital untuk konten pembelajaran."
      : "AI utilization in education, digital material development, interactive teaching content creation, learning video production, and digital technology for learning content."
  },
  {
    num: "03",
    title: isId ? "Pemanfaatan Learning Management System" : "LMS Utilization",
    mode: isId ? "Daring" : "Online",
    desc: isId
      ? "Pengenalan LMS Program PJJ, pengelolaan kelas digital, pengunggahan materi & aktivitas, pengelolaan tugas & asesmen, serta monitoring dan pelaporan pembelajaran."
      : "Introduction to the PJJ LMS, digital classroom management, uploading materials & activities, task & assessment management, learning monitoring and reporting."
  },
  {
    num: "04",
    title: isId ? "Keterampilan Tutorial & Asesmen" : "Tutorial & Assessment Skills",
    mode: isId ? "Daring" : "Online",
    desc: isId
      ? "Teori dan praktik tutorial dalam PJJ, strategi fasilitasi pembelajaran daring, desain tutorial model ADDIE, serta penyusunan butir soal dan instrumen evaluasi yang valid."
      : "Tutorial theory and practice in PJJ, online learning facilitation strategies, ADDIE model tutorial design, and developing valid assessment instruments."
  }
];

export const mitraSekolah: PartnerSchool[] = [
  { no: 1, provinsi: "Aceh", kabupaten: "Kab. Lhokseumawe", sekolah: "SMAN 6 Lhokseumawe" },
  { no: 2, provinsi: "Aceh", kabupaten: "Kab. Bireuen", sekolah: "SMAN 1 Simpang Mamplam" },
  { no: 3, provinsi: "Aceh", kabupaten: "Kab. Aceh Singkil", sekolah: "SMAN 1 Gunung Meriah" },
  { no: 4, provinsi: "Aceh", kabupaten: "Kab. Aceh Besar", sekolah: "SMAN 1 Seulimeum" },
];
