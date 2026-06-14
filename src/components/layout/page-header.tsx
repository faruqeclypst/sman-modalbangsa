import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  plainTitle?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
  plainTitle,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-gray-100 bg-white",
        className,
      )}
    >
      <Container size="xl" className="relative pt-16 pb-10">
        {breadcrumbs && breadcrumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest">
              {breadcrumbs.map((c, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                    {i === 0 && c.href ? (
                      <Link href={c.href} className="hover:text-emerald-600 transition-colors inline-flex items-center">
                        <Home className="size-3.5" aria-hidden />
                      </Link>
                    ) : !last && c.href ? (
                      <Link
                        href={c.href}
                        className="hover:text-emerald-600 transition-colors"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-gray-600">
                        {c.label}
                      </span>
                    )}
                    {!last ? (
                      <ChevronRight className="size-3 text-gray-300" aria-hidden />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <h1 className="font-sfpro text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl leading-tight">
          {plainTitle ? (
            title
          ) : (() => {
            const words = title.split(" ");
            if (words.length > 1) {
              const lastWord = words.pop();
              const firstPart = words.join(" ");
              return (
                <>
                  {firstPart}{" "}
                  <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">
                    {lastWord}
                  </span>
                </>
              );
            }
            return (
              <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">
                {title}
              </span>
            );
          })()}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-500 leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
