import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { ExternalLink, GraduationCap } from "lucide-react";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/alumni">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.alumni.title,
    description: dict.alumni.subtitle,
    alternates: { canonical: `/${lang}/alumni` },
  };
}

export default async function AlumniPage({
  params,
}: PageProps<"/[lang]/alumni">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const googleFormUrl = "https://docs.google.com/forms/d/1MkE8Cno5I6wyP60UZf9y9U6JiMX14BOj46kGZyIB0mU/viewform?embedded=true";
  const directFormUrl = "https://docs.google.com/forms/d/1MkE8Cno5I6wyP60UZf9y9U6JiMX14BOj46kGZyIB0mU/viewform";

  return (
    <>
      <PageHeader
        title={dict.alumni.title}
        subtitle={dict.site.name}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.alumni.title },
        ]}
      />

      <section className="relative overflow-hidden pt-6 pb-16 sm:pt-8 sm:pb-20 bg-[color:var(--background)]">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-16 items-start">
            
            {/* Left Column - Clean Editorial Typography (No AI-slop boxes) */}
            <div className="space-y-8 lg:sticky lg:top-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">
                  <GraduationCap className="h-4 w-4" />
                  <span>{lang === "id" ? "Portal Alumni" : "Alumni Portal"}</span>
                </div>
                
                <h2 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] font-sfpro sm:text-4xl leading-tight">
                  {dict.alumni.introTitle}
                </h2>
                
                <p className="text-base leading-relaxed text-[color:var(--muted-foreground)]">
                  {dict.alumni.introDesc}
                </p>
              </div>

              {/* Minimalist Instructions (No Card Box) */}
              <div className="border-t border-[color:var(--border)] pt-8 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[color:var(--foreground)]">
                  {lang === "id" ? "Petunjuk Akses" : "Access Instructions"}
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                  {dict.alumni.formInstruction}
                </p>
                <div className="pt-2">
                  <a
                    href={directFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[color:var(--primary)] hover:opacity-85 transition-opacity"
                  >
                    <span>{dict.alumni.openFormButton}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Premium Iframe Container */}
            <div className="flex flex-col rounded-2xl border border-[color:var(--border)] bg-white dark:bg-zinc-900 shadow-sm overflow-hidden min-h-[700px] lg:min-h-[900px]">
              
              {/* Form Header bar */}
              <div className="flex items-center justify-between border-b border-[color:var(--border)] px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400 dark:bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 dark:bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400 dark:bg-green-500/80" />
                  </div>
                  <div className="h-4 w-px bg-[color:var(--border)]" />
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted-foreground)] font-sfpro">
                      {lang === "id" ? "Formulir Tracer Study" : "Tracer Study Form"}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xs text-[color:var(--muted-foreground)]">
                    docs.google.com
                  </span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="relative flex-1 w-full h-full bg-zinc-50 dark:bg-zinc-950/20 min-h-[650px] lg:min-h-[850px]">
                <iframe
                  title="Alumni Tracking Form"
                  src={googleFormUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="absolute inset-0 w-full h-full border-0 min-h-[650px] lg:min-h-[850px]"
                >
                  {lang === "id" ? "Memuat..." : "Loading..."}
                </iframe>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
