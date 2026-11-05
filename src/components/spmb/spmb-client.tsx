"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WPPost } from "@/lib/wp-types";
import {
  getSpmbFaqs,
  getSpmbGeneralRequirements,
  getSpmbSchedule,
} from "./spmb-data";

interface SPMBClientProps {
  lang: string;
  galleryItems?: WPPost[];
}

export function SPMBClient({ lang, galleryItems = [] }: SPMBClientProps) {
  const isId = lang === "id";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const ctaPhoto = React.useMemo(() => {
    const keywords = ["spmb", "pendaftaran", "seleksi", "cat", "ujian", "test", "wawancara", "syarat", "daftar", "calon", "psb", "ppdb"];
    const matched = allPhotos.filter((p) =>
      keywords.some((kw) => p.title.toLowerCase().includes(kw))
    );
    return matched[2]?.url || allPhotos[2]?.url || "/images/cta.jpeg";
  }, [allPhotos]);

  const spmbFaqs = getSpmbFaqs(isId);
  const requirements = getSpmbGeneralRequirements(isId);
  const schedule = getSpmbSchedule(isId);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-24">
      {/* Intro and Hero Image */}
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
          <span className="text-[#15803d] font-romulo font-normal italic normal-case px-1">
            SMAN Modal Bangsa
          </span>{" "}
          {isId ? "" : "Admission"}
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans text-justify sm:text-left">
          {isId
            ? "Kami informasikan bahwa SPMB SMAN Modal Bangsa untuk Tahun Ajaran 2027/2028 telah dibuka untuk Jalur Undangan dan Jalur Prestasi. Pendaftaran dilakukan secara daring (online) melalui Web SPMB pada 9 s.d 13 November 2026. Kami mengundang putra-putri terbaik bangsa untuk bergabung dan berkembang bersama kami di lingkungan belajar yang unggul, islami, dan berkarakter kepemimpinan. Jalur Reguler saat ini belum dibuka, jadwalnya akan diumumkan kemudian."
            : "We inform you that SMAN Modal Bangsa admissions for the 2027/2028 Academic Year are now open for the Invitation Track and the Achievement Track. Registration is carried out online through the SPMB Website from November 9 to 13, 2026. We invite the nation's best sons and daughters to join and grow with us in an excellent, Islamic, and leadership-oriented learning environment. The Regular Track is not open yet, and its schedule will be announced later."}
        </p>
      </div>

      {/* Syarat Umum */}
      <div className="max-w-5xl mx-auto space-y-8">
        <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
          {isId ? "Syarat Umum" : "General Requirements"}
        </h3>
        <ul className="space-y-3.5">
          {requirements.map((req, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-650 font-sans leading-relaxed">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
                <Check className="size-3 text-[#16a34a]" />
              </span>
              <span>{req}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-3">
            <h4 className="font-bold text-base text-zinc-950 font-sfpro border-b border-zinc-100 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
              {isId ? "Syarat Khusus Jalur Undangan" : "Invitation Track Requirements"}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed">
              {isId
                ? "Merupakan siswa dari sekolah yang diundang, dibuktikan dengan surat rekomendasi dari kepala sekolah."
                : "The applicant must come from an invited school, proven by a recommendation letter from the principal."}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-base text-zinc-950 font-sfpro border-b border-zinc-100 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
              {isId ? "Syarat Khusus Jalur Prestasi" : "Achievement Track Requirements"}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed">
              {isId
                ? "Wajib melampirkan sertifikat atau bukti juara, minimal juara 1 tingkat kabupaten, untuk lomba yang diselenggarakan oleh Kementerian Pendidikan (OSN, FLS3N, O2SN, FIKSI, KIHAJAR, dan OPSI) atau Kementerian Agama (OMI dan MYRES)."
                : "Applicants must attach a certificate or proof of achievement, at minimum a first-place win at regency level, from a competition held by the Ministry of Education (OSN, FLS3N, O2SN, FIKSI, KIHAJAR, and OPSI) or the Ministry of Religious Affairs (OMI and MYRES)."}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4">
          <span className="inline-block w-fit text-[10px] font-sfpro font-bold tracking-widest uppercase bg-zinc-200/70 text-zinc-600 px-3 py-1 rounded-full">
            {isId ? "Belum Dibuka" : "Not Open Yet"}
          </span>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
            {isId
              ? "Jalur Reguler: persyaratannya kurang lebih sama dengan syarat umum di atas. Jadwal pembukaannya akan diumumkan kemudian."
              : "Regular Track: its requirements are broadly the same as the general requirements above. Its opening schedule will be announced later."}
          </p>
        </div>

        <p className="text-center pt-4 text-[#15803d] font-romulo font-normal italic text-lg sm:text-xl">
          {isId
            ? "Kami sangat menantikan kehadiranmu untuk bergabung dalam keluarga besar SMAN Modal Bangsa!"
            : "We look forward to welcoming you to the family of SMAN Modal Bangsa!"}
        </p>
      </div>

      {/* Jadwal Section */}
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-3 text-center md:text-left">
          <h3 className="font-sfpro text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
            {isId ? "Jadwal SPMB" : "Admissions Schedule"}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 font-sans">
            {isId
              ? "Jadwal Jalur Undangan dan Prestasi, Tahun Ajaran 2027/2028."
              : "Schedule for the Invitation and Achievement Tracks, 2027/2028 Academic Year."}
          </p>
        </div>

        <div className="hidden md:block w-full overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white">
          <table className="w-full border-collapse text-sm min-w-[640px]">
            <thead>
              <tr className="bg-[#16a34a] text-white">
                <th className="w-12 py-3 px-4 text-center text-[10px] font-sfpro font-bold tracking-widest uppercase">No.</th>
                <th className="py-3 px-4 text-left text-[10px] font-sfpro font-bold tracking-widest uppercase">{isId ? "Kegiatan" : "Activity"}</th>
                <th className="py-3 px-4 text-left text-[10px] font-sfpro font-bold tracking-widest uppercase">{isId ? "Tanggal" : "Date"}</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, idx) => (
                <tr key={idx} className={cn("border-t border-zinc-100 align-middle", idx % 2 === 1 ? "bg-zinc-50/60" : "bg-white")}>
                  <td className="py-3.5 px-4 text-center text-xs text-zinc-400 font-medium">{idx + 1}</td>
                  <td className="py-3.5 px-4 text-sm font-semibold text-zinc-900 font-sfpro">{item.kegiatan}</td>
                  <td className="py-3.5 px-4 text-xs sm:text-sm text-zinc-600 whitespace-nowrap">{item.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {schedule.map((item, idx) => (
            <div key={idx} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <span className="font-mono text-xs font-bold text-zinc-400 mt-0.5">{String(idx + 1).padStart(2, "0")}</span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-zinc-900 font-sfpro leading-snug">{item.kegiatan}</p>
                <p className="text-xs text-[#15803d] font-semibold">{item.tanggal}</p>
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
            <span className="text-[#15803d] font-romulo font-normal italic normal-case px-1 block sm:inline">
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
              href="https://spmb.sman-modalbangsa.sch.id"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#16a34a] hover:bg-[#118037] text-white text-xs font-bold tracking-wider py-3.5 px-6 rounded-full flex items-center justify-between transition-all duration-300 font-sfpro uppercase shadow-sm active:scale-[0.98]"
            >
              <span>{isId ? "Daftar Sekarang" : "Register Now"}</span>
              <ArrowUpRight className="size-4 ml-2" />
            </a>
            <a
              href={`/kontak`}
              className="bg-transparent border border-zinc-300 hover:border-zinc-500 text-zinc-800 text-xs font-bold tracking-wider py-3.5 px-6 rounded-full text-center transition-all duration-300 font-sfpro uppercase active:scale-[0.98]"
            >
              {isId ? "Hubungi Kami" : "Contact Us"}
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-zinc-200">
          <Image
            src={ctaPhoto}
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
              <div key={idx} className="py-2 transition-colors duration-300">
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
    </div>
  );
}
