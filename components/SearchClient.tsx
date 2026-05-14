"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import type { Verse } from "@/lib/types";
import { search, type SearchFilters, stripTashkeel } from "@/lib/search";
import { VerseCard } from "@/components/VerseCard";
import { toArabicNumerals } from "@/lib/format";
import { cn } from "@/lib/cn";

type SuraOpt = { number: number; name: string };

export function SearchClient({
  verses,
  suras,
}: {
  verses: Verse[];
  suras: SuraOpt[];
}) {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    starts_with: "all",
    origin: "all",
    sura: null,
  });
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState(() => search(verses, "", {}));

  useEffect(() => {
    const t = setTimeout(() => {
      startTransition(() => setResults(search(verses, q, filters)));
    }, 120);
    return () => clearTimeout(t);
  }, [q, filters, verses]);

  const hasQuery = q.trim().length > 0;
  const queryStripped = useMemo(() => stripTashkeel(q.trim()), [q]);

  return (
    <div>
      <div className="sticky top-14 z-30 -mx-4 mb-4 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/85 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
        <label className="relative block">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--fg-muted))]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث في الآيات أو التفاسير أو الهدايات…"
            className="w-full rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] px-4 py-2.5 pr-10 text-sm focus:border-[rgb(var(--accent))]"
            autoFocus
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))]"
              aria-label="مسح البحث"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Chip
            active={filters.starts_with === "all"}
            onClick={() => setFilters({ ...filters, starts_with: "all" })}
          >
            الكل
          </Chip>
          <Chip
            active={filters.starts_with === "مَنْ"}
            onClick={() => setFilters({ ...filters, starts_with: "مَنْ" })}
            tone="olive"
          >
            «مَنْ»
          </Chip>
          <Chip
            active={filters.starts_with === "ومَنْ"}
            onClick={() => setFilters({ ...filters, starts_with: "ومَنْ" })}
            tone="accent"
          >
            «ومَنْ»
          </Chip>
          <span className="mx-1 h-5 w-px bg-[rgb(var(--border))]" />
          <Chip
            active={filters.origin === "all"}
            onClick={() => setFilters({ ...filters, origin: "all" })}
          >
            مكي/مدني
          </Chip>
          <Chip
            active={filters.origin === "makki"}
            onClick={() => setFilters({ ...filters, origin: "makki" })}
          >
            مكية
          </Chip>
          <Chip
            active={filters.origin === "madani"}
            onClick={() => setFilters({ ...filters, origin: "madani" })}
          >
            مدنية
          </Chip>
          <span className="mx-1 h-5 w-px bg-[rgb(var(--border))]" />
          <select
            value={filters.sura ?? ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                sura: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] px-3 py-1 text-sm"
          >
            <option value="">كل السور</option>
            {suras.map((s) => (
              <option key={s.number} value={s.number}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className={cn(
          "mb-3 text-xs text-[rgb(var(--fg-muted))]",
          isPending && "opacity-60",
        )}
      >
        {toArabicNumerals(results.length)} نتيجة
        {hasQuery ? ` لـ «${q}»` : ""}
      </div>

      {results.length === 0 ? (
        <Empty />
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {results.map((r, i) => (
            <li
              key={r.item.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 12) * 20}ms` }}
            >
              <ResultCard
                verse={r.item}
                query={queryStripped}
                preview={r.item.tafsir.mokhtasr}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  tone,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone?: "accent" | "olive";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? tone === "olive"
            ? "border-[rgb(var(--olive))] bg-[rgb(var(--olive))]/12 text-[rgb(var(--olive))]"
            : tone === "accent"
            ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent))]/12 text-[rgb(var(--accent))]"
            : "border-[rgb(var(--fg))]/40 bg-[rgb(var(--surface))] text-[rgb(var(--fg))]"
          : "border-[rgb(var(--border))] text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg))]",
      )}
    >
      {children}
    </button>
  );
}

function Empty() {
  return (
    <div className="rounded-2xl border border-dashed border-[rgb(var(--border))] p-10 text-center">
      <div className="font-display text-lg">لا توجد نتائج</div>
      <p className="mt-1 text-sm text-[rgb(var(--fg-muted))]">
        جرّب كلمات أخرى أو غيّر الفلاتر.
      </p>
    </div>
  );
}

function ResultCard({
  verse,
  preview,
  query,
}: {
  verse: Verse;
  preview: string;
  query: string;
}) {
  return <VerseCard verse={verse} showSura preview={highlight(preview, query)} />;
}

function highlight(text: string, q: string) {
  if (!q) return text;
  return text;
}
