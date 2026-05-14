"use client";

import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/cn";
import { useReadingPrefs } from "@/lib/favorites";

export function TafsirTabs({
  mokhtasr,
  moyassar,
}: {
  mokhtasr: string;
  moyassar: string;
}) {
  const { prefs, setPrefs } = useReadingPrefs();
  const auto = useMemo<"mokhtasr" | "moyassar">(
    () => (mokhtasr.length <= moyassar.length ? "mokhtasr" : "moyassar"),
    [mokhtasr, moyassar],
  );

  const initial =
    prefs.tafsir === "auto" ? auto : (prefs.tafsir as "mokhtasr" | "moyassar");
  const [tab, setTab] = useState<"mokhtasr" | "moyassar">(initial);

  useEffect(() => {
    setTab(prefs.tafsir === "auto" ? auto : (prefs.tafsir as "mokhtasr" | "moyassar"));
  }, [prefs.tafsir, auto]);

  return (
    <section className="mt-6 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4 md:p-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-display text-lg font-bold">التفسير</h2>
        <div className="inline-flex rounded-full bg-[rgb(var(--surface))] p-0.5 text-xs">
          {(["mokhtasr", "moyassar"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setTab(k);
                setPrefs({ tafsir: k });
              }}
              className={cn(
                "rounded-full px-3 py-1 transition",
                tab === k
                  ? "bg-[rgb(var(--bg-elev))] text-[rgb(var(--accent))] shadow-soft"
                  : "text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg))]",
              )}
            >
              {k === "mokhtasr" ? "المختصر" : "الميسر"}
            </button>
          ))}
        </div>
      </div>
      <p
        key={tab}
        className="animate-fade-up text-[15px] leading-relaxed text-[rgb(var(--fg))] md:text-base"
      >
        {tab === "mokhtasr" ? mokhtasr : moyassar}
      </p>
    </section>
  );
}
