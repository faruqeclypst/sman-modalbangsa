"use client";

import * as React from "react";

interface ViewCounterTriggerProps {
  id: number;
}

export function ViewCounterTrigger({ id }: ViewCounterTriggerProps) {
  React.useEffect(() => {
    // Only increment in client-side production / live site browsing (avoid duplicate counts in development if needed, but here we count everything)
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL || "https://www.sman-modalbangsa.sch.id/wp-json/wp/v2";
    const incrementUrl = `${baseUrl.replace("/wp/v2", "/custom/v1")}/view-post/${id}`;

    fetch(incrementUrl, {
      method: "POST",
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          console.warn("Failed to increment view count", res.status);
        }
      })
      .catch((err) => {
        console.error("Error incrementing view count:", err);
      });
  }, [id]);

  return null;
}
