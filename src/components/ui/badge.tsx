import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "outline" | "muted";
}

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "bg-[color:var(--accent)]/10 text-[color:var(--accent)] border border-[color:var(--accent)]/20 backdrop-blur-sm",
  primary:
    "bg-[color:var(--primary)]/90 text-[color:var(--primary-foreground)] backdrop-blur-sm",
  outline:
    "border border-white/30 bg-white/40 text-[color:var(--muted-foreground)] backdrop-blur-sm",
  muted: "bg-white/50 text-[color:var(--muted-foreground)] backdrop-blur-sm border border-white/20",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
