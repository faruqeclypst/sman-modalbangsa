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
  variant?: "white" | "green";
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
  plainTitle,
  variant = "green",
}: PageHeaderProps) {
  const isGreen = variant === "green";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isGreen
          ? "bg-gradient-to-b from-[#056b43] via-[#045937] to-[#03442a] border-b border-emerald-800"
          : "border-b border-gray-100 bg-white",
        className,
      )}
    >
      {/* Decorative pattern for green variant */}
      {isGreen && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}

      <Container size="xl" className="relative pt-16 pb-10">
        {breadcrumbs && breadcrumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className={cn(
              "flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest",
              isGreen ? "text-emerald-300/80" : "text-gray-400"
            )}>
              {breadcrumbs.map((c, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                    {i === 0 && c.href ? (
                      <Link
                        href={c.href}
                        className={cn(
                          "transition-colors inline-flex items-center",
                          isGreen ? "hover:text-white text-emerald-200" : "hover:text-emerald-600 text-gray-400"
                        )}
                      >
                        <Home className="size-3.5" aria-hidden />
                      </Link>
                    ) : !last && c.href ? (
                      <Link
                        href={c.href}
                        className={cn(
                          "transition-colors",
                          isGreen ? "hover:text-white text-emerald-250" : "hover:text-emerald-600"
                        )}
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span
                        aria-current="page"
                        className={isGreen ? "text-white" : "text-gray-600"}
                      >
                        {c.label}
                      </span>
                    )}
                    {!last ? (
                      <ChevronRight
                        className={cn(
                          "size-3",
                          isGreen ? "text-emerald-500/50" : "text-gray-300"
                        )}
                        aria-hidden
                      />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <h1 className={cn(
          "font-sfpro text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl leading-tight",
          isGreen ? "text-white" : "text-zinc-950"
        )}>
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
                  <span className={cn(
                    "font-romulo font-normal italic normal-case px-1",
                    isGreen ? "text-emerald-300" : "text-[#16a34a]"
                  )}>
                    {lastWord}
                  </span>
                </>
              );
            }
            return (
              <span className={cn(
                "font-romulo font-normal italic normal-case px-1",
                isGreen ? "text-emerald-300" : "text-[#16a34a]"
              )}>
                {title}
              </span>
            );
          })()}
        </h1>
        {subtitle ? (
          <p className={cn(
            "mt-3 max-w-2xl text-sm sm:text-base leading-relaxed",
            isGreen ? "text-emerald-100/85" : "text-gray-500"
          )}>
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
