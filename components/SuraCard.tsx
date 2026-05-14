import Link from "next/link";
import type { SuraGroup } from "@/lib/types";
import { toArabicNumerals } from "@/lib/format";

export function SuraCard({ sura, index }: { sura: SuraGroup; index?: number }) {
  return (
    <Link
      href={`/sura/${sura.number}`}
      className="group relative flex items-center gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-3 transition hover:-translate-y-0.5 hover:border-[rgb(var(--accent))] hover:shadow-glow"
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full text-[rgb(var(--accent))] opacity-40 transition group-hover:opacity-100">
          <polygon
            points="24,2 30,12 42,12 36,22 42,32 30,32 24,42 18,32 6,32 12,22 6,12 18,12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
        <span className="font-display text-sm font-bold text-[rgb(var(--accent))]">
          {toArabicNumerals(sura.number)}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate font-display text-base font-bold">
            {sura.name}
          </h3>
          <span className="shrink-0 text-[11px] text-[rgb(var(--fg-muted))]">
            {sura.is_makki ? "مكية" : "مدنية"}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-[rgb(var(--fg-muted))]">
          <span>{toArabicNumerals(sura.verses.length)} آية</span>
          <span aria-hidden>•</span>
          <span>
            {sura.verses.filter((v) => v.starts_with === "مَنْ").length > 0 && (
              <span className="text-[rgb(var(--olive))]">مَنْ</span>
            )}
            {sura.verses.filter((v) => v.starts_with === "مَنْ").length > 0 &&
              sura.verses.filter((v) => v.starts_with === "ومَنْ").length > 0 && " · "}
            {sura.verses.filter((v) => v.starts_with === "ومَنْ").length > 0 && (
              <span className="text-[rgb(var(--accent))]">ومَنْ</span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
