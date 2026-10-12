"use client";

import * as React from "react";

interface ViewCounterProps {
  id: number;
  initialViews?: number;
  locale: string;
}

// Tampilan "dibaca berapa kali" disembunyikan (permintaan 2026-10-12).
// Komponen tetap menghitung view di background agar datanya terus terkumpul.
export function ViewCounter({ id }: ViewCounterProps) {
  React.useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL || "https://www.sman-modalbangsa.sch.id/wp-json/wp/v2";
    const incrementUrl = `${baseUrl.replace("/wp/v2", "/custom/v1")}/view-post/${id}`;

    fetch(incrementUrl, {
      method: "POST",
      mode: "cors",
    }).catch((err) => {
      console.error("Error incrementing views:", err);
    });
  }, [id]);

  return null;
}
