"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  ZoomIn,
  Sparkles,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageLightbox } from "@/components/ui/image-lightbox";

interface StepData {
  num: string;
  title: string;
  desc: string;
  image: string;
  warning?: string;
  infoList?: string[];
  goal?: string;
}

interface CaraDaftarClientProps {
  lang: string;
}

export function CaraDaftarClient({ lang }: CaraDaftarClientProps) {
  const isId = lang === "id";
  const [activeStep, setActiveStep] = useState<string>("01");
  const [lightboxState, setLightboxState] = useState<{ isOpen: boolean; imgIndex: number } | null>(null);

  // Steps data mapping
  const steps: StepData[] = [
    {
      num: "01",
      title: isId 
        ? "Masuk ke Website SMAN Modal Bangsa" 
        : "Access SMAN Modal Bangsa Website",
      desc: isId
        ? "Pada halaman utama Website SMAN Modal Bangsa, pilih menu SPMB atau klik tombol Daftar PJJ pada halaman depan."
        : "On the main page of the SMAN Modal Bangsa Website, select the SPMB menu or click the Register PJJ button on the front page.",
      image: "/images/tutorial_daftar/1.jpeg",
      goal: isId
        ? "Tujuan: Masuk ke sistem pendaftaran SPMB Pendidikan Jarak Jauh (PJJ) dan mengarahkan calon peserta didik ke halaman registrasi akun."
        : "Goal: Enter the SPMB Distance Learning (PJJ) registration system and direct prospective students to the account registration page."
    },
    {
      num: "02",
      title: isId 
        ? "Membuat Akun SPMB" 
        : "Create an SPMB Account",
      desc: isId
        ? "Pada halaman Daftar Akun SPMB, lengkapi data registrasi dengan benar. Pastikan untuk memilih Jalur Pendaftaran yang sesuai."
        : "On the SPMB Account Registration page, complete the registration form with correct details. Make sure to choose the appropriate registration track.",
      image: "/images/tutorial_daftar/2.png",
      infoList: isId 
        ? [
            "Pilih Jalur Pendaftaran: Pendidikan Jarak Jauh (PJJ)",
            "Masukkan Nama Lengkap",
            "Masukkan NIK (jika tidak memiliki, dapat dikosongkan)",
            "Masukkan Email aktif",
            "Masukkan Password dan Konfirmasi Password",
            "Klik tombol Daftar SPMB setelah semua data terisi."
          ]
        : [
            "Select Registration Track: Distance Learning (PJJ)",
            "Enter Full Name",
            "Enter NIK (National ID - leave blank if not applicable)",
            "Enter active Email address",
            "Enter Password and Confirm Password",
            "Click the Register SPMB button after filling in the data."
          ],
      warning: isId
        ? "Catatan: Gunakan email yang aktif karena informasi penting akan dikirim melalui email tersebut."
        : "Note: Use an active email address as important information will be sent through it."
    },
    {
      num: "03",
      title: isId 
        ? "Memilih Sekolah PJJ" 
        : "Select a PJJ School",
      desc: isId
        ? "Setelah memilih jalur Pendidikan Jarak Jauh (PJJ), pilih sekolah induk atau sekolah mitra sesuai dengan domisili Anda."
        : "After selecting the Distance Learning (PJJ) track, select the anchor (induk) school or partner (mitra) school corresponding to your domicile.",
      image: "/images/tutorial_daftar/3.png",
      infoList: isId
        ? [
            "SMAN Modal Bangsa (Induk)",
            "SMAN 6 Lhokseumawe (Mitra)",
            "SMAN 1 Simpang Mamplam (Mitra)",
            "SMAN 1 Gunung Meriah (Mitra)",
            "SMAN 1 Seulimeum (Mitra)"
          ]
        : [
            "SMAN Modal Bangsa (Anchor)",
            "SMAN 6 Lhokseumawe (Partner)",
            "SMAN 1 Simpang Mamplam (Partner)",
            "SMAN 1 Gunung Meriah (Partner)",
            "SMAN 1 Seulimeum (Partner)"
          ],
      warning: isId
        ? "Pastikan memilih sekolah yang sesuai sebelum melanjutkan proses pendaftaran."
        : "Make sure to select the correct school before proceeding with the registration process."
    },
    {
      num: "04",
      title: isId 
        ? "Mengisi Data Registrasi" 
        : "Fill Registration Details",
      desc: isId
        ? "Lengkapi seluruh informasi pada formulir registrasi awal yang mencakup nama lengkap, NIK, email aktif, password, dan konfirmasi password. Setelah seluruh data benar, klik Daftar SPMB."
        : "Complete all information on the initial registration form, which covers your full name, NIK, active email, password, and password confirmation. Once all data is correct, click Register SPMB.",
      image: "/images/tutorial_daftar/4.png"
    },
    {
      num: "05",
      title: isId 
        ? "Membaca Petunjuk Pengisian Formulir" 
        : "Read Form Instructions",
      desc: isId
        ? "Setelah akun berhasil dibuat, jendela Petunjuk Pengisian Formulir akan muncul. Bacalah seluruh petunjuk dengan seksama. Apabila telah memahami petunjuk, klik tombol Saya Mengerti."
        : "Once the account is successfully created, the Form Completion Instructions window will appear. Read all instructions carefully. Once you understand them, click the I Understand button.",
      image: "/images/tutorial_daftar/5.png",
      infoList: isId
        ? [
            "Lengkapi data pada tab Siswa terlebih dahulu.",
            "Isi data Orang Tua.",
            "Unggah seluruh dokumen persyaratan.",
            "Simpan draft secara berkala.",
            "Formulir yang telah dikirim tidak dapat diubah kembali."
          ]
        : [
            "Complete the data on the Student tab first.",
            "Fill in the Parent/Guardian data.",
            "Upload all required documents.",
            "Save your draft periodically.",
            "Once submitted, the form cannot be edited."
          ]
    },
    {
      num: "06",
      title: isId 
        ? "Mengisi Data Siswa" 
        : "Fill Student Data",
      desc: isId
        ? "Pada tab Siswa, isi seluruh data pribadi calon peserta didik, meliputi data pribadi, data alamat lengkap, dan data asal sekolah. Lengkapi informasi sekolah asal sesuai dokumen resmi."
        : "In the Student tab, fill in all personal details of the prospective student, covering personal data, full address data, and school of origin details. Complete the school of origin information according to official documents.",
      image: "/images/tutorial_daftar/6.png",
      infoList: isId
        ? [
            "Data Pribadi: Jalur Pendaftaran, Nama Lengkap, NIK, NISN, Tempat & Tanggal Lahir, Jenis Kelamin, Anak ke-, Jumlah Saudara.",
            "Data Alamat: Alamat lengkap, Kecamatan, Kabupaten/Kota.",
            "Data Asal Sekolah: Lengkapi sesuai dokumen resmi."
          ]
        : [
            "Personal Data: Registration Track, Full Name, NIK, NISN, Place & Date of Birth, Gender, Birth Order, Number of Siblings.",
            "Address Data: Full address, Subdistrict, Regency/City.",
            "School of Origin Data: Complete according to official documents."
          ],
      warning: isId
        ? "Pastikan seluruh data sesuai dengan dokumen kependudukan resmi."
        : "Ensure all data matches official identity documents."
    },
    {
      num: "07",
      title: isId 
        ? "Mengisi Data Orang Tua" 
        : "Fill Parent Data",
      desc: isId
        ? "Buka tab Orang Tua, kemudian isi data lengkap Ayah dan Ibu sesuai dengan kondisi saat ini."
        : "Open the Parents tab, then fill in the complete information for both Father and Mother according to current records.",
      image: "/images/tutorial_daftar/7.png",
      infoList: isId
        ? [
            "Data Ayah: Nama lengkap, Pekerjaan, Instansi/Unit Kerja, Nomor HP/WhatsApp.",
            "Data Ibu: Nama lengkap, Pekerjaan, Instansi/Unit Kerja, Nomor HP/WhatsApp."
          ]
        : [
            "Father's Data: Full name, Occupation, Institution/Unit of Work, Phone/WhatsApp number.",
            "Mother's Data: Full name, Occupation, Institution/Unit of Work, Phone/WhatsApp number."
          ],
      warning: isId
        ? "Pastikan nomor telepon yang dimasukkan masih aktif agar mudah dihubungi apabila diperlukan."
        : "Ensure the phone numbers entered are active so you can be easily contacted if necessary."
    },
    {
      num: "08",
      title: isId 
        ? "Mengunggah Dokumen Persyaratan" 
        : "Upload Required Documents",
      desc: isId
        ? "Masuk ke tab Dokumen, kemudian persiapkan dan unggah seluruh berkas wajib dan berkas tambahan yang diminta."
        : "Navigate to the Documents tab, then prepare and upload all mandatory and optional supporting files.",
      image: "/images/tutorial_daftar/8.png",
      infoList: isId
        ? [
            "Dokumen wajib: Scan PDF Ijazah SMP/MTs, Scan PDF Kartu Keluarga, Scan PDF Akta Kelahiran.",
            "Dokumen tambahan (opsional): Lampiran A, Lampiran B."
          ]
        : [
            "Required documents: Scanned PDF of SMP/MTs Graduation Certificate, Scanned PDF of Family Card, Scanned PDF of Birth Certificate.",
            "Additional documents (optional): Appendix A, Appendix B."
          ],
      warning: isId
        ? "Pastikan dokumen: Berformat PDF, terbaca jelas, tidak rusak, dan sesuai dengan aslinya."
        : "Ensure documents are: PDF format, clearly readable, not corrupted, and match original documents."
    },
    {
      num: "09",
      title: isId 
        ? "Memilih File Dokumen" 
        : "Select Document File",
      desc: isId
        ? "Klik tombol Pilih pada jenis dokumen yang akan diunggah. Cari lokasi file pada komputer Anda, pilih file PDF yang sesuai, lalu klik Open. Tunggu hingga proses unggah selesai."
        : "Click the Choose button next to the document type you want to upload. Locate the file on your computer, select the corresponding PDF file, and click Open. Wait until the upload process completes.",
      image: "/images/tutorial_daftar/9.png"
    },
    {
      num: "10",
      title: isId 
        ? "Memastikan Dokumen Berhasil Terunggah" 
        : "Verify Document Upload",
      desc: isId
        ? "Apabila proses unggah berhasil, nama file akan tampil pada halaman dan tombol Pilih berubah menjadi Ganti. Lakukan langkah yang sama untuk semua dokumen wajib."
        : "Once the upload succeeds, the file name will show on the page, and the Choose button will change to Change. Repeat the same steps for all mandatory documents.",
      image: "/images/tutorial_daftar/10.png"
    },
    {
      num: "11",
      title: isId 
        ? "Mengirim Formulir" 
        : "Submit the Form",
      desc: isId
        ? "Setelah seluruh data dan dokumen lengkap, klik tombol Kirim Formulir pada bagian bawah halaman formulir."
        : "Once all details and files are complete, click the Submit Form button located at the bottom of the form page.",
      image: "/images/tutorial_daftar/11.png",
      warning: isId
        ? "Sebelum formulir dikirim, pastikan kembali bahwa: Biodata sudah benar, Data orang tua sudah lengkap, dan semua dokumen telah terunggah."
        : "Before submitting, double-check that: Biodata is correct, Parent data is complete, and all required documents have been uploaded."
    },
    {
      num: "12",
      title: isId 
        ? "Konfirmasi Pengiriman" 
        : "Confirm Submission",
      desc: isId
        ? "Sistem akan menampilkan konfirmasi: 'Apakah Anda yakin ingin mengirim formulir pendaftaran ini?'. Jika sudah yakin, klik Ya, Kirim."
        : "The system will show a confirmation prompt: 'Are you sure you want to submit this registration form?'. If you are certain, click Yes, Submit.",
      image: "/images/tutorial_daftar/12.png",
      warning: isId
        ? "Perlu diketahui bahwa setelah formulir dikirim, data Anda akan dikunci dan tidak dapat diubah kembali."
        : "Please note that after submitting, your data will be locked and cannot be modified again."
    },
    {
      num: "13",
      title: isId 
        ? "Formulir Berhasil Dikirim" 
        : "Form Successfully Submitted",
      desc: isId
        ? "Apabila pendaftaran berhasil dikirim, akan muncul pemberitahuan 'Formulir Berhasil Dikirim'. Ini menandakan data pendaftaran Anda telah tersimpan dan siap diverifikasi oleh panitia."
        : "When successfully submitted, a notification reading 'Form Successfully Submitted' will appear. This indicates that your registration data is saved and ready for verification by the committee.",
      image: "/images/tutorial_daftar/13.png",
      goal: isId
        ? "Selanjutnya, silakan klik tombol Unduh Kartu Pendaftaran yang muncul pada layar."
        : "Next, click the Download Registration Card button displayed on the screen."
    },
    {
      num: "14",
      title: isId 
        ? "Mengunduh Bukti Pendaftaran" 
        : "Download Proof of Registration",
      desc: isId
        ? "Sistem akan menghasilkan file PDF Bukti Pendaftaran SPMB PJJ yang memuat data registrasi Anda. Unduh, simpan, dan cetak bukti pendaftaran tersebut sebagai dokumen fisik arsip Anda."
        : "The system will generate a PDF Proof of Registration file containing your registration details. Download, save, and print this proof of registration as your hardcopy archive.",
      image: "/images/tutorial_daftar/13.png",
      goal: isId
        ? "Kartu ini wajib disimpan dan akan digunakan dalam proses verifikasi berkas fisik dan tahapan seleksi selanjutnya."
        : "This card must be saved and will be used during physical document verification and subsequent selection stages."
    }
  ];

  // Set up intersection observer to track current active step during scroll
  const stepRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -45% 0px", // Trigger when the item occupies the center of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveStep(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(stepRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleStepClick = (num: string) => {
    setActiveStep(num);
    const element = document.getElementById(num);
    if (element) {
      const headerOffset = 90; // Adjust for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxState({ isOpen: true, imgIndex: index });
  };

  const lightboxImages = steps.map((s) => ({
    src: s.image,
    alt: s.title
  }));

  return (
    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 relative items-start">
      {/* ============ LEFT COLUMN: STICKY TIMELINE (DESKTOP) ============ */}
      <aside className="hidden lg:block w-80 shrink-0 sticky top-28 self-start max-h-[75vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-200">
        <div className="space-y-6">
          <div className="pb-4 border-b border-zinc-200/80">
            <h3 className="font-sfpro text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              {isId ? "Langkah Pendaftaran" : "Registration Steps"}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <Sparkles className="size-4 text-[#16a34a]" />
              <span className="text-xs text-zinc-550 font-sans font-medium">
                {isId ? "14 Langkah Berurutan" : "14 Sequential Steps"}
              </span>
            </div>
          </div>

          <div className="relative pl-4 border-l border-zinc-200/80 space-y-3.5 py-1">
            {steps.map((step) => {
              const isActive = activeStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => handleStepClick(step.num)}
                  className={cn(
                    "w-full text-left group flex items-start gap-3 py-1.5 transition-all duration-300 relative cursor-pointer outline-none focus:outline-none",
                    isActive ? "text-[#16a34a]" : "text-zinc-400 hover:text-zinc-700"
                  )}
                >
                  {/* Timeline highlight indicator */}
                  {isActive && (
                    <div className="absolute -left-[18.5px] top-3 size-2.5 rounded-full bg-[#16a34a] shadow-[0_0_8px_rgba(22,163,74,0.6)]" />
                  )}
                  <span className="font-mono text-xs font-bold mt-0.5 tracking-wider">
                    {step.num}
                  </span>
                  <div className="min-w-0">
                    <p className={cn(
                      "text-xs font-bold font-sfpro tracking-wide uppercase truncate transition-colors",
                      isActive ? "text-[#16a34a]" : "text-zinc-500 group-hover:text-zinc-800"
                    )}>
                      {step.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* ============ RIGHT COLUMN: STEP CARDS ============ */}
      <div className="flex-1 w-full space-y-12 sm:space-y-16">
        {/* Mobile quick index navigator */}
        <div className="lg:hidden w-full overflow-x-auto py-2 -mx-4 px-4 bg-zinc-50 border-y border-zinc-200 flex gap-2 sticky top-[72px] z-20 scrollbar-none">
          {steps.map((step) => {
            const isActive = activeStep === step.num;
            return (
              <button
                key={step.num}
                onClick={() => handleStepClick(step.num)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider shrink-0 transition-all cursor-pointer border",
                  isActive
                    ? "bg-[#16a34a] text-white border-[#16a34a] shadow-sm"
                    : "bg-white text-zinc-500 border-zinc-200 hover:text-zinc-800"
                )}
              >
                {step.num}
              </button>
            );
          })}
        </div>

        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div
              key={step.num}
              id={step.num}
              ref={(el) => {
                stepRefs.current[step.num] = el;
              }}
              className="scroll-mt-36"
            >
              {/* DOUBLE-BEZEL CARD ARCHITECTURE */}
              <div className="group relative rounded-[2rem] bg-gradient-to-b from-zinc-50 to-white/70 hover:from-white hover:to-white p-1 sm:p-1.5 border border-zinc-200/50 hover:border-emerald-200/40 hover:shadow-xl hover:shadow-emerald-500/[0.02] transition-all duration-700">
                <div className="rounded-[1.85rem] bg-white p-6 sm:p-8 space-y-6 md:space-y-0 md:grid md:grid-cols-12 md:gap-8 items-center">
                  
                  {/* Content Enclosure */}
                  <div className={cn(
                    "space-y-4 md:col-span-6",
                    isEven ? "md:order-1" : "md:order-2"
                  )}>
                    {/* Eyebrow Badge */}
                    <div className="flex items-center gap-2">
                      <span className="inline-block text-[9px] font-sfpro font-bold tracking-[0.2em] text-[#16a34a] bg-emerald-50 border border-emerald-100/40 px-2.5 py-0.5 rounded uppercase">
                        {isId ? `Langkah ${step.num}` : `Step ${step.num}`}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h2 className="font-sfpro text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-[#16a34a] transition-colors duration-500 tracking-tight leading-snug">
                      {step.title}
                    </h2>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-sans font-medium text-justify">
                      {step.desc}
                    </p>

                    {/* Conditional list helper */}
                    {step.infoList && (
                      <ul className="space-y-2.5 pt-2 pl-1">
                        {step.infoList.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-650 font-medium font-sans">
                            <CheckCircle className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Conditional Goal Block */}
                    {step.goal && (
                      <div className="flex gap-2.5 p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-xl mt-3 text-xs sm:text-sm text-zinc-700 font-medium font-sans">
                        <Sparkles className="size-4.5 text-[#16a34a] shrink-0 mt-0.5" />
                        <p>{step.goal}</p>
                      </div>
                    )}

                    {/* Conditional Warning Block */}
                    {step.warning && (
                      <div className="flex gap-2.5 p-3.5 bg-amber-50/40 border border-amber-200/50 rounded-xl mt-3 text-xs sm:text-sm text-zinc-700 font-medium font-sans">
                        <Info className="size-4.5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-amber-800/90">{step.warning}</p>
                      </div>
                    )}
                  </div>

                  {/* Screenshot Enclosure with Inner/Outer nested borders */}
                  <div className={cn(
                    "md:col-span-6 relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md border border-zinc-200/70 p-1.5 bg-zinc-50 transition-all duration-500 cursor-zoom-in",
                    isEven ? "md:order-2" : "md:order-1"
                  )}
                  onClick={() => handleOpenLightbox(index)}
                  >
                    <div className="relative w-full h-full rounded-[0.85rem] overflow-hidden bg-zinc-150">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                      />
                      
                      {/* Zoom Indicator Overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="p-3 rounded-full bg-white/95 text-zinc-800 shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-500">
                          <ZoomIn className="size-5" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Finished / Success Panel */}
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 via-emerald-600/[0.02] to-transparent border border-emerald-500/20 text-center space-y-6 max-w-3xl mx-auto shadow-sm">
          <div className="size-16 rounded-full bg-emerald-100/80 border border-emerald-200/50 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle className="size-8 text-[#16a34a]" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-sfpro text-2xl font-bold text-zinc-950 uppercase tracking-tight">
              {isId ? "Selamat!" : "Congratulations!"}
            </h3>
            <p className="text-sm sm:text-base text-zinc-650 leading-relaxed font-sans max-w-xl mx-auto font-medium">
              {isId
                ? "Proses pendaftaran SPMB Pendidikan Jarak Jauh (PJJ) SMAN Modal Bangsa Aceh telah selesai dilakukan. Silakan menunggu proses verifikasi berkas oleh panitia."
                : "The SMAN Modal Bangsa Aceh SPMB Distance Learning (PJJ) registration process has been successfully completed. Please wait for the document verification stage by the committee."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a
              href="https://spmb.sman-modalbangsa.sch.id"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#16a34a] hover:bg-[#118037] text-white text-xs font-bold tracking-wider py-3.5 px-8 rounded-full transition-all duration-300 font-sfpro uppercase shadow-sm active:scale-[0.98] outline-none"
            >
              {isId ? "Portal SPMB" : "SPMB Portal"}
            </a>
            <a
              href={`/${lang}/spmb`}
              className="bg-transparent border border-zinc-300 hover:border-zinc-500 text-zinc-800 text-xs font-bold tracking-wider py-3.5 px-8 rounded-full transition-all duration-300 font-sfpro uppercase active:scale-[0.98] outline-none"
            >
              {isId ? "Kembali ke SPMB" : "Back to SPMB"}
            </a>
          </div>
        </div>
      </div>

      {/* ============ LIGHTBOX COMPONENT ============ */}
      {lightboxState?.isOpen && (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxState.imgIndex}
          onClose={() => setLightboxState(null)}
        />
      )}
    </div>
  );
}
