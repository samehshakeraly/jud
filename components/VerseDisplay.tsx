"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Share2, Type, Copy, Check, ImageDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Verse } from "@/lib/types";
import { toArabicNumerals } from "@/lib/format";
import { FavoriteButton } from "./FavoriteButton";
import { TafsirTabs } from "./TafsirTabs";
import { HidayatList } from "./HidayatList";
import { useReadingPrefs } from "@/lib/favorites";
import { cn } from "@/lib/cn";
import Link from "next/link";

export function VerseDisplay({
  verse,
  prev,
  next,
}: {
  verse: Verse;
  prev?: Verse;
  next?: Verse;
}) {
  const { prefs, setPrefs } = useReadingPrefs();
  const [copied, setCopied] = useState(false);
  const verseRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const sizeClass = {
    sm: "quran-lg",
    md: "quran-xl",
    lg: "quran-2xl",
    xl: "quran-3xl",
  }[prefs.size];

  const cycleSize = () => {
    const order: Array<"sm" | "md" | "lg" | "xl"> = ["sm", "md", "lg", "xl"];
    setPrefs({ size: order[(order.indexOf(prefs.size) + 1) % order.length] });
  };

  const shareText = `${verse.verse_text}\n\n[${verse.sura_name} : ${verse.aya_number}]`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${verse.sura_name} ${verse.aya_number}`,
          text: shareText,
          url: typeof window !== "undefined" ? window.location.href : undefined,
        });
        return;
      } catch {}
    }
    copy();
  };

  const downloadImage = async () => {
    if (!verseRef.current) return;
    const { toPng } = await import("html-to-image");
    try {
      const dataUrl = await toPng(verseRef.current, {
        pixelRatio: 2,
        backgroundColor: getComputedStyle(document.body).backgroundColor,
        cacheBust: true,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${verse.sura_name}-${verse.aya_number}.png`;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        return;
      if (e.key === "ArrowLeft" && next) router.push(`/verse/${next.id}`);
      if (e.key === "ArrowRight" && prev) router.push(`/verse/${prev.id}`);
      if (e.key === "+") cycleSize();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <article className="animate-fade-up">
      <nav className="mb-4 flex items-center justify-between text-sm text-[rgb(var(--fg-muted))]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[rgb(var(--accent))]">
            السور
          </Link>
          <span aria-hidden>›</span>
          <Link
            href={`/sura/${verse.sura_number}`}
            className="hover:text-[rgb(var(--accent))]"
          >
            {verse.sura_name}
          </Link>
          <span aria-hidden>›</span>
          <span className="text-[rgb(var(--fg))]">
            آية {toArabicNumerals(verse.aya_number)}
          </span>
        </div>
        <span className="hidden text-xs sm:inline">
          صفحة {toArabicNumerals(verse.page)}
        </span>
      </nav>

      <div
        ref={verseRef}
        className="verse-frame relative overflow-hidden p-6 md:p-10"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-3 py-0.5 text-xs font-bold",
                verse.starts_with === "مَنْ"
                  ? "bg-[rgb(var(--olive))]/15 text-[rgb(var(--olive))]"
                  : "bg-[rgb(var(--accent))]/15 text-[rgb(var(--accent))]",
              )}
            >
              تبدأ بـ «{verse.starts_with}»
            </span>
            <span className="rounded-full bg-[rgb(var(--surface))] px-3 py-0.5 text-xs text-[rgb(var(--fg-muted))]">
              {verse.metadata.is_makki ? "مكية" : "مدنية"}
            </span>
          </div>
          <div className="font-display text-sm text-[rgb(var(--fg-muted))]">
            {verse.sura_name} · {toArabicNumerals(verse.aya_number)}
          </div>
        </div>

        <p className={cn("quran text-center", sizeClass)} dir="rtl">
          <span aria-hidden className="text-[rgb(var(--accent))]">﴿</span>{" "}
          {verse.verse_text}{" "}
          <span aria-hidden className="ayah-marker">
            {toArabicNumerals(verse.aya_number)}
          </span>{" "}
          <span aria-hidden className="text-[rgb(var(--accent))]">﴾</span>
        </p>
      </div>

      <div className="no-print mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FavoriteButton id={verse.id} showLabel />
          <button
            onClick={cycleSize}
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--border))] px-3 py-1.5 text-sm transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
            aria-label="تغيير حجم الخط"
          >
            <Type className="h-4 w-4" />
            <span className="hidden sm:inline">حجم الخط ({prefs.size.toUpperCase()})</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--border))] px-3 py-1.5 text-sm transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="hidden sm:inline">{copied ? "تم النسخ" : "نسخ"}</span>
          </button>
          <button
            onClick={downloadImage}
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--border))] px-3 py-1.5 text-sm transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
          >
            <ImageDown className="h-4 w-4" />
            <span className="hidden sm:inline">صورة</span>
          </button>
          <button
            onClick={share}
            className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(var(--accent))] px-3 py-1.5 text-sm text-white transition hover:opacity-90"
          >
            <Share2 className="h-4 w-4" />
            <span>مشاركة</span>
          </button>
        </div>
      </div>

      <TafsirTabs
        mokhtasr={verse.tafsir.mokhtasr}
        moyassar={verse.tafsir.moyassar}
      />

      {verse.word_meanings.seraj?.trim() && (
        <section className="mt-6 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4 md:p-6">
          <h2 className="mb-2 font-display text-lg font-bold">معاني الكلمات</h2>
          <p className="leading-relaxed">{verse.word_meanings.seraj}</p>
        </section>
      )}

      <HidayatList items={verse.hidayat.items} />

      {verse.reflection_question?.trim() && (
        <section className="mt-6 rounded-2xl border border-[rgb(var(--accent))]/40 bg-[rgb(var(--accent-soft))] p-4 md:p-6">
          <h2 className="mb-2 font-display text-lg font-bold text-[rgb(var(--accent))]">
            سؤال للتأمّل
          </h2>
          <p className="leading-relaxed">{verse.reflection_question}</p>
        </section>
      )}

      <nav className="no-print mt-8 flex items-center justify-between gap-2">
        {prev ? (
          <Link
            href={`/verse/${prev.id}`}
            className="group inline-flex flex-1 items-center gap-2 rounded-xl border border-[rgb(var(--border))] p-3 transition hover:border-[rgb(var(--accent))]"
          >
            <ArrowRight className="h-4 w-4 transition group-hover:-translate-x-1" />
            <div className="min-w-0 text-right">
              <div className="text-xs text-[rgb(var(--fg-muted))]">الآية السابقة</div>
              <div className="truncate text-sm font-medium">
                {prev.sura_name} · {toArabicNumerals(prev.aya_number)}
              </div>
            </div>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/verse/${next.id}`}
            className="group inline-flex flex-1 items-center justify-end gap-2 rounded-xl border border-[rgb(var(--border))] p-3 transition hover:border-[rgb(var(--accent))]"
          >
            <div className="min-w-0 text-left">
              <div className="text-xs text-[rgb(var(--fg-muted))]">الآية التالية</div>
              <div className="truncate text-sm font-medium">
                {next.sura_name} · {toArabicNumerals(next.aya_number)}
              </div>
            </div>
            <ArrowLeft className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>

      <p className="no-print mt-4 text-center text-xs text-[rgb(var(--fg-muted))]">
        تنقّل بالأسهم ← → · غيّر حجم الخط بـ +
      </p>
    </article>
  );
}
