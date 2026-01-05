export function filterProperties(properties, criteria = {}) {
  const list = Array.isArray(properties) ? properties : [];

  const toNum = (v) => {
    if (v === "" || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const hasDate = (v) => v && !Number.isNaN(new Date(v).getTime());

  const minPrice = toNum(criteria.minPrice);
  const maxPrice = toNum(criteria.maxPrice);
  const minBeds = toNum(criteria.minBeds);
  const maxBeds = toNum(criteria.maxBeds);

  const dateFrom = hasDate(criteria.dateFrom) ? new Date(criteria.dateFrom) : null;
  const dateTo = hasDate(criteria.dateTo) ? new Date(criteria.dateTo) : null;

  const type = (criteria.type || "any").toLowerCase();
  const postcodeArea = (criteria.postcodeArea || "").trim().toLowerCase();

  return list.filter((p) => {
    if (!p) return false;

    // --- Type ---
    if (type !== "any" && String(p.type || "").toLowerCase() !== type) {
      return false;
    }

    // --- Price ---
    const price = toNum(p.price);
    if (minPrice !== null && (price === null || price < minPrice)) return false;
    if (maxPrice !== null && (price === null || price > maxPrice)) return false;

    // --- Bedrooms ---
    const beds = toNum(p.bedrooms);
    if (minBeds !== null && (beds === null || beds < minBeds)) return false;
    if (maxBeds !== null && (beds === null || beds > maxBeds)) return false;

    // --- Postcode/Area (your JSON uses `postcode`) ---
    if (postcodeArea) {
      const area = String(p.postcode || p.postcodeArea || "").toLowerCase();
      if (!area.includes(postcodeArea)) return false;
    }

    // --- Date filtering (your JSON uses `dateAdded`) ---
    // (also supports older field names if your tests use them)
    const propertyDateRaw = p.dateAdded ?? p.availableFrom ?? p.date ?? p.dateFrom;

    // strict: if filtering by date, property must have a valid date
    if ((dateFrom || dateTo) && !hasDate(propertyDateRaw)) return false;

    if (dateFrom || dateTo) {
      const d = new Date(propertyDateRaw);
      if (dateFrom && d < dateFrom) return false;
      if (dateTo && d > dateTo) return false;
    }

    return true;
  });
}
