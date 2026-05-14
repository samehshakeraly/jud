import { toArabicNumerals } from "@/lib/format";

export function HidayatList({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-6 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4 md:p-6">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-lg font-bold">الهدايات</h2>
        <span className="text-xs text-[rgb(var(--fg-muted))]">
          {toArabicNumerals(items.length)} هداية
        </span>
      </div>
      <ol className="space-y-3">
        {items.map((h, i) => (
          <li
            key={i}
            className="relative rounded-xl bg-[rgb(var(--surface))] p-3.5 pr-12 leading-relaxed"
          >
            <span
              aria-hidden
              className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-[rgb(var(--accent-soft))] text-xs font-bold text-[rgb(var(--accent))]"
            >
              {toArabicNumerals(i + 1)}
            </span>
            {h}
          </li>
        ))}
      </ol>
    </section>
  );
}
