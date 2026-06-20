import "../globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Website Sedang dalam Pemeliharaan | SMAN Modal Bangsa",
  description: "Website sedang melakukan pemeliharaan rutin. Kami akan segera kembali.",
  robots: { index: false, follow: false },
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakarta.variable} overflow-hidden`} translate="no">
      <body className="bg-[#f3f7f4] antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
