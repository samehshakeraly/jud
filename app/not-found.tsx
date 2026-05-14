import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-items-center py-20 text-center">
      <div className="font-display text-5xl font-black text-[rgb(var(--accent))]">٤٠٤</div>
      <p className="mt-2 font-display text-lg">الصفحة غير موجودة</p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
