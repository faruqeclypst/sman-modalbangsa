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
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-[color:var(--border)] bg-gradient-to-br from-[#14532d] via-[#166534] to-[#15803d] text-white",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18) 0, transparent 40%), radial-gradient(circle at 80% 80%, rgba(245,158,11,0.25) 0, transparent 40%)",
        }}
      />
      <Container className="relative py-12 sm:py-16">
        {breadcrumbs && breadcrumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/85 sm:text-sm">
              {breadcrumbs.map((c, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                    {i === 0 && c.href ? (
                      <Home className="size-3.5" aria-hidden />
                    ) : null}
                    {!last && c.href ? (
                      <Link
                        href={c.href}
                        className="rounded hover:text-white"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="font-medium text-white">
                        {c.label}
                      </span>
                    )}
                    {!last ? (
                      <ChevronRight className="size-3.5 opacity-60" aria-hidden />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
