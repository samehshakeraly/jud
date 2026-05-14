import Link from "next/link";
import { SURAS, STATS } from "@/lib/data";
import { SuraCard } from "@/components/SuraCard";
import { toArabicNumerals } from "@/lib/format";
import { ArrowLeft, Search, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Hero />

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">السور</h2>
            <p className="text-sm text-[rgb(var(--fg-muted))]">
              {toArabicNumerals(STATS.totalSuras)} سورة تضم {toArabicNumerals(STATS.totalVerses)} آية
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--border))] px-3 py-1.5 text-sm transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
          >
            <Search className="h-4 w-4" />
            بحث متقدّم
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SURAS.map((s, i) => (
            <div key={s.number} style={{ animationDelay: `${i * 20}ms` }} className="animate-fade-up">
              <SuraCard sura={s} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-gradient-to-br from-[rgb(var(--bg-elev))] to-[rgb(var(--accent-soft))] p-6 md:p-10">
      <div
        aria-hidden
        className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[rgb(var(--accent))] opacity-10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-[rgb(var(--olive))] opacity-10 blur-3xl"
      />
      <div className="relative">
        <span className="inline-block rounded-full bg-[rgb(var(--accent-soft))] px-3 py-1 text-xs font-medium text-[rgb(var(--accent))]">
          ﴿ تدبّر القرآن ﴾
        </span>
        <h1 className="mt-3 font-display text-3xl font-black leading-tight md:text-5xl">
          مَنْ <span className="text-[rgb(var(--accent))]">و</span>مَنْ
          <br className="hidden md:block" />{" "}
          <span className="text-[rgb(var(--fg-muted))]">في القرآن الكريم</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgb(var(--fg-muted))] md:text-base">
          جمعٌ لآيات القرآن المبدوءة بـ«مَنْ» و«ومَنْ» — ثمانٍ وسبعون آيةً، في ثمانٍ وثلاثين سورة — مع التفسيرين «المختصر» و«الميسّر»، والهدايات القرآنية.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white shadow-soft transition hover:opacity-90"
          >
            ابدأ التصفّح
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/stats"
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] px-4 py-2 text-sm font-medium transition hover:border-[rgb(var(--accent))]"
          >
            <BarChart3 className="h-4 w-4" />
            لطائف ختامية
          </Link>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="آية" value={STATS.totalVerses} />
          <Stat label="سورة" value={STATS.totalSuras} />
          <Stat label="«مَنْ»" value={STATS.man} color="olive" />
          <Stat label="«ومَنْ»" value={STATS.waman} color="accent" />
        </dl>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: "olive" | "accent";
}) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-3 text-center">
      <div
        className={`font-display text-2xl font-black ${
          color === "olive"
            ? "text-[rgb(var(--olive))]"
            : color === "accent"
            ? "text-[rgb(var(--accent))]"
            : ""
        }`}
      >
        {toArabicNumerals(value)}
      </div>
      <div className="text-xs text-[rgb(var(--fg-muted))]">{label}</div>
    </div>
  );
}
