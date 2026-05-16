import "server-only";
import type { Locale } from "./config";

import id from "./dictionaries/id.json";
import en from "./dictionaries/en.json";

const dictionaries = {
  id,
  en,
} as const;

export type Dictionary = typeof id;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] as Dictionary;
}
