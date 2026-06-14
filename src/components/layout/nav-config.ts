import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export interface NavConfig {
  primary: (NavLink | NavGroup)[];
}

export function buildNav(locale: Locale, dict: Dictionary): NavConfig {
  const base = `/${locale}`;
  return {
    primary: [
      { label: dict.nav.home, href: base },
      {
        label: dict.nav.profile,
        links: [
          { label: dict.nav.history, href: `${base}/profil/sejarah` },
          { label: dict.nav.visionMission, href: `${base}/profil/visi-misi` },
          { label: dict.nav.principal, href: `${base}/profil/kepala-sekolah` },
          { label: dict.nav.facilities, href: `${base}/profil/fasilitas` },
          { label: dict.cpt.gtk.label, href: `${base}/gtk` },
        ],
      },
      { label: dict.nav.news, href: `${base}/berita` },
      { label: dict.quickLinks.items.spmb, href: `${base}/spmb` },
      { label: dict.nav.contact, href: `${base}/kontak` },
    ],
  };
}

export function isNavGroup(item: NavLink | NavGroup): item is NavGroup {
  return "links" in item;
}
