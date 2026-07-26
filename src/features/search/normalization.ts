const synonymGroups: readonly (readonly string[])[] = [
  ["braj", "brij", "ब्रज"],
  ["govardhan", "goverdhan", "गोवर्धन"],
  ["banke bihari", "bihari ji", "बांके बिहारी", "बिहारी जी"],
  [
    "krishna janmasthan",
    "krishna janmabhoomi",
    "कृष्ण जन्मस्थान",
    "कृष्ण जन्मभूमि",
  ],
  ["vrindavan", " वृंदावन", "वृन्दावन"],
  ["mathura", "मथुरा"],
  ["barsana", "बरसाना"],
  ["nandgaon", "नंदगांव", "नन्दगाँव"],
  ["temple", "mandir", "मंदिर"],
  ["pilgrimage", "yatra", "यात्रा"],
] as const;
export function normalizeSearchText(value: string): string {
  return value
    .toLocaleLowerCase()
    .normalize("NFKC")
    .replace(/[–—]/g, "-")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
export function expandSearchTerms(query: string): readonly string[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [];
  const terms = new Set(normalized.split(" "));
  terms.add(normalized);
  for (const group of synonymGroups) {
    const normalizedGroup = group.map(normalizeSearchText);
    if (normalizedGroup.some((entry) => normalized.includes(entry)))
      normalizedGroup.forEach((entry) => {
        terms.add(entry);
        entry.split(" ").forEach((part) => terms.add(part));
      });
  }
  return [...terms].filter(Boolean);
}
export function editDistance(left: string, right: string): number {
  const previous = Array.from(
    { length: right.length + 1 },
    (_, index) => index,
  );
  for (let i = 1; i <= left.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= right.length; j += 1)
      current[j] = Math.min(
        (current[j - 1] ?? 0) + 1,
        (previous[j] ?? 0) + 1,
        (previous[j - 1] ?? 0) + (left[i - 1] === right[j - 1] ? 0 : 1),
      );
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length] ?? left.length;
}
