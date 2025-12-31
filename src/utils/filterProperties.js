// src/utils/filterProperties.js

export function filterProperties(properties, criteria) {
  const c = criteria || {};

  const q = (c.postcodeArea || "").trim().toLowerCase();

  return (properties || []).filter((p) => {
    // --- Type ---
    if (c.type && c.type !== "any") {
      const pt = String(p.type || "").toLowerCase();
      if (pt !== String(c.type).toLowerCase()) return false;
    }

    // --- Postcode / City search (works for postcodeArea or city fields if you have them) ---
    if (q) {
      const hay = [
        p.postcodeArea,
        p.postcode,
        p.city,
        p.town,
        p.location,
        p.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!hay.includes(q)) return false;
    }

    // --- Price ---
    const price = Number(p.price);
    if (c.minPrice !== "" && !Number.isNaN(price)) {
      if (price < Number(c.minPrice)) return false;
    }
    if (c.maxPrice !== "" && !Number.isNaN(price)) {
      if (price > Number(c.maxPrice)) return false;
    }

    // --- Bedrooms ---
    const beds = Number(p.bedrooms);
    if (c.minBeds !== "" && !Number.isNaN(beds)) {
      if (beds < Number(c.minBeds)) return false;
    }
    if (c.maxBeds !== "" && !Number.isNaN(beds)) {
      if (beds > Number(c.maxBeds)) return false;
    }

    // --- Date (optional: only works if your JSON has a date field) ---
    // Supports: dateAdded OR added OR date
    const rawDate = p.dateAdded || p.added || p.date || "";
    const propDate = rawDate ? new Date(rawDate) : null;

    if (c.dateFrom && propDate instanceof Date && !isNaN(propDate)) {
      const from = new Date(c.dateFrom);
      if (propDate < from) return false;
    }
    if (c.dateTo && propDate instanceof Date && !isNaN(propDate)) {
      const to = new Date(c.dateTo);
      // include the whole "dateTo" day
      to.setHours(23, 59, 59, 999);
      if (propDate > to) return false;
    }

    return true;
  });
}
