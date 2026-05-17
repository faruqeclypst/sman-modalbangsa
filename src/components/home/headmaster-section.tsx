import Image from "next/image";
import { Quote } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";

interface HeadmasterSectionProps {
  dict: Dictionary;
}

const HEADMASTER = {
  name: "Misra, S.Pd., M.Pd",
  role: "Kepala Sekolah",
  photo: "/headmaster.png",
};

export function HeadmasterSection({ dict }: HeadmasterSectionProps) {
  return (
    <section aria-label={dict.profile.principal.title} className="bg-white py-14 sm:py-16">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[300px_1fr_240px] lg:gap-10">
          {/* Left — Portrait photo (HD, no box/shadow) */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden lg:mx-0 lg:max-w-none">
            <Image
              src={HEADMASTER.photo}
              alt={HEADMASTER.name}
              fill
              sizes="(min-width: 1024px) 300px, 280px"
              className="object-cover object-top"
              unoptimized
              priority
            />
            <div className="absolute rounded-3xl inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12">
              <p className="text-lg font-bold text-white">{HEADMASTER.name}</p>
              <span className="mt-1 inline-flex items-center rounded-full bg-emerald-500/80 px-3 py-0.5 text-xs font-semibold text-white">
                {HEADMASTER.role}
              </span>
            </div>
          </div>

          {/* Center — Greeting text */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Quote className="size-5" />
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {dict.profile.principal.title}
              </h2>
            </div>

            <p className="mt-4 text-base font-semibold text-emerald-700">
              {dict.profile.principal.greeting}
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              {dict.profile.principal.body}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <p className="text-sm font-semibold text-gray-800">
                {HEADMASTER.name}
              </p>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                {HEADMASTER.role}
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </div>

          {/* Right — School logo (HD, transparent, no box) */}
          <div className="hidden flex-col items-center justify-center lg:flex">
            <Image
              src="/logo.png"
              alt="Logo SMAN Modal Bangsa"
              width={192}
              height={192}
              className="h-48 w-48 object-contain"
              unoptimized
            />
            <p className="mt-4 text-center text-base font-bold text-gray-800">
              {dict.site.name}
            </p>
            <p className="mt-1 max-w-[180px] text-center text-xs text-gray-500">
              {dict.site.tagline}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
