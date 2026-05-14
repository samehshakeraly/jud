"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites";
import type { Verse } from "@/lib/types";
import { VerseCard } from "./VerseCard";
import { Heart } from "lucide-react";

export function FavoritesClient({ verses }: { verses: Verse[] }) {
  const { ids } = useFavorites();
  const map = new Map(verses.map((v) => [v.id, v]));
  const favs = ids.map((id) => map.get(id)).filter(Boolean) as Verse[];

  if (favs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[rgb(var(--border))] p-10 text-center">
        <Heart className="mx-auto h-8 w-8 text-[rgb(var(--accent))]" />
        <p className="mt-3 font-display text-lg">لا توجد مفضّلة بعد</p>
        <p className="mt-1 text-sm text-[rgb(var(--fg-muted))]">
          اضغط على القلب في أي آية لإضافتها هنا.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white"
        >
          تصفّح السور
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {favs.map((v) => (
        <li key={v.id}>
          <VerseCard verse={v} showSura preview={v.tafsir.mokhtasr} />
        </li>
      ))}
    </ul>
  );
}
