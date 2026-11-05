"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPjjFaqs, getPjjSteps, mitraSekolah } from "./spmb-data";

interface PJJClientProps {
  lang: string;
}

export function PJJClient({ lang }: PJJClientProps) {
  const isId = lang === "id";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pjjFaqs = getPjjFaqs(isId);
  const pjjSteps = getPjjSteps(isId);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-24">
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
            <span className="text-[#15803d] font-romulo font-normal italic normal-case px-1">Pendidikan Jarak Jauh</span>
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
              ? "Ikuti langkah terstruktur berikut untuk menyelesaikan proses pendaftaran program PJJ SMAN Modal Bangsa. Untuk panduan lengkap bergambar, silakan baca "
              : "Follow these structured steps to complete your registration for the SMAN Modal Bangsa PJJ program. For a complete visual guide, please read our "}
            <a href={`/pjj/cara-daftar`} className="text-[#16a34a] hover:underline font-semibold">
              {isId ? "panduan cara mendaftar" : "registration guide"}
            </a>
            .
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
                  <span className="inline-block text-[9px] font-sfpro font-bold tracking-widest text-zinc-500 uppercase bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200/60">
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

      {/* Sekolah Mitra, Table */}
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
                              <a key={ci} href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/wa">
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
                  "p-5 rounded-2xl border shadow-sm",
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
                    <span className="text-[9px] font-bold text-[#16a34a] bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5 uppercase tracking-wider">Mitra</span>
                  )}
                </div>
                <h4 className="font-bold text-zinc-900 text-sm font-sfpro mb-4">{row.sekolah}</h4>
                <div className="border-t border-zinc-100 pt-3">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Contact Person</span>
                  {row.contacts.length === 0 ? (
                    <span className="text-xs text-zinc-300 italic">{isId ? "Belum tersedia" : "Not yet available"}</span>
                  ) : (
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
                            className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-150/60"
                          >
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-zinc-800 leading-tight">{cp.name}</p>
                              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{cp.phone}</p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
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
            <span className="text-[#15803d] font-romulo font-normal italic normal-case px-1 block sm:inline">
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
                  ? "Periode Pendaftaran: 2 Juli s.d. 31 Juli 2026"
                  : "Registration Period: July 2 to July 31, 2026"}
              </span>
            </div>
          </div>

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
