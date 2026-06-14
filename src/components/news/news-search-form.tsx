"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NewsSearchFormProps {
  basePath: string;
  initialQuery?: string;
  placeholder: string;
  ariaLabel: string;
}

export function NewsSearchForm({
  basePath,
  initialQuery = "",
  placeholder,
  ariaLabel,
}: NewsSearchFormProps) {
  const router = useRouter();
  const [value, setValue] = React.useState(initialQuery);

  React.useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = value.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  const onClear = () => {
    setValue("");
    router.push(basePath);
  };

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={cn(
        "relative flex w-full items-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-300 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500",
      )}
    >
      <Search
        className="ml-4 size-4 shrink-0 text-[color:var(--muted-foreground)]"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full bg-transparent px-3 py-2.5 text-sm placeholder:text-[color:var(--muted-foreground)] focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear"
          className="mr-1 inline-flex size-8 items-center justify-center rounded-full text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)]"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </form>
  );
}
