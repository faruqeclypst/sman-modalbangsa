import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div className="relative w-full h-screen min-h-[100dvh] flex flex-col items-center justify-center text-slate-800 px-4 overflow-hidden bg-[#f3f7f4] select-none">
      
      {/* 1. Global Noise Overlay (Fixed, pointer-events-none, z-index 50) */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] mix-blend-overlay bg-repeat"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} 
      />

      {/* 2. Soft Fresh Radial Orbs */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-emerald-200/20 blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-green-200/15 blur-[90px] sm:blur-[125px] pointer-events-none" />

      {/* Custom Styles for Keyframe Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.99);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* 3. Concentric Double-Bezel Card Structure (Light Theme) */}
      <div className="animate-fade-in-up opacity-0 relative z-10 max-w-md w-full p-1.5 bg-white/30 border border-white/75 rounded-[2rem] shadow-[0_10px_30px_rgba(22,101,52,0.03)] backdrop-blur-xl">
        <div className="bg-white/80 border border-emerald-500/10 rounded-[calc(2rem-0.375rem)] px-5 py-6 sm:px-8 sm:py-8 flex flex-col items-center shadow-[inset_0_1px_1px_white]">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100/70 text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-800 mb-5 select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
            </span>
            System Upgrading
          </div>

          {/* School Logo Container */}
          <div className="p-1 bg-slate-50 border border-slate-200/50 rounded-2xl shadow-inner mb-3 group hover:border-emerald-500/30 hover:shadow-sm transition-all duration-500">
            <div className="bg-white border border-slate-100 rounded-[calc(1rem-0.25rem)] p-2.5 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="SMAN Modal Bangsa Logo"
                width={52}
                height={52}
                className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)] group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-4">
            <span className="text-[8px] uppercase tracking-[0.25em] text-emerald-700 font-bold block mb-0.5">
              Portal Resmi
            </span>
            <h2 className="text-base sm:text-lg font-bold font-sfpro tracking-tight text-slate-800">
              SMAN Modal Bangsa Aceh
            </h2>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4" />

          {/* Messages */}
          <div className="space-y-4 text-center w-full">
            {/* Indonesian */}
            <div className="space-y-1">
              <h1 className="text-sm sm:text-base font-bold font-sfpro tracking-tight text-slate-900 leading-tight">
                Website Sedang dalam Pemeliharaan
              </h1>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed max-w-xs mx-auto">
                Kami sedang meningkatkan infrastruktur web kami untuk memberikan layanan yang lebih cepat dan aman. Kami akan segera kembali online.
              </p>
            </div>

            {/* Separator Dot */}
            <div className="w-1 h-1 rounded-full bg-slate-200 mx-auto" />

            {/* English */}
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-bold font-sfpro tracking-tight text-emerald-700 leading-tight">
                Under Scheduled Maintenance
              </h3>
              <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed max-w-xs mx-auto font-light">
                We are temporarily offline upgrading our servers to enhance the student portal experience. Thank you for your understanding.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mt-4 mb-4" />

          {/* Button CTA */}
          <a
            href="mailto:info@sman-modalbangsa.sch.id"
            className="group relative inline-flex items-center justify-between pl-4 pr-1.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold text-[10px] rounded-full shadow-[0_2px_10px_rgba(5,150,105,0.15)] transition-all duration-500"
          >
            <span>Hubungi Layanan Bantuan</span>
            <span className="w-5.5 h-5.5 rounded-full bg-white/20 flex items-center justify-center ml-2.5 transition-transform duration-500 group-hover:translate-x-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-2.5 h-2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </a>

          {/* Socials */}
          <div className="mt-5 flex items-center justify-center gap-2.5">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-emerald-500/20 text-slate-500 hover:text-emerald-700 transition-all duration-500 text-[9px] tracking-wider uppercase"
            >
              Instagram
            </a>
            <span className="text-slate-300 text-xs select-none">&bull;</span>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-emerald-500/20 text-slate-500 hover:text-emerald-700 transition-all duration-500 text-[9px] tracking-wider uppercase"
            >
              YouTube
            </a>
          </div>

          {/* Copyright */}
          <div className="mt-5 text-[8px] text-slate-400 font-mono tracking-widest uppercase select-none">
            SMAN MODAL BANGSA &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
