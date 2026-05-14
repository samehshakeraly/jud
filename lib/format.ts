const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicNumerals(n: number | string): string {
  return String(n).replace(/\d/g, (d) => AR_DIGITS[+d]);
}

export function pluralAr(n: number, singular: string, plural: string, dual?: string) {
  if (n === 1) return singular;
  if (n === 2 && dual) return dual;
  if (n >= 3 && n <= 10) return plural;
  return singular;
}

// Strip tashkeel for previews
export function stripDiacritics(s: string) {
  return s.replace(/[ؐ-ًؚ-ٰٟۖ-ۭ]/g, "");
}

// Truncate Arabic preserving word boundaries
export function truncateWords(s: string, max = 90) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const last = cut.lastIndexOf(" ");
  return (last > 30 ? cut.slice(0, last) : cut) + "…";
}
