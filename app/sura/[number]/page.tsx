import { notFound } from "next/navigation";
import Link from "next/link";
import { SURA_BY_NUMBER, SURAS } from "@/lib/data";
import { VerseCard } from "@/components/VerseCard";
import { toArabicNumerals } from "@/lib/format";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return SURAS.map((s) => ({ number: String(s.number) }));
}

export function generateMetadata({ params }: { params: { number: string } }) {
  const sura = SURA_BY_NUMBER[Number(params.number)];
  if (!sura) return {};
  return { title: `${sura.name}` };
}

export default function SuraPage({ params }: { params: { number: string } }) {
  const sura = SURA_BY_NUMBER[Number(params.number)];
  if (!sura) notFound();

  const prevSura = SURAS.find(
    (s, i) => SURAS[i + 1]?.number === sura.number,
  );
  const nextSura = SURAS.find(
    (s, i) => SURAS[i - 1]?.number === sura.number,
  );

  return (
    <div className="animate-fade-up">
      <nav className="mb-4 flex items-center justify-between text-sm text-[rgb(var(--fg-muted))]">
        <Link href="/" className="hover:text-[rgb(var(--accent))]">
          ‹ كل السور
        </Link>
        <span className="text-xs">
          سورة رقم {toArabicNumerals(sura.number)}
        </span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6 text-center md:p-10">
        <div
          aria-hidden
          className="ornament-thick absolute inset-x-10 top-3"
        />
        <p className="font-display text-xs uppercase tracking-widest text-[rgb(var(--accent))]">
          سورة
        </p>
        <h1 className="font-display text-4xl font-black md:text-5xl">{sura.name}</h1>
        <div className="mt-2 flex items-center justify-center gap-3 text-sm text-[rgb(var(--fg-muted))]">
          <span>{sura.is_makki ? "مكية" : "مدنية"}</span>
          <span aria-hidden>•</span>
          <span>{toArabicNumerals(sura.verses.length)} آية «مَنْ/ومَنْ»</span>
        </div>
        <div
          aria-hidden
          className="ornament-thick absolute inset-x-10 bottom-3"
        />
      </header>

      <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {sura.verses.map((v, i) => (
          <li
            key={v.id}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <VerseCard verse={v} preview={v.tafsir.mokhtasr} />
          </li>
        ))}
      </ul>

      <nav className="mt-8 flex items-center justify-between gap-2">
        {prevSura ? (
          <Link
            href={`/sura/${prevSura.number}`}
            className="group inline-flex flex-1 items-center gap-2 rounded-xl border border-[rgb(var(--border))] p-3 transition hover:border-[rgb(var(--accent))]"
          >
            <ArrowRight className="h-4 w-4 transition group-hover:-translate-x-1" />
            <div className="min-w-0 text-right">
              <div className="text-xs text-[rgb(var(--fg-muted))]">السورة السابقة</div>
              <div className="truncate font-medium">{prevSura.name}</div>
            </div>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {nextSura ? (
          <Link
            href={`/sura/${nextSura.number}`}
            className="group inline-flex flex-1 items-center justify-end gap-2 rounded-xl border border-[rgb(var(--border))] p-3 transition hover:border-[rgb(var(--accent))]"
          >
            <div className="min-w-0 text-left">
              <div className="text-xs text-[rgb(var(--fg-muted))]">السورة التالية</div>
              <div className="truncate font-medium">{nextSura.name}</div>
            </div>
            <ArrowLeft className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </div>
  );
}
