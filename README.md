# مَنْ ومَنْ في القرآن الكريم

تطبيق ويب يجمع ٧٨ آية من القرآن الكريم تبدأ بـ«مَنْ» و«ومَنْ» في ٣٨ سورة، مع التفسير المختصر والميسر، والهدايات القرآنية.

## التقنيات

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **next-themes** (وضع ليلي)
- **Fuse.js** (بحث ضبابي)
- **lucide-react** للأيقونات
- **html-to-image** لمشاركة الآية كصورة
- خطوط Google: **Amiri Quran**، **Amiri**، **Tajawal**

## التشغيل

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## بنية المشروع

```
app/
  layout.tsx            RTL + خطوط + ThemeProvider
  page.tsx              الصفحة الرئيسية (السور)
  sura/[number]/        صفحة السورة
  verse/[id]/           صفحة الآية الكاملة
  search/               البحث والتصفية
  stats/                الإحصاءات واللطائف
  favorites/            المفضّلة (LocalStorage)
  about/                مصادر النصوص
components/             مكونات قابلة لإعادة الاستخدام
lib/                    types · data · search · favorites · format · cn
verses.json             مصدر البيانات
public/
  verses.json           نسخة عامة
  manifest.json         إعدادات PWA
  icon.svg              أيقونة التطبيق
```

## الميزات

- ✓ واجهة RTL عربية كاملة
- ✓ خطوط متخصصة للرسم العثماني
- ✓ وضع نهاري/ليلي/تلقائي
- ✓ بحث في الآيات والتفاسير والهدايات
- ✓ تصفية: السورة، نوع البداية، مكي/مدني
- ✓ تبديل تلقائي للتفسير الأقصر
- ✓ معاني الكلمات تُخفى عند الخلو
- ✓ إخفاء أنيق لـ `man_type` و `reflection_question` فارغين
- ✓ مفضّلة محلية (LocalStorage)
- ✓ 4 مقاسات خط للآية
- ✓ نسخ + مشاركة + تصدير صورة PNG
- ✓ تنقّل بالأسهم وزيادة الخط بـ «+»
- ✓ إحصاءات بصرية ولطائف
- ✓ صفحات ثابتة لكل سورة وآية (SSG)
- ✓ مهيّأ للنشر على Vercel أو Netlify

## النشر

```bash
# Vercel
vercel deploy

# أو أي مضيف يدعم Next.js
npm run build && npm start
```

## المصادر

- نص القرآن: رواية حفص عن عاصم (الرسم العثماني)
- التفسير المختصر: [mokhtasr.com](https://mokhtasr.com)
- التفسير الميسر: مجمع الملك فهد لطباعة المصحف الشريف
- الهدايات: [hidayaaencyc.net](https://hidayaaencyc.net)
- معاني الكلمات: السراج في بيان غريب القرآن
