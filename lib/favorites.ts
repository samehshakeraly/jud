"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

const KEY = "man-wa-man:favs";

function read(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function write(set: Set<string>) {
  localStorage.setItem(KEY, JSON.stringify([...set]));
  window.dispatchEvent(new Event("favs:change"));
}

const subscribers = new Set<() => void>();
if (typeof window !== "undefined") {
  window.addEventListener("favs:change", () => subscribers.forEach((f) => f()));
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) subscribers.forEach((f) => f());
  });
}

function subscribe(cb: () => void) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

let cachedSnapshot: string[] = [];
let cachedSig = "";
function getSnapshot(): string[] {
  if (typeof window === "undefined") return cachedSnapshot;
  const arr = [...read()];
  const sig = arr.join(",");
  if (sig !== cachedSig) {
    cachedSig = sig;
    cachedSnapshot = arr;
  }
  return cachedSnapshot;
}
const SSR_SNAPSHOT: string[] = [];

export function useFavorites() {
  const ids = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => SSR_SNAPSHOT,
  );
  const set = new Set(ids);
  const toggle = useCallback((id: string) => {
    const cur = read();
    if (cur.has(id)) cur.delete(id);
    else cur.add(id);
    write(cur);
  }, []);
  const has = useCallback((id: string) => set.has(id), [ids]);
  return { ids, has, toggle, count: ids.length };
}

export function useReadingPrefs() {
  const PKEY = "man-wa-man:prefs";
  type Prefs = { size: "sm" | "md" | "lg" | "xl"; tafsir: "auto" | "mokhtasr" | "moyassar" };
  const def: Prefs = { size: "lg", tafsir: "auto" };

  const getPrefs = (): Prefs => {
    if (typeof window === "undefined") return def;
    try {
      return { ...def, ...JSON.parse(localStorage.getItem(PKEY) || "{}") };
    } catch {
      return def;
    }
  };
  const setPrefs = (p: Partial<Prefs>) => {
    const merged = { ...getPrefs(), ...p };
    localStorage.setItem(PKEY, JSON.stringify(merged));
    window.dispatchEvent(new Event("prefs:change"));
  };

  const prefs = useSyncExternalStore(
    (cb) => {
      window.addEventListener("prefs:change", cb);
      return () => window.removeEventListener("prefs:change", cb);
    },
    () => JSON.stringify(getPrefs()),
    () => JSON.stringify(def),
  );

  return { prefs: JSON.parse(prefs) as Prefs, setPrefs };
}

export function useMount() {
  const ids = useSyncExternalStore(
    subscribe,
    () => "x",
    () => "",
  );
  return typeof window !== "undefined" && ids === "x";
}

export function useIsClient() {
  const v = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  return v;
}

// noop to keep eslint happy when imports are unused
useEffect;
