"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WPPost } from "@/lib/wp-types";

interface SPMBClientProps {
  lang: string;
  galleryItems?: WPPost[];
}

export function SPMBClient({ lang, galleryItems = [] }: SPMBClientProps) {
  const isId = lang === "id";
  const [activeTab, setActiveTab] = useState<"spmb" | "pjj">("spmb");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Extract images from galleryItems
  const allPhotos = React.useMemo(() => {
    const photos: { url: string; title: string }[] = [];
    
    galleryItems.forEach((item) => {
      const albumTitle = item.title?.rendered || "";
      const featuredUrl = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
      if (featuredUrl) {
        const wpContentIdx = featuredUrl.indexOf("/wp-content/");
        const proxied = wpContentIdx !== -1 ? featuredUrl.substring(wpContentIdx) : featuredUrl;
        photos.push({ url: proxied, title: albumTitle });
      }
      
      const html = item.content?.rendered || "";
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      let match;
      while ((match = imgRegex.exec(html)) !== null) {
        const rawUrl = match[1];
        const wpContentIdx = rawUrl.indexOf("/wp-content/");
        const proxied = wpContentIdx !== -1 ? rawUrl.substring(wpContentIdx) : rawUrl;
        if (proxied && !photos.some((p) => p.url === proxied)) {
          photos.push({ url: proxied, title: albumTitle });
        }
      }
    });
    return photos;
  }, [galleryItems]);

  // Dynamic photos for SPMB (Admissions)
  const spmbPhotos = React.useMemo(() => {
    const keywords = ["spmb", "pendaftaran", "seleksi", "cat", "ujian", "test", "wawancara", "syarat", "daftar", "calon", "psb", "ppdb"];
    const matched = allPhotos.filter((p) => 
      keywords.some((kw) => p.title.toLowerCase().includes(kw))
    );
    
    const result = [...matched];
    // If not enough matches, fill with other photos from the gallery
    if (result.length < 3) {
      allPhotos.forEach((p) => {
        if (result.length < 3 && !result.some((r) => r.url === p.url)) {
          result.push(p);
        }
      });
    }
    
    return {
      img1: result[0]?.url || "/images/academy_campus.png",
      img2: result[1]?.url || "/images/academy_academic.png",
      cta: result[2]?.url || "/images/cta.jpeg",
    };
  }, [allPhotos]);

  // Dynamic photos for PJJ (Distance Learning)
  const pjjPhotos = React.useMemo(() => {
    const keywords = ["pjj", "jarak jauh", "daring", "online", "lms", "belajar", "kelas", "guru", "siswa", "pembelajaran", "virtual", "komputer"];
    const matched = allPhotos.filter((p) => 
      keywords.some((kw) => p.title.toLowerCase().includes(kw))
    );
    
    const result = [...matched];
    // If not enough matches, fill with other photos from the gallery
    if (result.length < 2) {
      allPhotos.forEach((p) => {
        if (result.length < 2 && !result.some((r) => r.url === p.url)) {
          result.push(p);
        }
      });
    }
    
    return {
      img1: result[0]?.url || "/images/value_learning.png",
      cta: result[1]?.url || "/images/academy_academic.png",
    };
  }, [allPhotos]);

  // FAQ Lists
  const spmbFaqs = [
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

  const pjjFaqs = [
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

  const spmbSteps = [
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

  const pjjSteps = [
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

  const mitraSekolah = [
    { no: 1, provinsi: "Aceh", kabupaten: "Kab. Lhokseumawe", sekolah: "SMAN 6 Lhokseumawe" },
    { no: 2, provinsi: "Aceh", kabupaten: "Kab. Bireuen", sekolah: "SMAN 1 Simpang Mamplam" },
    { no: 3, provinsi: "Aceh", kabupaten: "Kab. Aceh Singkil", sekolah: "SMAN 1 Gunung Meriah" },
    { no: 4, provinsi: "Aceh", kabupaten: "Kab. Aceh Besar", sekolah: "SMAN 1 Seulimeum" },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-16">
      {/* ============ TABS SWITCHER (EDITORIAL SEGMENTED CONTROLS) ============ */}
      <div className="flex justify-center border-b border-zinc-200 mb-16">
        <div className="flex gap-8 md:gap-12">
          {(["spmb", "pjj"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setOpenFaq(null);
                }}
                className={cn(
                  "relative pb-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer font-sfpro",
                  isActive ? "text-[#16a34a] font-bold" : "text-zinc-400 hover:text-zinc-800"
                )}
              >
                <span>
                  {tab === "spmb" 
                    ? (isId ? "Penerimaan Siswa Baru" : "School Admissions") 
                    : (isId ? "Pendidikan Jarak Jauh" : "Distance Learning")}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#16a34a]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============ CONTENT PANELS ============ */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "spmb" ? (
            <motion.div
              key="spmb"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-24"
            >
              {/* Intro and Hero Image Grid */}
              <div className="space-y-12">
                <p className="text-center max-w-3xl mx-auto text-base sm:text-lg text-zinc-550 leading-relaxed font-sans">
                  {isId 
                    ? "Selamat datang di halaman informasi pendaftaran SMAN Modal Bangsa! Kami berdedikasi untuk menyediakan lingkungan yang memperkaya dan mendukung pertumbuhan akademis serta pribadi siswa."
                    : "Welcome to the admissions page of SMAN Modal Bangsa! We are dedicated to providing an enriching environment that supports students' academic and personal growth."}
                </p>

                <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-sm bg-zinc-150">
                  <Image 
                    src="/images/spmb/spmb.jpeg" 
                    alt="SMAN Modal Bangsa Campus" 
                    fill 
                    sizes="100vw"
                    className="object-cover" 
                    priority
                  />
                </div>
              </div>

              {/* About Section */}
              <div className="max-w-5xl mx-auto space-y-6 text-center md:text-left">
                <h2 className="font-sfpro text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-none uppercase">
                  {isId ? "Tentang Penerimaan" : "About"}{" "}
                  <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">
                    SMAN Modal Bangsa
                  </span>{" "}
                  {isId ? "" : "Admission"}
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans text-justify sm:text-left">
                  {isId 
                    ? "Kami informasikan bahwa PPDB SMAN Modal Bangsa untuk Tahun Ajaran 2026/2027 telah dibuka secara resmi. Seluruh proses pendaftaran dilakukan secara daring (online) melalui portal resmi SPMB SMAN Modal Bangsa. Kami mengundang putra-putri terbaik bangsa untuk bergabung dan berkembang bersama kami di lingkungan belajar yang unggul, islami, dan berkarakter kepemimpinan."
                    : "We inform you that the SMAN Modal Bangsa PPDB for the 2026/2027 Academic Year has been officially opened. The entire registration process is carried out online through the official SMAN Modal Bangsa SPMB portal. We invite the nation's best sons and daughters to join and grow with us in an excellent, Islamic, and leadership-oriented learning environment."}
                </p>
              </div>

              {/* General Information Column Info */}
              <div className="max-w-5xl mx-auto space-y-8">
                <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
                  {isId ? "Informasi Umum" : "General Information"}
                </h3>
                <div className="space-y-6 text-sm sm:text-base text-zinc-650 font-sans leading-relaxed text-justify sm:text-left">
                  <p>
                    {isId ? (
                      <>
                        Calon peserta didik adalah <strong className="text-zinc-900 font-semibold">Warga Negara Indonesia (WNI)</strong>, baik laki-laki maupun perempuan. Selama menempuh pendidikan di SMP/MTs sederajat, calon peserta didik <strong className="text-zinc-900 font-semibold">tidak pernah tinggal kelas</strong>. Calon peserta didik juga diwajibkan lulus dari SMP/MTs atau sederajat pada tahun ajaran berjalan atau lulusan satu tahun sebelumnya.
                      </>
                    ) : (
                      <>
                        Prospective students must be <strong className="text-zinc-900 font-semibold">Indonesian Citizens (WNI)</strong>, both male and female. During their education in SMP/MTs or equivalent, prospective students <strong className="text-zinc-950 font-semibold">must have never repeated a grade</strong>. Prospective students are also required to graduate from SMP/MTs or equivalent in the current academic year or have graduated in the previous year.
                      </>
                    )}
                  </p>
                  <p>
                    {isId ? (
                      <>
                        Persyaratan nilai rata-rata rapor pengetahuan pada mata pelajaran <strong className="text-zinc-900 font-semibold">Pendidikan Agama Islam (PAI), IPA, Matematika, Bahasa Inggris, dan Bahasa Indonesia</strong> semester 2, 3, dan 4 mulai dari kelas minimal <strong className="text-zinc-900 font-semibold">85.00</strong> untuk Jalur Prestasi dan <strong className="text-zinc-900 font-semibold">80.00</strong> untuk Jalur Reguler.
                      </>
                    ) : (
                      <>
                        Required average report card grades for academic subjects including <strong className="text-zinc-950 font-semibold">Islamic Education (PAI), Science, Mathematics, English, and Indonesian</strong> in semesters 2, 3, and 4 must be at least <strong className="text-zinc-950 font-semibold">85.00</strong> for the Achievement Path and <strong className="text-zinc-950 font-semibold">80.00</strong> for the Regular Path.
                      </>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                    <h4 className="font-bold text-base text-zinc-950 font-sfpro border-b border-zinc-100 pb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
                      {isId ? "Jalur Reguler" : "Regular Path"}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed">
                      {isId 
                        ? "Jalur Reguler diperuntukkan bagi seluruh calon siswa melalui proses seleksi umum yang mencakup tes akademik berbasis komputer (CAT) dan tes keagamaan berupa kemampuan membaca Al-Qur'an serta wawancara kesiapan tinggal di asrama."
                        : "The Regular Path is intended for all prospective students through a general selection process that includes a Computer-Assisted Test (CAT), religious testing (reciting the Al-Qur'an), and boarding suitability interviews."}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-base text-zinc-950 font-sfpro border-b border-zinc-100 pb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
                      {isId ? "Jalur Prestasi" : "Achievement Path"}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed">
                      {isId 
                        ? "Jalur Prestasi ditujukan bagi siswa yang memiliki pencapaian luar biasa di bidang akademik (olimpiade sains), keagamaan (tahfidz), seni, olahraga, atau kepemimpinan. Calon siswa diwajibkan mengunggah bukti sertifikat prestasi dalam format PDF."
                        : "The Achievement Path is intended for students with outstanding achievements in academic fields (science olympiads), religion (tahfidz), arts, sports, or leadership. Applicants are required to upload proof of certificates in PDF format."}
                    </p>
                    <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed italic">
                      {isId
                        ? "* Calon peserta didik dapat menyerahkan 1 hingga 3 sertifikat terbaik untuk dinilai, baik tingkat internasional, nasional, regional, maupun kabupaten/kota yang diterbitkan dalam kurun waktu maksimal 2 tahun terakhir."
                        : "* Prospective students can submit 1 to 3 of their best certificates for evaluation, whether at the international, national, regional, or regency/city levels issued within a maximum of the last 2 years."}
                    </p>
                  </div>
                </div>

                <p className="text-center pt-8 text-[#16a34a] font-romulo font-normal italic text-lg sm:text-xl">
                  {isId 
                    ? "Kami sangat menantikan kehadiranmu untuk bergabung dalam keluarga besar SMAN Modal Bangsa!"
                    : "We look forward to welcoming you to the family of SMAN Modal Bangsa!"}
                </p>
              </div>

              {/* Timeline Section */}
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="space-y-3 text-center md:text-left">
                  <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
                    {isId ? "Tahapan & Alur Pendaftaran" : "Admission Process Steps"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-sans">
                    {isId 
                      ? "Ikuti langkah terstruktur berikut untuk menyelesaikan proses seleksi masuk SMAN Modal Bangsa."
                      : "Follow these structured steps to complete your admission process at SMAN Modal Bangsa."}
                  </p>
                </div>

                {/* Vertical connected timeline */}
                <div className="relative border-l border-zinc-200 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12 py-2">
                  {spmbSteps.map((step, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-[41px] md:-left-[49px] top-1 size-6 md:size-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center shadow-sm group-hover:border-[#16a34a] transition-all duration-300 z-10">
                        <span className="text-[10px] md:text-xs font-bold text-zinc-400 group-hover:text-[#16a34a] transition-colors">{step.num}</span>
                      </div>
                      <div className="space-y-1.5 max-w-3xl">
                        <span className="inline-block text-[9px] font-sfpro font-bold tracking-widest text-[#16a34a] uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/40 font-sfpro">
                          {isId ? `Langkah ${step.num}` : `Step ${step.num}`}
                        </span>
                        <h4 className="font-bold text-base text-zinc-900 group-hover:text-[#16a34a] transition-colors font-sfpro">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-sans">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ready to Join Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center bg-zinc-50 border border-zinc-150 p-8 sm:p-12 rounded-[2rem] max-w-5xl mx-auto shadow-sm">
                <div className="space-y-6">
                  <h2 className="font-sfpro text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight uppercase">
                    {isId ? "Siap bergabung" : "Ready to join"}{" "}
                    <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1 block sm:inline">
                      {isId ? "dengan kami?" : "with us?"}
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-sans">
                    {isId 
                      ? "Untuk memulai perjalanan belajarmu di SMAN Modal Bangsa, silakan lengkapi formulir pendaftaran dan unggah seluruh dokumen persyaratan yang dibutuhkan."
                      : "To begin your learning journey at SMAN Modal Bangsa, please complete the registration form and upload all the required documents."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a
                      href="https://spmb.sman-modalbangsa.sch.id/info-spmb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#16a34a] hover:bg-[#118037] text-white text-xs font-bold tracking-wider py-3.5 px-6 rounded-full flex items-center justify-between transition-all duration-300 font-sfpro uppercase shadow-sm active:scale-[0.98]"
                    >
                      <span>{isId ? "Daftar Sekarang" : "Register Now"}</span>
                      <ArrowUpRight className="size-4 ml-2" />
                    </a>
                    <a
                      href={`/${lang}/kontak`}
                      className="bg-transparent border border-zinc-300 hover:border-zinc-500 text-zinc-800 text-xs font-bold tracking-wider py-3.5 px-6 rounded-full text-center transition-all duration-300 font-sfpro uppercase active:scale-[0.98]"
                    >
                      {isId ? "Hubungi Kami" : "Contact Us"}
                    </a>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-zinc-200">
                  <Image 
                    src={spmbPhotos.cta} 
                    alt="SMAN Modal Bangsa Boarding School Students" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover" 
                  />
                </div>
              </div>

              {/* FAQ Accordion Section */}
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
                    {isId ? "Pertanyaan Sering Diajukan" : "Frequently Asked Questions"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-sans">
                    {isId
                      ? "Temukan jawaban cepat untuk pertanyaan umum seputar penerimaan siswa baru."
                      : "Find quick answers to common questions about our student admissions."}
                  </p>
                </div>

                <div className="divide-y divide-zinc-200 pt-2">
                  {spmbFaqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div 
                        key={idx} 
                        className="py-2 transition-colors duration-300"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full text-left py-4 flex items-center justify-between gap-4 font-semibold text-zinc-950 font-sfpro hover:text-[#16a34a] transition-colors cursor-pointer"
                        >
                          <span className="text-xs sm:text-sm md:text-base">{faq.q}</span>
                          <ChevronRight className={cn("size-4 text-zinc-400 transition-transform duration-300 shrink-0", isOpen && "rotate-90 text-[#16a34a]")} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                            >
                              <div className="pb-4 pt-1 text-xs sm:text-sm text-zinc-550 leading-relaxed font-sans">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pjj"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-24"
            >
              {/* PJJ Hero & Intro */}
              <div className="space-y-12">
                <p className="text-center max-w-3xl mx-auto text-base sm:text-lg text-zinc-550 leading-relaxed font-sans">
                  {isId 
                    ? "Program Pendidikan Jarak Jauh (PJJ) SMA 2026 merupakan program nasional yang diselenggarakan oleh Kemendikdasmen melalui Direktorat PKPLK bekerja sama dengan SEAMOLEC, untuk meningkatkan kompetensi guru dalam melaksanakan pembelajaran jarak jauh yang efektif dan berkualitas."
                    : "The PJJ SMA 2026 program is a national initiative by the Ministry of Education through the PKPLK Directorate in collaboration with SEAMOLEC, aimed at enhancing teacher competency in delivering effective and high-quality distance learning."}
                </p>

                <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-sm bg-zinc-150">
                  <Image 
                    src={pjjPhotos.img1} 
                    alt="SMAN Modal Bangsa Distance Learning Class" 
                    fill 
                    sizes="100vw"
                    className="object-cover" 
                    priority
                  />
                </div>
              </div>

              {/* Sekolah Induk Section */}
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="space-y-3 text-center md:text-left">
                  <span className="inline-block text-[10px] font-sfpro font-bold tracking-[0.2em] text-[#16a34a] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    {isId ? "Peran SMAN Modal Bangsa" : "SMAN Modal Bangsa Role"}
                  </span>
                  <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
                    {isId ? "Sekolah Induk" : "Anchor School"}{" "}
                    <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">PJJ Nasional</span>
                  </h3>
                </div>
                <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-sans text-justify sm:text-left">
                  <p>
                    {isId
                      ? "SMAN Modal Bangsa Aceh memperoleh kepercayaan sebagai salah satu dari 32 Sekolah Induk Program PJJ SMA 2026 yang tersebar di seluruh Indonesia. Penunjukan ini merupakan pengakuan atas komitmen SMAN Modal Bangsa dalam mengembangkan inovasi pembelajaran dan pemanfaatan teknologi pendidikan."
                      : "SMAN Modal Bangsa Aceh has been designated as one of 32 national Anchor Schools (Sekolah Induk) for the PJJ SMA 2026 Program across Indonesia. This appointment recognizes SMAN Modal Bangsa's commitment to educational innovation and technology."}
                  </p>
                  <p>
                    {isId
                      ? "Sebagai Sekolah Induk, SMAN Modal Bangsa berperan sebagai pusat pelatihan tatap muka, pendampingan guru, pengembangan konten digital, kolaborasi pembelajaran, dan berbagi praktik baik bagi sekolah-sekolah mitra di Provinsi Aceh."
                      : "As the Anchor School, SMAN Modal Bangsa serves as the hub for in-person training, teacher mentoring, digital content development, collaborative learning, and best practice sharing for partner schools in Aceh Province."}
                  </p>
                </div>
              </div>

              {/* Training Stages */}
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="space-y-3 text-center md:text-left">
                  <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
                    {isId ? "Tahapan Pelatihan" : "Training Stages"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-sans">
                    {isId 
                      ? "Pelatihan dilaksanakan melalui empat tahap yang mencakup kompetensi dasar, pengembangan konten, LMS, hingga keterampilan tutorial."
                      : "Training is delivered in four stages covering basic competencies, content development, LMS, and tutorial skills."}
                  </p>
                </div>

                <div className="relative border-l border-zinc-200 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12 py-2">
                  {pjjSteps.map((step, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[41px] md:-left-[49px] top-1 size-6 md:size-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center shadow-sm group-hover:border-[#16a34a] transition-all duration-300 z-10">
                        <span className="text-[10px] md:text-xs font-bold text-zinc-400 group-hover:text-[#16a34a] transition-colors">{step.num}</span>
                      </div>
                      <div className="space-y-1.5 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-block text-[9px] font-sfpro font-bold tracking-widest text-[#16a34a] uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/40">
                            {isId ? `Tahap ${step.num}` : `Stage ${step.num}`}
                          </span>
                          <span className="inline-block text-[9px] font-sfpro font-medium tracking-wide text-zinc-500 uppercase bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                            {step.mode}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-zinc-900 group-hover:text-[#16a34a] transition-colors font-sfpro">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-sans">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mitra Schools Table */}
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="space-y-3 text-center md:text-left">
                  <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
                    {isId ? "Sekolah Mitra" : "Partner Schools"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-sans">
                    {isId
                      ? "Sekolah-sekolah di Provinsi Aceh yang bermitra dengan SMAN Modal Bangsa dalam Program PJJ SMA 2026."
                      : "Schools in Aceh Province partnering with SMAN Modal Bangsa in the PJJ SMA 2026 Program."}
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#16a34a] text-white">
                        <th className="px-4 py-3 text-left text-[10px] font-sfpro font-bold tracking-[0.15em] uppercase">No.</th>
                        <th className="px-4 py-3 text-left text-[10px] font-sfpro font-bold tracking-[0.15em] uppercase">{isId ? "Provinsi" : "Province"}</th>
                        <th className="px-4 py-3 text-left text-[10px] font-sfpro font-bold tracking-[0.15em] uppercase">{isId ? "Kabupaten/Kota" : "Regency/City"}</th>
                        <th className="px-4 py-3 text-left text-[10px] font-sfpro font-bold tracking-[0.15em] uppercase">{isId ? "Satuan Pendidikan" : "School"}</th>
                        <th className="px-4 py-3 text-left text-[10px] font-sfpro font-bold tracking-[0.15em] uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {mitraSekolah.map((row, idx) => (
                        <tr key={idx} className="hover:bg-emerald-50 transition-colors duration-150">
                          <td className="px-4 py-3 text-zinc-500 font-medium text-xs text-center">{row.no}</td>
                          <td className="px-4 py-3 text-zinc-700 text-xs">{row.provinsi}</td>
                          <td className="px-4 py-3 text-zinc-700 text-xs">{row.kabupaten}</td>
                          <td className="px-4 py-3 text-zinc-900 font-semibold text-xs font-sfpro">{row.sekolah}</td>
                          <td className="px-4 py-3">
                            <span className="inline-block text-[10px] font-bold text-[#16a34a] bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">Mitra</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Training Schedule CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center bg-zinc-50 border border-zinc-150 p-8 sm:p-12 rounded-[2rem] max-w-5xl mx-auto shadow-sm">
                <div className="space-y-6">
                  <span className="inline-block text-[10px] font-sfpro font-bold tracking-[0.2em] text-[#16a34a] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    {isId ? "Jadwal Pelaksanaan" : "Training Schedule"}
                  </span>
                  <h2 className="font-sfpro text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight uppercase">
                    {isId ? "Pelatihan Tahap 2" : "Stage 2 Training"}{" "}
                    <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1 block sm:inline">
                      {isId ? "di SMAN Modal Bangsa" : "at SMAN Modal Bangsa"}
                    </span>
                  </h2>
                  <div className="space-y-3 text-xs sm:text-sm text-zinc-650 font-sans">
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />
                      <span><strong className="text-zinc-900 font-semibold">{isId ? "Tanggal:" : "Date:"}</strong> 28–30 Juli 2026</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />
                      <span><strong className="text-zinc-900 font-semibold">{isId ? "Bentuk:" : "Mode:"}</strong> {isId ? "Pelatihan Luring (Tatap Muka)" : "In-Person Training"}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />
                      <span><strong className="text-zinc-900 font-semibold">{isId ? "Peserta:" : "Participants:"}</strong> {isId ? "Guru PJJ dari Sekolah Induk & Mitra yang telah menyelesaikan Tahap 1" : "PJJ Teachers from Anchor & Partner Schools who completed Stage 1"}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />
                      <span><strong className="text-zinc-900 font-semibold">{isId ? "Fasilitas:" : "Facilities:"}</strong> {isId ? "Ruang pelatihan, LCD/Proyektor, sistem audio, akses internet" : "Training rooms, LCD/Projector, audio system, internet access"}</span>
                    </div>
                  </div>
                  <a
                    href={`/${lang}/kontak`}
                    className="inline-block bg-[#16a34a] hover:bg-[#118037] text-white text-xs font-bold tracking-wider py-3.5 px-8 rounded-full transition-all duration-300 font-sfpro uppercase shadow-sm active:scale-[0.98]"
                  >
                    {isId ? "Hubungi Humas Kami" : "Contact Our PR"}
                  </a>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-zinc-200">
                  <Image 
                    src={pjjPhotos.cta} 
                    alt="SMAN Modal Bangsa Training" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover" 
                  />
                </div>
              </div>

              {/* FAQ Accordion Section for PJJ */}
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
                    {isId ? "Pertanyaan Sering Diajukan" : "Frequently Asked Questions"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-sans">
                    {isId
                      ? "Informasi tambahan seputar pelaksanaan program Pendidikan Jarak Jauh."
                      : "Additional details regarding the Distance Learning program execution."}
                  </p>
                </div>

                <div className="divide-y divide-zinc-200 pt-2">
                  {pjjFaqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div 
                        key={idx} 
                        className="py-2 transition-colors duration-300"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full text-left py-4 flex items-center justify-between gap-4 font-semibold text-zinc-950 font-sfpro hover:text-[#16a34a] transition-colors cursor-pointer"
                        >
                          <span className="text-xs sm:text-sm md:text-base">{faq.q}</span>
                          <ChevronRight className={cn("size-4 text-zinc-400 transition-transform duration-300 shrink-0", isOpen && "rotate-90 text-[#16a34a]")} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                            >
                              <div className="pb-4 pt-1 text-xs sm:text-sm text-zinc-550 leading-relaxed font-sans">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
