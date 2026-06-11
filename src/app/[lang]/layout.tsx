import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuickAccessSidebar } from "@/components/layout/quick-access-sidebar";
import { SocialSidebar } from "@/components/layout/social-sidebar";
import { BackToTop } from "@/components/ui/back-to-top";
import { LenisProvider } from "@/components/ui/lenis-provider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Don't pre-render at build time — let ISR handle it on first request
// This avoids WP API timeouts during Vercel builds from US data centers
export const dynamicParams = true;

export const viewport: Viewport = {
  themeColor: "#166534",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sman-modalbangsa.sch.id";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${dict.site.name} — ${dict.site.tagline}`,
      template: `%s | ${dict.site.name}`,
    },
    description: dict.site.tagline,
    applicationName: dict.site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l === "id" ? "id-ID" : "en-US", `/${l}`]),
      ),
    },
    openGraph: {
      title: dict.site.name,
      description: dict.site.tagline,
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      siteName: dict.site.name,
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: dict.site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.name,
      description: dict.site.tagline,
      images: ["/logo.png"],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: "/favicon.png",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sman-modalbangsa.sch.id";

  return (
    <html lang={lang === "id" ? "id-ID" : "en-US"} className={plusJakarta.variable}>
      <body className="flex min-h-screen flex-col bg-[color:var(--background)] text-[color:var(--foreground)] antialiased">
        <LenisProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-[color:var(--primary)] focus:px-3 focus:py-2 focus:text-sm focus:text-white"
          >
            {dict.common.skipToContent}
          </a>
          <Header locale={lang} dict={dict} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <QuickAccessSidebar locale={lang} dict={dict} />
          <SocialSidebar />
          <BackToTop />
          <Footer locale={lang} dict={dict} />
          {/* Schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": dict.site.name,
                "description": dict.site.tagline,
                "url": baseUrl,
                "logo": `${baseUrl}/logo.png`,
                "image": `${baseUrl}/logo.png`,
              }),
            }}
          />
        </LenisProvider>
      </body>
    </html>
  );
}
