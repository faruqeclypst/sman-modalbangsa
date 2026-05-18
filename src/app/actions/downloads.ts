"use server";

import { getDownloads } from "@/lib/wp";

export async function fetchDownloadsAction(page = 1) {
  return await getDownloads(10, page);
}
