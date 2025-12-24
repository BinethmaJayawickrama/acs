export function filterProperties(properties, criteria) {
  return properties.filter((p) => {
    if (criteria.type !== "any" && p.type !== criteria.type) return false;

    if (criteria.minPrice && p.price < Number(criteria.minPrice)) return false;
    if (criteria.maxPrice && p.price > Number(criteria.maxPrice)) return false;

    if (criteria.minBeds && p.bedrooms < Number(criteria.minBeds)) return false;
    if (criteria.maxBeds && p.bedrooms > Number(criteria.maxBeds)) return false;

    if (criteria.dateFrom && new Date(p.dateAdded) < new Date(criteria.dateFrom)) return false;
    if (criteria.dateTo && new Date(p.dateAdded) > new Date(criteria.dateTo)) return false;

    if (
      criteria.postcodeArea &&
      !p.postcode.toUpperCase().startsWith(criteria.postcodeArea.toUpperCase())
    ) {
      return false;
    }

    return true;
  });
}
