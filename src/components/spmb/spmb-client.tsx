"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WPPost } from "@/lib/wp-types";
import {
  getSpmbFaqs,
  getPjjFaqs,
  getSpmbSteps,
  getPjjSteps,
  mitraSekolah,
} from "./spmb-data";

interface SPMBClientProps {
  lang: string;
  galleryItems?: WPPost[];
}

export function SPMBClient({ lang, galleryItems = [] }: SPMBClientProps) {
  const isId = lang === "id";
  const [activeTab, setActiveTab] = useState<"spmb" | "pjj">("spmb");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Handle dynamic tab activation from query parameter (e.g. ?tab=pjj)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "pjj" || tab === "spmb") {
        setActiveTab(tab);
      }
    }
  }, []);

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
  const spmbFaqs = getSpmbFaqs(isId);
  const pjjFaqs = getPjjFaqs(isId);

  // Steps
  const spmbSteps = getSpmbSteps(isId);
  const pjjSteps = getPjjSteps(isId);

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
                    ? "Program Pendidikan Jarak Jauh (PJJ) SMAN Modal Bangsa dibuka khusus untuk memfasilitasi Anak Tidak Sekolah (ATS) dan Lulus Tidak Melanjutkan (LTMS) agar dapat kembali menempuh pendidikan tingkat menengah atas secara fleksibel, berkualitas, dan setara."
                    : "The SMAN Modal Bangsa Distance Learning (PJJ) Program is specifically opened to facilitate Out-of-School Children (ATS) and Graduates Not Continuing School (LTMS) to resume senior high school education flexibly, with high quality and equality."}
                </p>

                <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-sm bg-zinc-150">
                  <Image
                    src="/images/spmb/pjj-hero.jpeg"
                    alt="Program Pendidikan Jarak Jauh SMAN Modal Bangsa"
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
                    <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">Pendidikan Jarak Jauh</span>
                  </h3>
                </div>
                <div className="space-y-4 text-sm sm:text-base text-zinc-650 leading-relaxed font-sans text-justify sm:text-left">
                  <p>
                    {isId
                      ? "SMAN Modal Bangsa Aceh dipercayakan sebagai salah satu Sekolah Induk Program PJJ SMA Nasional oleh Kemendikdasmen. Dalam menjalankan amanah ini, kami berkomitmen menyelenggarakan layanan pendidikan jarak jauh yang bermutu tinggi serta merata bagi anak-anak bangsa yang terhambat oleh keterbatasan geografis maupun ekonomi."
                      : "SMAN Modal Bangsa Aceh is trusted as one of the national Anchor Schools for the High School PJJ Program by the Ministry of Education. In carrying out this mandate, we are committed to organizing high-quality and equitable distance learning services for children constrained by geographical or economic barriers."}
                  </p>
                  <p>
                    {isId
                      ? "Melalui sistem pembelajaran daring berbasis Learning Management System (LMS) dan pendampingan berkala, siswa PJJ SMAN Modal Bangsa akan mendapatkan kurikulum pengajaran setara dengan kelas reguler serta bimbingan dari guru-guru terbaik kami."
                      : "Through an online learning system based on a Learning Management System (LMS) and periodic mentoring, SMAN Modal Bangsa PJJ students will receive a curriculum equivalent to regular classes and guidance from our best teachers."}
                  </p>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="space-y-3 text-center md:text-left">
                  <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
                    {isId ? "Tahapan & Alur Pendaftaran" : "Admission Process Steps"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-550 font-sans">
                    {isId
                      ? "Ikuti langkah terstruktur berikut untuk menyelesaikan proses pendaftaran program PJJ SMAN Modal Bangsa."
                      : "Follow these structured steps to complete your registration for the SMAN Modal Bangsa PJJ program."}
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
                            {isId ? `Langkah ${step.num}` : `Step ${step.num}`}
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

              {/* Sekolah Mitra — Table */}
              <div className="max-w-5xl mx-auto space-y-6">
                <div className="space-y-2">
                  <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
                    {isId ? "Sekolah Mitra" : "Partner Schools"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-sans">
                    {isId
                      ? "Sekolah-sekolah yang bermitra dengan SMAN Modal Bangsa dalam Program PJJ SMA."
                      : "Schools partnering with SMAN Modal Bangsa in the PJJ SMA Program."}
                  </p>
                </div>

                <div className="hidden md:block w-full overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white">
                  <table className="w-full border-collapse text-sm min-w-[768px]">
                    <thead>
                      <tr className="bg-[#16a34a] text-white">
                        <th className="w-12 py-3 px-4 text-center text-[10px] font-sfpro font-bold tracking-widest uppercase">No.</th>
                        <th className="py-3 px-4 text-left text-[10px] font-sfpro font-bold tracking-widest uppercase">{isId ? "Kabupaten/Kota" : "Regency/City"}</th>
                        <th className="py-3 px-4 text-left text-[10px] font-sfpro font-bold tracking-widest uppercase">{isId ? "Satuan Pendidikan" : "School"}</th>
                        <th className="w-24 py-3 px-4 text-center text-[10px] font-sfpro font-bold tracking-widest uppercase">Status</th>
                        <th className="py-3 px-4 text-left text-[10px] font-sfpro font-bold tracking-widest uppercase">Contact Person</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mitraSekolah.map((row, idx) => {
                        const isInduk = row.status === "Induk";
                        const isEven = idx % 2 === 1;
                        return (
                          <tr
                            key={idx}
                            className={cn(
                              "border-t border-zinc-100 transition-colors duration-150 align-middle hover:bg-emerald-50/50",
                              isEven ? "bg-zinc-50/60" : "bg-white",
                              isInduk && "bg-emerald-50/40 hover:bg-emerald-50/70"
                            )}
                          >
                            <td className="py-3.5 px-4 text-center text-xs text-zinc-400 font-medium">{row.no}</td>
                            <td className="py-3.5 px-4 text-xs text-zinc-500">{row.kabupaten}</td>
                            <td className="py-3.5 px-4 text-sm font-semibold text-zinc-900 font-sfpro">{row.sekolah}</td>
                            <td className="py-3.5 px-4 text-center">
                              {isInduk ? (
                                <span className="inline-block text-[10px] font-bold text-white bg-[#16a34a] rounded-full px-3 py-1 whitespace-nowrap">Induk</span>
                              ) : (
                                <span className="inline-block text-[10px] font-bold text-[#16a34a] bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 whitespace-nowrap">Mitra</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              {row.contacts.length === 0 ? (
                                <span className="text-xs text-zinc-300 italic">{isId ? "Belum tersedia" : "Not yet available"}</span>
                              ) : (
                                <div className="space-y-2.5">
                                  {row.contacts.map((cp, ci) => {
                                    const greeting = `Assalamualaikum Bapak/Ibu ${cp.name}, kami ingin menanyakan perihal SPMB Pendidikan Jarak Jauh`;
                                    const waUrl = `https://wa.me/${cp.waNumber}?text=${encodeURIComponent(greeting)}`;
                                    return (
                                      <a key={ci} href={waUrl} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 group/wa">
                                        <svg className="w-4 h-4 shrink-0 text-[#25D366] group-hover/wa:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.853L.073 23.738a.5.5 0 0 0 .621.601l5.738-1.495A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.668-.524-5.178-1.434l-.36-.216-3.734.972.998-3.633-.236-.373A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                                        </svg>
                                        <div className="min-w-0">
                                          <p className="text-xs font-semibold text-zinc-800 group-hover/wa:text-[#16a34a] transition-colors leading-tight">{cp.name}</p>
                                          <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{cp.phone}</p>
                                        </div>
                                      </a>
                                    );
                                  })}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card List View */}
                <div className="space-y-4 md:hidden">
                  {mitraSekolah.map((row, idx) => {
                    const isInduk = row.status === "Induk";
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "p-5 rounded-2xl border shadow-sm transition-all duration-300",
                          isInduk ? "bg-emerald-50/30 border-emerald-200/60" : "bg-white border-zinc-200/80"
                        )}
                      >
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-zinc-400 font-bold">#{row.no}</span>
                            <span className="text-xs text-zinc-500 font-medium">• {row.kabupaten}</span>
                          </div>
                          {isInduk ? (
                            <span className="text-[9px] font-bold text-white bg-[#16a34a] rounded-full px-2.5 py-0.5 uppercase tracking-wider">Induk</span>
                          ) : (
                            <span className="text-[9px] font-bold text-[#16a34a] bg-emerald-50 border border-emerald-150 rounded-full px-2.5 py-0.5 uppercase tracking-wider">Mitra</span>
                          )}
                        </div>

                        <h4 className="font-bold text-zinc-900 text-sm font-sfpro mb-4">
                          {row.sekolah}
                        </h4>

                        {row.contacts.length === 0 ? (
                          <div className="border-t border-zinc-100 pt-3 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Contact Person</span>
                            <span className="text-xs text-zinc-300 italic">{isId ? "Belum tersedia" : "Not yet available"}</span>
                          </div>
                        ) : (
                          <div className="border-t border-zinc-100 pt-3">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Contact Person</span>
                            <div className="space-y-2">
                              {row.contacts.map((cp, ci) => {
                                const greeting = `Assalamualaikum Bapak/Ibu ${cp.name}, kami ingin menanyakan perihal SPMB Pendidikan Jarak Jauh`;
                                const waUrl = `https://wa.me/${cp.waNumber}?text=${encodeURIComponent(greeting)}`;
                                return (
                                  <a
                                    key={ci}
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-emerald-50/50 border border-zinc-150/60 hover:border-emerald-100 transition-all duration-200 group/wa"
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <svg className="w-4 h-4 shrink-0 text-[#25D366] group-hover/wa:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.853L.073 23.738a.5.5 0 0 0 .621.601l5.738-1.495A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.668-.524-5.178-1.434l-.36-.216-3.734.972.998-3.633-.236-.373A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                                      </svg>
                                      <div className="min-w-0">
                                        <p className="text-xs font-semibold text-zinc-800 group-hover/wa:text-[#16a34a] transition-colors leading-tight">{cp.name}</p>
                                        <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{cp.phone}</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover/wa:text-[#16a34a] transition-colors group-hover/wa:translate-x-0.5 transition-transform" />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PJJ Admission Info CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center bg-zinc-50 border border-zinc-150 p-8 sm:p-12 rounded-[2rem] max-w-5xl mx-auto shadow-sm">
                <div className="space-y-6">
                  <span className="inline-block text-[10px] font-sfpro font-bold tracking-[0.2em] text-[#16a34a] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    {isId ? "Informasi Pendaftaran PJJ" : "PJJ Admission Information"}
                  </span>
                  <h2 className="font-sfpro text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight leading-tight uppercase">
                    {isId ? "Penerimaan Siswa Baru" : "New Student Admission"}{" "}
                    <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1 block sm:inline">
                      Program Pendidikan Jarak Jauh
                    </span>
                  </h2>
                  <div className="space-y-4 text-xs sm:text-sm text-zinc-650 font-sans">
                    <div className="space-y-2">
                      <span className="font-bold text-zinc-900 block uppercase tracking-wider text-[10px] font-sfpro">
                        {isId ? "Syarat Utama:" : "Main Requirements:"}
                      </span>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>{isId ? "Kategori Anak Tidak Sekolah (ATS) atau Lulus Tidak Melanjutkan (LTMS)" : "Out-of-School Children (ATS) or Graduates Not Continuing School (LTMS)"}</li>
                        <li>{isId ? "Lulusan SMP/MTs sederajat tahun ajaran 2024/2025" : "Graduated from SMP/MTs in the 2024/2025 academic year"}</li>
                        <li>{isId ? "Harus yang sudah putus sekolah 1 tahun, atau drop out lulus tahun 2025" : "Must have dropped out for 1 year, or dropped out / graduated in 2025"}</li>
                        <li>{isId ? "Umur maksimal 18 tahun saat melakukan pendaftaran" : "Maximum age of 18 years old at the time of registration"}</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="font-bold text-zinc-900 block uppercase tracking-wider text-[10px] font-sfpro">
                        {isId ? "Berkas Upload:" : "Required Documents to Upload:"}
                      </span>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>{isId ? "Fotokopi Ijazah SMP/MTs sederajat" : "Copy of SMP/MTs certificate"}</li>
                        <li>{isId ? "Kartu Keluarga (KK)" : "Family Card (KK)"}</li>
                        <li>{isId ? "Akta Kelahiran" : "Birth Certificate"}</li>
                        <li>{isId ? "Dokumen tambahan seperti prestasi dan sejenisnya (opsional)" : "Additional documents such as achievements, etc. (optional)"}</li>
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 text-[#16a34a] font-semibold pt-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-pulse" />
                      <span>
                        {isId
                          ? "Periode Pendaftaran: 25 Juni s.d. 10 Juli 2026"
                          : "Registration Period: June 25 to July 10, 2026"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a
                      href="https://spmb.sman-modalbangsa.sch.id/register"
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
                      {isId ? "Hubungi Humas" : "Contact PR"}
                    </a>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-zinc-200">
                  <Image
                    src="/images/spmb/pjj-cta.png"
                    alt="SMAN Modal Bangsa Distance Learning Class"
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
