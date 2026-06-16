import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/kontak/contact-form";

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
  const isId = lang === "id";

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

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* Left — contact info */}
            <div>
              <h2 className="text-2xl font-bold text-[color:var(--foreground)] sm:text-3xl">
                {isId ? "Hubungi Kami" : "Get in Touch"}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[color:var(--muted-foreground)]">
                {isId
                  ? "Kami senang mendengar dari Anda. Silakan hubungi melalui salah satu kanal berikut."
                  : "We'd love to hear from you. Reach out through any of the channels below."}
              </p>

              <dl className="mt-10 space-y-8">
                <div className="flex gap-4">
                  <dt>
                    <MapPin className="mt-0.5 size-5 text-[color:var(--primary)]" />
                  </dt>
                  <dd>
                    <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted-foreground)]">
                      {isId ? "Alamat" : "Address"}
                    </p>
                    <a
                      href="https://maps.google.com/?q=SMAN+Modal+Bangsa+Aceh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-[color:var(--foreground)] hover:text-[color:var(--primary)]"
                    >
                      {dict.footer.address}
                    </a>
                  </dd>
                </div>

                <div className="flex gap-4">
                  <dt>
                    <Mail className="mt-0.5 size-5 text-[color:var(--primary)]" />
                  </dt>
                  <dd>
                    <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted-foreground)]">
                      Email
                    </p>
                    <a
                      href="mailto:info@sman-modalbangsa.sch.id"
                      className="mt-1 block text-[color:var(--foreground)] hover:text-[color:var(--primary)]"
                    >
                      info@sman-modalbangsa.sch.id
                    </a>
                  </dd>
                </div>

                <div className="flex gap-4">
                  <dt>
                    <Phone className="mt-0.5 size-5 text-[color:var(--primary)]" />
                  </dt>
                  <dd>
                    <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted-foreground)]">
                      {isId ? "Telepon" : "Phone"}
                    </p>
                    <a
                      href="tel:+626517551700"
                      className="mt-1 block text-[color:var(--foreground)] hover:text-[color:var(--primary)]"
                    >
                      (0651) 7551700
                    </a>
                  </dd>
                </div>

                <div className="flex gap-4">
                  <dt>
                    <svg viewBox="0 0 24 24" className="mt-0.5 size-5 text-[color:var(--primary)]" fill="currentColor" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </dt>
                  <dd>
                    <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted-foreground)]">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/6285359907696?text=Assalamualaikum%20humas%20SMAN%20Modal%20Bangsa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-[color:var(--foreground)] hover:text-[color:var(--primary)]"
                    >
                      +62 853-5990-7696
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Hours */}
              <div className="mt-10 border-t border-[color:var(--border)] pt-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted-foreground)]">
                  {isId ? "Jam Layanan" : "Service Hours"}
                </p>
                <div className="mt-3 space-y-1 text-sm text-[color:var(--foreground)]">
                  <p>{isId ? "Senin – Jumat" : "Monday – Friday"}: 07.30 – 16.00 WIB</p>
                  <p>{isId ? "Sabtu" : "Saturday"}: 07.30 – 12.00 WIB</p>
                  <p className="text-[color:var(--muted-foreground)]">
                    {isId ? "Minggu & hari libur tutup" : "Closed on Sundays & holidays"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div>
              <ContactForm lang={lang} />
            </div>
          </div>

          {/* Bottom — Map */}
          <div className="mt-16 overflow-hidden rounded-2xl border border-[color:var(--border)] shadow-sm">
            <iframe
              title={dict.footer.address}
              src="https://www.google.com/maps?q=SMAN+Modal+Bangsa+Aceh&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
