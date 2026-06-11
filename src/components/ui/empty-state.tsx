"use client";

import React from "react";
import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  message: string;
  className?: string;
}

export function EmptyState({ message, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-10 text-center ${className}`}>
      <FileQuestion className="size-12 text-[color:var(--muted-foreground)] mb-4 opacity-50" aria-hidden />
      <p className="text-[color:var(--muted-foreground)] font-medium">
        {message}
      </p>
    </div>
  );
}
