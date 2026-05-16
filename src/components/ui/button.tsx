import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:opacity-90 shadow-sm",
        secondary:
          "bg-[color:var(--secondary)] text-[color:var(--secondary-foreground)] hover:opacity-90 shadow-sm",
        outline:
          "border border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:bg-[color:var(--muted)]",
        ghost:
          "text-[color:var(--foreground)] hover:bg-[color:var(--muted)]",
        link: "text-[color:var(--primary)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

export { buttonVariants };
