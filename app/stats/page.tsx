import { STATS, SURAS, VERSES } from "@/lib/data";
import { toArabicNumerals } from "@/lib/format";

export const metadata = { title: "إحصاءات ولطائف" };

export default function StatsPage() {
  const max = Math.max(...SURAS.map((s) => s.verses.length));
  const topSuras = [...SURAS]
    .sort((a, b) => b.verses.length - a.verses.length)
    .slice(0, 10);

  const manPct = (STATS.man / STATS.totalVerses) * 100;
  const wamanPct = (STATS.waman / STATS.totalVerses) * 100;
  const makkiPct = (STATS.makki / STATS.totalVerses) * 100;
  const madaniPct = 100 - makkiPct;

  const totalHidayat = VERSES.reduce(
    (s, v) => s + (v.hidayat.items?.length || 0),
    0,
  );

  return (
    <div className="animate-fade-up space-y-8">
      <header>
        <h1 className="font-display text-3xl font-black">إحصاءات ولطائف</h1>
        <p className="mt-1 text-sm text-[rgb(var(--fg-muted))]">
          أرقام موجزة عن آيات «مَنْ» و«ومَنْ» في القرآن الكريم.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card label="مجموع الآيات" value={STATS.totalVerses} />
        <Card label="عدد السور" value={STATS.totalSuras} />
        <Card label="مجموع الهدايات" value={totalHidayat} accent />
        <Card
          label="متوسط الهدايات لكل آية"
          value={STATS.avgHidayat.toFixed(1)}
          accent
          isText
        />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel title="نوع البداية">
          <Bar
            label="«مَنْ»"
            count={STATS.man}
            pct={manPct}
            colorClass="bg-[rgb(var(--olive))]"
          />
          <Bar
            label="«ومَنْ»"
            count={STATS.waman}
            pct={wamanPct}
            colorClass="bg-[rgb(var(--accent))]"
          />
        </Panel>
        <Panel title="مكي / مدني">
          <Bar label="مكية" count={STATS.makki} pct={makkiPct} colorClass="bg-[rgb(var(--olive))]" />
          <Bar
            label="مدنية"
            count={STATS.madani}
            pct={madaniPct}
            colorClass="bg-[rgb(var(--accent))]"
          />
        </Panel>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl font-bold">أكثر السور وروداً</h2>
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4 md:p-6">
          <ol className="space-y-3">
            {topSuras.map((s, i) => (
              <li key={s.number} className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[rgb(var(--accent-soft))] text-xs font-bold text-[rgb(var(--accent))]">
                  {toArabicNumerals(i + 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <span className="truncate font-display font-bold">{s.name}</span>
                    <span className="text-xs text-[rgb(var(--fg-muted))]">
                      {toArabicNumerals(s.verses.length)} آية
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[rgb(var(--surface))]">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-[rgb(var(--accent))] to-[rgb(var(--olive))]"
                      style={{ width: `${(s.verses.length / max) * 100}%` }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--accent-soft))] p-4 md:p-6">
        <h2 className="font-display text-lg font-bold text-[rgb(var(--accent))]">
          لطيفة ختاميّة
        </h2>
        <p className="mt-2 leading-relaxed">
          ﴿ مَنْ يَعْمَلْ سُوءًا يُجْزَ بِهِ ﴾ — ورد لفظ «مَنْ» الشرطيُّ في القرآن مرتبطًا
          بأركان الإيمان والعمل والابتلاء؛ ومنه ما عُطف بالواو لِيُضمَّ إلى ما قبله،
          فجاءت «ومَنْ» أكثر وروداً ({toArabicNumerals(STATS.waman)} مرة) من «مَنْ»
          ({toArabicNumerals(STATS.man)} مرة).
        </p>
      </section>
    </div>
  );
}

function Card({
  label,
  value,
  accent,
  isText,
}: {
  label: string;
  value: number | string;
  accent?: boolean;
  isText?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4 text-center">
      <div
        className={`font-display text-3xl font-black ${
          accent ? "text-[rgb(var(--accent))]" : ""
        }`}
      >
        {isText ? value : toArabicNumerals(value as number)}
      </div>
      <div className="mt-1 text-xs text-[rgb(var(--fg-muted))]">{label}</div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4 md:p-6">
      <h2 className="mb-3 font-display text-lg font-bold">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Bar({
  label,
  count,
  pct,
  colorClass,
}: {
  label: string;
  count: number;
  pct: number;
  colorClass: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-[rgb(var(--fg-muted))]">
          {toArabicNumerals(count)} ({pct.toFixed(0)}%)
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[rgb(var(--surface))]">
        <div
          className={`h-full rounded-full ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
