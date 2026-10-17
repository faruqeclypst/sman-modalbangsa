import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OnboardingSplash } from "@/components/home/onboarding-splash";
import { QuickAccessSidebar } from "@/components/layout/quick-access-sidebar";
import { SocialSidebar } from "@/components/layout/social-sidebar";
import { BackToTop } from "@/components/ui/back-to-top";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { ImageFadeIn } from "@/components/ui/image-fade-in";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const lang = "id" as const;

export const viewport: Viewport = {
  themeColor: "#166534",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary(lang);

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
    other: {
      google: "notranslate",
    },
    alternates: {
      canonical: `/`,
    },
    openGraph: {
      title: dict.site.name,
      description: dict.site.tagline,
      type: "website",
      locale: "id_ID",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary(lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sman-modalbangsa.sch.id";

  return (
    <html lang="id-ID" className={`${plusJakarta.variable} overflow-x-hidden`} translate="no" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-[color:var(--background)] text-[color:var(--foreground)] antialiased overflow-x-hidden">
        <LenisProvider>
          <ImageFadeIn />
          <OnboardingSplash locale={lang} />
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
