import { filterProperties } from "./filterProperties";

const props = [
  {
    id: "1",
    type: "house",
    price: 4500000,
    bedrooms: 4,
    postcodeArea: "Colombo",
    availableFrom: "2026-01-01",
  },
  {
    id: "2",
    type: "flat",
    price: 3200000,
    bedrooms: 2,
    postcodeArea: "Kandy",
    availableFrom: "2026-02-15",
  },
  {
    id: "3",
    type: "house",
    price: 6000000,
    bedrooms: 5,
    postcodeArea: "Negombo",
    availableFrom: "2026-01-20",
  },
];

describe("filterProperties", () => {
  test("returns all when criteria is empty/any", () => {
    const out = filterProperties(props, {
      type: "any",
      minPrice: "",
      maxPrice: "",
      minBeds: "",
      maxBeds: "",
      dateFrom: "",
      dateTo: "",
      postcodeArea: "",
    });
    expect(out).toHaveLength(3);
  });

  test("filters by type", () => {
    const out = filterProperties(props, { type: "flat" });
    expect(out.map((p) => p.id)).toEqual(["2"]);
  });

  test("filters by minPrice/maxPrice", () => {
    const out = filterProperties(props, { minPrice: "4000000", maxPrice: "5000000" });
    expect(out.map((p) => p.id)).toEqual(["1"]);
  });

  test("filters by minBeds/maxBeds", () => {
    const out = filterProperties(props, { minBeds: "4", maxBeds: "5" });
    expect(out.map((p) => p.id).sort()).toEqual(["1", "3"]);
  });

  test("filters by postcodeArea (case-insensitive contains)", () => {
    const out = filterProperties(props, { postcodeArea: "col" });
    expect(out.map((p) => p.id)).toEqual(["1"]);
  });

  test("filters by date range (dateFrom/dateTo)", () => {
    const out = filterProperties(props, { dateFrom: "2026-01-10", dateTo: "2026-01-31" });
    expect(out.map((p) => p.id)).toEqual(["3"]);
  });
});
