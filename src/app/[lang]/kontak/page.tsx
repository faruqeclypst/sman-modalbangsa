import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/kontak">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.nav.contact,
    description: dict.footer.address,
    alternates: { canonical: `/${lang}/kontak` },
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/kontak">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const items = [
    {
      Icon: MapPin,
      label: dict.footer.address,
      href: "https://maps.google.com/?q=SMAN+Modal+Bangsa+Aceh",
    },
    {
      Icon: Mail,
      label: "info@sman-modalbangsa.sch.id",
      href: "mailto:info@sman-modalbangsa.sch.id",
    },
    {
      Icon: Phone,
      label: "(0651) 7551700",
      href: "tel:+6265175517 00".replace(/\s/g, ""),
    },
  ];

  return (
    <>
      <PageHeader
        title={dict.nav.contact}
        subtitle={dict.site.name}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.nav.contact },
        ]}
      />
      <Container size="md" className="py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-start gap-3 rounded-xl border border-[color:var(--border)] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-sm leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
                {label}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-[color:var(--border)] shadow-sm">
          <iframe
            title={dict.footer.address}
            src="https://www.google.com/maps?q=SMAN+Modal+Bangsa+Aceh&output=embed"
            width="100%"
            height="380"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full border-0"
          />
        </div>
      </Container>
    </>
  );
}
