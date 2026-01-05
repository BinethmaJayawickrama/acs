import { loadFavourites, saveFavourites } from "./favouritesStorage";

describe("favouritesStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("loadFavourites returns [] for missing key", () => {
    expect(loadFavourites()).toEqual([]);
  });

  test("loadFavourites handles invalid JSON safely", () => {
    localStorage.setItem("rentready_favourites", "{not-json");
    expect(loadFavourites()).toEqual([]);
  });

  test("saveFavourites cleans + dedupes values", () => {
    saveFavourites([" 1 ", 1, "2", "", "  ", "2"]);
    const raw = JSON.parse(localStorage.getItem("rentready_favourites"));
    expect(raw).toEqual(["1", "2"]);
  });

  test("loadFavourites dedupes + trims", () => {
    localStorage.setItem("rentready_favourites", JSON.stringify([" 5 ", "5", "6", "", "  "]));
    expect(loadFavourites()).toEqual(["5", "6"]);
  });
});
