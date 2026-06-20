import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div className="relative w-full h-screen min-h-[100dvh] flex flex-col md:flex-row text-slate-800 overflow-hidden bg-[#faf9f6] select-none">
      
      {/* 1. Global Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.012] mix-blend-overlay bg-repeat"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} 
      />

      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(16px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up {
          opacity: 0;
          animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }
      `}} />

      {/* 2. LEFT SIDE: Editorial Typography & CTA */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 sm:p-12 md:p-24 relative z-10 bg-[#faf9f6]">
        <div className="max-w-lg w-full mx-auto space-y-10 animate-slide-up">
          
          {/* Top Section: Brand Eyebrow */}
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={56}
              height={56}
              className="object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.05)]"
            />
            <div className="flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-emerald-800 font-black block leading-tight mb-1">
                Portal Resmi
              </span>
              <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-800 font-sfpro leading-tight">
                SMAN Modal Bangsa Aceh
              </h2>
            </div>
          </div>

          {/* Core Typography */}
          <div className="space-y-8">
            {/* Indonesian Message */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-sfpro tracking-tight text-slate-900 leading-[1.12]">
                Website sedang <br />
                <span className="text-emerald-700 font-romulo italic font-normal normal-case">dalam pemeliharaan</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                Kami sedang meningkatkan infrastruktur web kami untuk memberikan layanan yang lebih cepat, aman, dan handal. Kami akan segera kembali online.
              </p>
            </div>

            {/* Separator Line */}
            <div className="w-16 h-px bg-slate-200" />

            {/* English Message */}
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold font-sfpro tracking-tight text-emerald-800">
                System Upgrades in Progress
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                We are temporarily offline upgrading our servers to enhance the student portal experience. Thank you for your patience.
              </p>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/6285359907696"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-1 inline-flex items-center justify-between pl-6 pr-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm rounded-full shadow-[0_4px_12px_rgba(5,150,105,0.15)] transition-all duration-500"
              >
                <span>WhatsApp Developer</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center ml-2.5 transition-transform duration-500 group-hover:translate-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>

              {/* Email Button */}
              <a
                href="mailto:info@sman-modalbangsa.sch.id"
                className="group relative flex-1 inline-flex items-center justify-between pl-6 pr-2 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-800 border border-slate-200 font-semibold text-xs sm:text-sm rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-500"
              >
                <span>Kirim Email Bantuan</span>
                <span className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center ml-2.5 transition-transform duration-500 group-hover:translate-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
              </a>
            </div>
            
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium block text-left select-none">
              Developer: Alfaruq Asri, S.Pd., Gr
            </span>
          </div>

          {/* Bottom Section: Footer Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-slate-400 hover:text-emerald-700 transition-colors"
              >
                Instagram
              </a>
              <span className="text-slate-300 text-xs select-none">&bull;</span>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-slate-400 hover:text-emerald-700 transition-colors"
              >
                YouTube
              </a>
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-widest uppercase select-none">
              SMAN MODAL BANGSA &copy; {new Date().getFullYear()}
            </div>
          </div>

        </div>
      </div>

      {/* 3. RIGHT SIDE: Showcase Panel with Layered Z-Axis depth */}
      <div className="hidden md:block md:w-1/2 h-full relative overflow-hidden bg-emerald-950">
        {/* Large Cover Image (Custom generated local image) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-fade-in"
          style={{ backgroundImage: `url("/maintenance_bg.png")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#021f10]/80 via-[#063519]/40 to-[#021f10]/80 pointer-events-none" />

        {/* Floating Concentric Glass Overlay for Artistic Depth */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-sm w-full p-2.5 bg-white/[0.03] border border-white/10 rounded-[2.25rem] backdrop-blur-xl shadow-2xl animate-slide-up [animation-delay:400ms]">
            <div className="bg-[#05200f]/85 border border-emerald-500/25 rounded-[calc(2.25rem-0.625rem)] p-10 flex flex-col items-center text-center">
              <div className="p-5 bg-white/5 rounded-3xl border border-white/10 shadow-inner mb-5">
                <Image
                  src="/logo.png"
                  alt="SMAN Modal Bangsa Logo"
                  width={100}
                  height={100}
                  className="object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.3)]"
                  priority
                />
              </div>
              <h3 className="text-white font-bold font-sfpro tracking-tight text-base sm:text-lg">
                SMAN Modal Bangsa Aceh
              </h3>
              <p className="text-green-300/60 font-mono text-[10px] sm:text-xs uppercase tracking-widest mt-1.5">
                Sekolah Unggul Berasrama
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
