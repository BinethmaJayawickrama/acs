const KEY = "rentready_favourites";

export function loadFavourites() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    // ✅ remove non-strings, trim, remove empties, dedupe
    return [...new Set(raw.map(String).map(s => s.trim()).filter(Boolean))];
  } catch {
    return [];
  }
}

export function saveFavourites(ids) {
  const cleaned = [...new Set((ids || []).map(String).map(s => s.trim()).filter(Boolean))];
  localStorage.setItem(KEY, JSON.stringify(cleaned));
}
