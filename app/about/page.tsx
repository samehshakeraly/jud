import { META } from "@/lib/data";

export const metadata = { title: "حول التطبيق" };

export default function AboutPage() {
  const sources = [
    {
      label: "نص القرآن",
      detail: META.sources.verse_text,
    },
    {
      label: "التفسير المختصر",
      detail: "مركز تفسير للدراسات القرآنية",
      url: "https://mokhtasr.com",
    },
    {
      label: "التفسير الميسر",
      detail: "مجمع الملك فهد لطباعة المصحف الشريف",
    },
    {
      label: "الهدايات",
      detail: "موسوعة الهدايات القرآنية — مركز مكة العالمي للهدى القرآني",
      url: "https://hidayaaencyc.net",
    },
    {
      label: "معاني الكلمات",
      detail: "السراج في بيان غريب القرآن",
    },
  ];

  return (
    <div className="animate-fade-up max-w-3xl">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-black">حول التطبيق</h1>
        <p className="mt-2 leading-relaxed text-[rgb(var(--fg-muted))]">
          هذا التطبيق يجمع ٧٨ آية من القرآن الكريم تبدأ بـ«مَنْ» أو «ومَنْ»،
          مع تفسيرين وهداياتٍ من مصادر موثوقة. الهدف: تيسير القراءة والتدبّر
          والتأمّل في هذه الصيغ القرآنية.
        </p>
      </header>

      <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
        <h2 className="mb-4 font-display text-xl font-bold">المصادر</h2>
        <ul className="space-y-4">
          {sources.map((s) => (
            <li key={s.label}>
              <div className="font-bold">{s.label}</div>
              <div className="mt-0.5 text-sm text-[rgb(var(--fg-muted))]">
                {s.detail}
                {s.url && (
                  <>
                    {" "}—{" "}
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[rgb(var(--accent))] hover:underline"
                    >
                      {s.url.replace(/^https?:\/\//, "")}
                    </a>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
        <h2 className="mb-3 font-display text-xl font-bold">ملاحظات</h2>
        <ul className="list-disc space-y-2 pr-6 text-sm leading-relaxed">
          <li>التشكيل الكامل محفوظ في نصوص الآيات (الرسم العثماني لرواية حفص).</li>
          <li>
            عند توافر التفسيرين، يُختار الأقصر افتراضياً مع تبويب للتنقّل بينهما.
          </li>
          <li>
            معاني الكلمات تظهر إن وُجدت فقط، ولا يُعرض القسم خالياً.
          </li>
          <li>
            الواجهة عربية بالكامل (RTL) وتدعم الوضع الليلي ومقاسات خطوط متعدّدة.
          </li>
          <li>
            تنقّل بالأسهم ← → في صفحة الآية، و«+» لتغيير حجم الخط.
          </li>
        </ul>
      </section>

      <p className="mt-6 text-center text-xs text-[rgb(var(--fg-muted))]">
        نسخة المخطط: {META.schema_version}
      </p>
    </div>
  );
}
