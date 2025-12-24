const KEY = "favouritePropertyIds";

export function loadFavourites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveFavourites(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}
