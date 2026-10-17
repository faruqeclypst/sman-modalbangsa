"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[app error]", error);
  }, [error]);

  return (
    <Container size="md" className="py-20 text-center">
      <h1 className="text-3xl font-bold text-[color:var(--foreground)] sm:text-4xl">
        Terjadi kesalahan / Something went wrong
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[color:var(--muted-foreground)]">
        Mohon coba lagi sebentar lagi. Please try again in a moment.
      </p>
      <div className="mt-6">
        <Button onClick={() => reset()}>Coba lagi / Retry</Button>
      </div>
    </Container>
  );
}
