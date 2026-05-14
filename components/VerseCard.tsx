import Link from "next/link";
import type { Verse } from "@/lib/types";
import { toArabicNumerals, truncateWords, stripDiacritics } from "@/lib/format";
import { cn } from "@/lib/cn";

export function VerseCard({
  verse,
  showSura = false,
  preview,
}: {
  verse: Verse;
  showSura?: boolean;
  preview?: string;
}) {
  return (
    <Link
      href={`/verse/${verse.id}`}
      className="group relative block rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4 transition hover:border-[rgb(var(--accent))] hover:shadow-soft md:p-5"
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-bold",
              verse.starts_with === "مَنْ"
                ? "bg-[rgb(var(--olive))]/15 text-[rgb(var(--olive))]"
                : "bg-[rgb(var(--accent))]/15 text-[rgb(var(--accent))]",
            )}
          >
            {verse.starts_with}
          </span>
          {showSura && (
            <span className="text-xs font-medium text-[rgb(var(--fg-muted))]">
              {verse.sura_name}
            </span>
          )}
        </div>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[rgb(var(--accent-soft))] text-xs font-bold text-[rgb(var(--accent))]">
          {toArabicNumerals(verse.aya_number)}
        </span>
      </header>

      <p className="quran quran-lg line-clamp-3 leading-loose text-[rgb(var(--fg))]" dir="rtl">
        {verse.verse_text}
      </p>

      {preview && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[rgb(var(--fg-muted))]">
          {truncateWords(stripDiacritics(preview), 140)}
        </p>
      )}
    </Link>
  );
}
