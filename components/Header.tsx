"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BookOpen, BarChart3, Heart, Info } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/", label: "السور", icon: BookOpen },
  { href: "/search", label: "بحث", icon: Search },
  { href: "/stats", label: "إحصاءات", icon: BarChart3 },
  { href: "/favorites", label: "المفضّلة", icon: Heart },
  { href: "/about", label: "حول", icon: Info },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/85 backdrop-blur supports-[backdrop-filter]:bg-[rgb(var(--bg))]/70">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <Logo />
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight md:text-lg">
              مَنْ <span className="text-[rgb(var(--accent))]">و</span>مَنْ
            </div>
            <div className="text-[10px] text-[rgb(var(--fg-muted))] md:text-xs">
              في القرآن الكريم
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-0.5 md:gap-1">
          {nav.map((n) => {
            const Active =
              n.href === "/"
                ? pathname === "/" || pathname.startsWith("/sura")
                : pathname.startsWith(n.href);
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={Active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm transition",
                  Active
                    ? "bg-[rgb(var(--accent-soft))] text-[rgb(var(--accent))]"
                    : "text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg))]",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{n.label}</span>
              </Link>
            );
          })}
          <ThemeToggle className="mr-1 hidden sm:inline-flex" />
        </nav>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[rgb(var(--accent))] to-[rgb(var(--olive))] text-white shadow-soft"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 19V6a2 2 0 0 1 2-2h11l3 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M9 9c1.6 0 3 1.4 3 3s-1.4 3-3 3" />
      </svg>
    </span>
  );
}
