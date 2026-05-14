"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/cn";

export function FavoriteButton({
  id,
  className,
  showLabel = false,
}: {
  id: string;
  className?: string;
  showLabel?: boolean;
}) {
  const { has, toggle } = useFavorites();
  const active = has(id);
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={active}
      aria-label={active ? "إزالة من المفضّلة" : "إضافة إلى المفضّلة"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition",
        active
          ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent-soft))] text-[rgb(var(--accent))]"
          : "border-[rgb(var(--border))] text-[rgb(var(--fg-muted))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", active && "fill-current")} />
      {showLabel && <span>{active ? "في المفضّلة" : "أضف للمفضّلة"}</span>}
    </button>
  );
}
