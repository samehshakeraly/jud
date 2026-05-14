import Fuse, { type FuseResultMatch } from "fuse.js";
import type { Verse } from "./types";

export type SearchFilters = {
  starts_with?: "مَنْ" | "ومَنْ" | "all";
  origin?: "makki" | "madani" | "all";
  sura?: number | null;
};

export type SearchHit = {
  item: Verse;
  matches?: readonly FuseResultMatch[];
  score?: number;
};

const stripTashkeel = (s: string) =>
  s.normalize("NFKD").replace(/[ً-ْٰۖ-ۭ]/g, "");

function buildFuse(verses: Verse[]) {
  const docs = verses.map((v) => ({
    verse: v,
    plainText: stripTashkeel(v.verse_text),
    sura: v.sura_name,
    mokhtasr: v.tafsir.mokhtasr,
    moyassar: v.tafsir.moyassar,
    hidayat: v.hidayat.items.join(" \n "),
    seraj: v.word_meanings.seraj,
  }));
  return new Fuse(docs, {
    includeMatches: true,
    includeScore: true,
    threshold: 0.35,
    ignoreLocation: true,
    keys: [
      { name: "plainText", weight: 0.4 },
      { name: "sura", weight: 0.1 },
      { name: "mokhtasr", weight: 0.2 },
      { name: "moyassar", weight: 0.15 },
      { name: "hidayat", weight: 0.1 },
      { name: "seraj", weight: 0.05 },
    ],
  });
}

export function search(
  verses: Verse[],
  query: string,
  filters: SearchFilters = {},
): SearchHit[] {
  let pool = verses;
  if (filters.starts_with && filters.starts_with !== "all")
    pool = pool.filter((v) => v.starts_with === filters.starts_with);
  if (filters.origin && filters.origin !== "all")
    pool = pool.filter((v) =>
      filters.origin === "makki" ? v.metadata.is_makki : !v.metadata.is_makki,
    );
  if (filters.sura) pool = pool.filter((v) => v.sura_number === filters.sura);

  if (!query.trim()) return pool.map((item) => ({ item }));

  const fuse = buildFuse(pool);
  const q = stripTashkeel(query.trim());
  return fuse.search(q).map((r) => ({
    item: r.item.verse,
    matches: r.matches,
    score: r.score,
  }));
}

export { stripTashkeel };
