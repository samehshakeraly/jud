import type { Metadata, Viewport } from "next";
import { Amiri, Amiri_Quran, Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-amiri",
  display: "swap",
});

const amiriQuran = Amiri_Quran({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-amiri-quran",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "مَنْ ومَنْ في القرآن الكريم",
    template: "%s · مَنْ ومَنْ في القرآن",
  },
  description:
    "تطبيق يجمع آيات القرآن الكريم المبدوءة بـ«مَنْ» و«ومَنْ»، مع التفسير والهدايات.",
  keywords: ["القرآن", "مَنْ", "تفسير", "هدايات", "آيات"],
  openGraph: {
    title: "مَنْ ومَنْ في القرآن الكريم",
    description:
      "٧٨ آية في ٣٨ سورة، مع التفسير والهدايات، واجهة عربية أصيلة.",
    locale: "ar_SA",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFBF7" },
    { media: "(prefers-color-scheme: dark)", color: "#11100F" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${tajawal.variable} ${amiri.variable} ${amiriQuran.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only fixed top-2 right-2 z-50 rounded-md bg-[rgb(var(--accent))] px-3 py-1 text-white"
          >
            تخطّى إلى المحتوى
          </a>
          <Header />
          <main id="main" className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 md:px-6">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
