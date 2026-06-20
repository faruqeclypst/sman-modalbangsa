import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#166534] text-white px-6 overflow-hidden selection:bg-emerald-800 selection:text-green-200">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-emerald-500/10 blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-green-500/10 blur-[80px] sm:blur-[120px] pointer-events-none" />

      {/* Main Content Card */}
      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center bg-[#155e2d]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl">
        
        {/* Animated Icon */}
        <div className="relative mb-8 w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group hover:border-green-400/50 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-500/10 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-300 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        {/* Bilingual Titles & Explanations */}
        <div className="space-y-6">
          {/* Indonesian Message */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-sfpro tracking-tight mb-2 text-white">
              Website Sedang dalam Pemeliharaan
            </h1>
            <p className="text-green-200 text-sm sm:text-base max-w-lg mx-auto">
              Kami sedang melakukan pemeliharaan rutin untuk meningkatkan kualitas layanan portal SMAN Modal Bangsa. Kami akan segera kembali.
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-white/10 mx-auto" />

          {/* English Message */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-sfpro tracking-tight mb-2 text-green-300">
              System Maintenance in Progress
            </h2>
            <p className="text-green-300/80 text-sm sm:text-base max-w-lg mx-auto">
              We are currently performing routine maintenance to improve the SMAN Modal Bangsa portal experience. We will be back online shortly.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-xs text-green-300/50 font-mono tracking-wider">
          SMAN MODAL BANGSA &copy; {new Date().getFullYear()} &bull; PORTAL UPDATE
        </div>
      </div>
    </div>
  );
}
