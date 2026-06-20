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
        <div className="max-w-md w-full mx-auto space-y-8 animate-slide-up">
          
          {/* Top Section: Brand Eyebrow */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={42}
              height={42}
              className="object-contain"
            />
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-800 font-bold block">
                Portal Resmi
              </span>
              <h2 className="text-xs font-bold text-slate-800 font-sfpro">
                SMAN Modal Bangsa Aceh
              </h2>
            </div>
          </div>

          {/* Core Typography */}
          <div className="space-y-6">
            {/* Indonesian Message */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-sfpro tracking-tight text-slate-900 leading-[1.15]">
                Website sedang <br />
                <span className="text-emerald-700 font-romulo italic font-normal normal-case">dalam pemeliharaan</span>
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                Kami sedang meningkatkan infrastruktur web kami untuk memberikan layanan yang lebih cepat, aman, dan handal. Kami akan segera kembali online.
              </p>
            </div>

            {/* Separator Line */}
            <div className="w-12 h-px bg-slate-200" />

            {/* English Message */}
            <div className="space-y-2">
              <h3 className="text-xs sm:text-sm font-bold font-sfpro tracking-tight text-emerald-800">
                System Upgrades in Progress
              </h3>
              <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-light">
                We are temporarily offline upgrading our servers to enhance the student portal experience. Thank you for your patience.
              </p>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/6285359907696"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-1 inline-flex items-center justify-between pl-5 pr-1.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold text-[10px] rounded-full shadow-[0_2px_10px_rgba(5,150,105,0.15)] transition-all duration-500"
              >
                <span>WhatsApp Developer</span>
                <span className="w-5.5 h-5.5 rounded-full bg-white/20 flex items-center justify-center ml-2.5 transition-transform duration-500 group-hover:translate-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-2.5 h-2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>

              {/* Email Button */}
              <a
                href="mailto:info@sman-modalbangsa.sch.id"
                className="group relative flex-1 inline-flex items-center justify-between pl-5 pr-1.5 py-1.5 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-800 border border-slate-200 font-semibold text-[10px] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-500"
              >
                <span>Kirim Email Bantuan</span>
                <span className="w-5.5 h-5.5 rounded-full bg-slate-200 flex items-center justify-center ml-2.5 transition-transform duration-500 group-hover:translate-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-2.5 h-2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
              </a>
            </div>
            
            <span className="text-[10px] text-slate-400 font-medium block text-left select-none">
              Developer: Alfaruq Asri, S.Pd., Gr
            </span>
          </div>

          {/* Bottom Section: Footer Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[9px] tracking-wider uppercase font-semibold text-slate-400 hover:text-emerald-700 transition-colors"
              >
                Instagram
              </a>
              <span className="text-slate-300 text-xs select-none">&bull;</span>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[9px] tracking-wider uppercase font-semibold text-slate-400 hover:text-emerald-700 transition-colors"
              >
                YouTube
              </a>
            </div>
            <div className="text-[8px] text-slate-400 font-mono tracking-widest uppercase select-none">
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
          <div className="max-w-xs w-full p-2 bg-white/[0.03] border border-white/10 rounded-[2rem] backdrop-blur-xl shadow-2xl animate-slide-up [animation-delay:400ms]">
            <div className="bg-[#05200f]/80 border border-emerald-500/20 rounded-[calc(2rem-0.5rem)] p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner mb-4">
                <Image
                  src="/logo.png"
                  alt="SMAN Modal Bangsa Logo"
                  width={64}
                  height={64}
                  className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
                  priority
                />
              </div>
              <h3 className="text-white font-bold font-sfpro tracking-tight text-sm">
                SMAN Modal Bangsa Aceh
              </h3>
              <p className="text-green-300/60 font-mono text-[9px] uppercase tracking-widest mt-1">
                Sekolah Unggul Berasrama
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
