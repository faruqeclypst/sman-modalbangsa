"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f8fafc",
          color: "#0f172a",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
            Terjadi kesalahan
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#475569" }}>
            Maaf, sesuatu yang tidak terduga terjadi. Silakan coba lagi.
          </p>
          {error.digest ? (
            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#94a3b8" }}>
              Error ref: {error.digest}
            </p>
          ) : null}
          <button
            onClick={() => reset()}
            style={{
              marginTop: "1.25rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "0.5rem",
              background: "#1e3a8a",
              color: "white",
              border: 0,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Coba lagi
          </button>
        </div>
      </body>
    </html>
  );
}
