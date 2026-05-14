import { FavoritesClient } from "@/components/FavoritesClient";
import { VERSES } from "@/lib/data";

export const metadata = { title: "المفضّلة" };

export default function FavoritesPage() {
  return (
    <div className="animate-fade-up">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-black">المفضّلة</h1>
        <p className="mt-1 text-sm text-[rgb(var(--fg-muted))]">
          الآيات التي حفظتها محليّاً في متصفّحك.
        </p>
      </header>
      <FavoritesClient verses={VERSES} />
    </div>
  );
}
