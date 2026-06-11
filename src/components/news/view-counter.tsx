"use client";

import * as React from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  id: number;
  initialViews?: number;
  locale: string;
}

export function ViewCounter({ id, initialViews = 0, locale }: ViewCounterProps) {
  const [views, setViews] = React.useState<number>(initialViews);

  React.useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL || "https://www.sman-modalbangsa.sch.id/wp-json/wp/v2";
    const incrementUrl = `${baseUrl.replace("/wp/v2", "/custom/v1")}/view-post/${id}`;

    fetch(incrementUrl, {
      method: "POST",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && typeof data.views === "number") {
          setViews(data.views);
        }
      })
      .catch((err) => {
        console.error("Error updating/fetching views:", err);
      });
  }, [id]);

  const label = locale === "id" ? "kali dibaca" : "views";
  return (
    <span className="inline-flex items-center gap-1.5">
      <Eye className="size-4" aria-hidden /> {views.toLocaleString(locale === "id" ? "id-ID" : "en-US")} {label}
    </span>
  );
}
