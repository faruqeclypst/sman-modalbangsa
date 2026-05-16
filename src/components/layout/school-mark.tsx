import { cn } from "@/lib/utils";

/**
 * Lightweight SVG school mark used in the header and footer in place of a logo image.
 * Designed to evoke an open book + graduation context with the school's primary color.
 */
export function SchoolMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--primary)] text-white shadow-sm",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        width="22"
        height="22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 4L3 10l13 6 10-4.615V20h2V10L16 4Z"
          fill="currentColor"
        />
        <path
          d="M8 14.6V20c0 1.1.6 2.1 1.6 2.7L16 26l6.4-3.3c1-.6 1.6-1.6 1.6-2.7v-5.4l-8 3.7-8-3.7Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
    </span>
  );
}
