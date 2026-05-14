"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const next = () => {
    const order: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const cur = (theme as "light" | "dark" | "system") || "system";
    setTheme(order[(order.indexOf(cur) + 1) % order.length]);
  };

  const Icon =
    !mounted ? Sun : theme === "system" ? MonitorSmartphone : resolvedTheme === "dark" ? Moon : Sun;

  const label =
    !mounted ? "تبديل المظهر"
    : theme === "system" ? "تلقائي"
    : resolvedTheme === "dark" ? "ليلي"
    : "نهاري";

  return (
    <button
      type="button"
      onClick={next}
      aria-label={`المظهر الحالي: ${label}. اضغط للتبديل.`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] px-3 py-1.5 text-sm transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]",
        className,
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
