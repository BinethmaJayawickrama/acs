function toNumber(value) {
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  if (s === "") return null;

  // remove currency symbols/commas/letters
  const cleaned = s.replace(/[^0-9.]/g, "");
  if (cleaned === "") return null;

  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function toDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

export function filterProperties(properties, c) {
  const typeWanted = (c.type || "any").toLowerCase().trim();

  const minPrice = toNumber(c.minPrice);
  const maxPrice = toNumber(c.maxPrice);

  const minBeds = toNumber(c.minBeds);
  const maxBeds = toNumber(c.maxBeds);

  const from = toDate(c.dateFrom);
  const to = toDate(c.dateTo);

  const area = (c.postcodeArea || "").trim().toUpperCase();

  return (properties || []).filter((p) => {
    const pType = String(p.type || "").toLowerCase().trim();
    const pPrice = toNumber(p.price);
    const pBeds = toNumber(p.bedrooms);
    const pDate = toDate(p.dateAdded);
    const pPost = String(p.postcode || "").toUpperCase();

    // type
    if (typeWanted !== "any" && pType !== typeWanted) return false;

    // price
    if (minPrice !== null && pPrice !== null && pPrice < minPrice) return false;
    if (maxPrice !== null && pPrice !== null && pPrice > maxPrice) return false;

    // beds
    if (minBeds !== null && pBeds !== null && pBeds < minBeds) return false;
    if (maxBeds !== null && pBeds !== null && pBeds > maxBeds) return false;

    // date
    if (from && pDate && pDate < from) return false;
    if (to && pDate && pDate > to) return false;

    // postcode startsWith
    if (area && !pPost.startsWith(area)) return false;

    return true;
  });
}
