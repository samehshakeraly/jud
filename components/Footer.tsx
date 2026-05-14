import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] py-8 text-center text-sm text-[rgb(var(--fg-muted))]">
      <div className="mx-auto max-w-5xl px-4">
        <div className="ornament-thick mx-auto mb-4 w-40" />
        <p className="font-display">
          ﴿ وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا ﴾
        </p>
        <p className="mt-2">
          <Link href="/about" className="hover:text-[rgb(var(--accent))]">
            مصادر النصوص والتفاسير
          </Link>
        </p>
      </div>
    </footer>
  );
}
