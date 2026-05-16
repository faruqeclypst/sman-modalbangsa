import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * School logo mark — uses the actual SMAN Modal Bangsa logo from WordPress.
 */
export function SchoolMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt="Logo SMAN Modal Bangsa"
        width={40}
        height={40}
        className="object-contain"
        priority
      />
    </span>
  );
}
