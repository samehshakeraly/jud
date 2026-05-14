import raw from "@/verses.json";
import type { Verse, VersesFile, SuraGroup } from "./types";

const file = raw as unknown as VersesFile;

export const META = file.metadata;

export const VERSES: Verse[] = [...file.verses].sort((a, b) => {
  if (a.sura_number !== b.sura_number) return a.sura_number - b.sura_number;
  return a.aya_number - b.aya_number;
});

export const VERSE_BY_ID: Record<string, Verse> = Object.fromEntries(
  VERSES.map((v) => [v.id, v]),
);

export const SURAS: SuraGroup[] = (() => {
  const map = new Map<number, SuraGroup>();
  for (const v of VERSES) {
    if (!map.has(v.sura_number)) {
      map.set(v.sura_number, {
        number: v.sura_number,
        name: v.sura_name,
        is_makki: v.metadata.is_makki,
        verses: [],
      });
    }
    map.get(v.sura_number)!.verses.push(v);
  }
  return Array.from(map.values()).sort((a, b) => a.number - b.number);
})();

export const SURA_BY_NUMBER: Record<number, SuraGroup> = Object.fromEntries(
  SURAS.map((s) => [s.number, s]),
);

export function getNeighbors(id: string): { prev?: Verse; next?: Verse } {
  const i = VERSES.findIndex((v) => v.id === id);
  if (i === -1) return {};
  return {
    prev: i > 0 ? VERSES[i - 1] : undefined,
    next: i < VERSES.length - 1 ? VERSES[i + 1] : undefined,
  };
}

export function suraNeighbors(suraNumber: number, ayaNumber: number) {
  const sura = SURA_BY_NUMBER[suraNumber];
  if (!sura) return {};
  const i = sura.verses.findIndex((v) => v.aya_number === ayaNumber);
  if (i === -1) return {};
  return {
    prevInSura: i > 0 ? sura.verses[i - 1] : undefined,
    nextInSura: i < sura.verses.length - 1 ? sura.verses[i + 1] : undefined,
  };
}

export const STATS = {
  totalVerses: VERSES.length,
  totalSuras: SURAS.length,
  man: VERSES.filter((v) => v.starts_with === "مَنْ").length,
  waman: VERSES.filter((v) => v.starts_with === "ومَنْ").length,
  makki: VERSES.filter((v) => v.metadata.is_makki).length,
  madani: VERSES.filter((v) => !v.metadata.is_makki).length,
  avgHidayat:
    VERSES.reduce((s, v) => s + (v.hidayat.items?.length || 0), 0) /
    VERSES.length,
  topSuras: [...SURAS]
    .sort((a, b) => b.verses.length - a.verses.length)
    .slice(0, 6),
};
