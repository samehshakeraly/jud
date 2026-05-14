import { SearchClient } from "@/components/SearchClient";
import { VERSES, SURAS } from "@/lib/data";

export const metadata = { title: "البحث" };

export default function SearchPage() {
  return (
    <div className="animate-fade-up">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-black">البحث والتصفية</h1>
        <p className="mt-1 text-sm text-[rgb(var(--fg-muted))]">
          ابحث في نصوص الآيات والتفاسير والهدايات، أو صفّ النتائج حسب السورة ونوع البداية والمكان.
        </p>
      </header>
      <SearchClient
        verses={VERSES}
        suras={SURAS.map((s) => ({ number: s.number, name: s.name }))}
      />
    </div>
  );
}
