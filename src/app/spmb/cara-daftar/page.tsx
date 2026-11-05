import { permanentRedirect } from "next/navigation";

// Panduan cara mendaftar ini khusus PJJ, halamannya sudah pindah ke /pjj/cara-daftar.
export default function CaraDaftarSPMBPage() {
  permanentRedirect("/pjj/cara-daftar");
}
