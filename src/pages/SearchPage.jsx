import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import propertiesData from "../data/properties.json";

import { filterProperties } from "../utils/filterProperties";
import { loadFavourites, saveFavourites } from "../utils/favouritesStorage";

import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList";
import FavouritesPanel from "../components/FavouritesPanel";

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const [criteria, setCriteria] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    dateFrom: "",
    dateTo: "",
    postcodeArea: "",
  });

  // ✅ auto-fill from URL: /search?location=xxxx
  useEffect(() => {
    const location = (searchParams.get("location") || "").trim();
    if (location) {
      setCriteria((prev) => ({ ...prev, postcodeArea: location }));
    }
  }, [searchParams]);

  const [favIds, setFavIds] = useState(loadFavourites());

  const results = useMemo(
    () => filterProperties(propertiesData, criteria),
    [criteria]
  );

  function addFavourite(id) {
    setFavIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveFavourites(next);
      return next;
    });
  }

  function removeFavourite(id) {
    setFavIds((prev) => {
      const next = prev.filter((x) => x !== id);
      saveFavourites(next);
      return next;
    });
  }

  function clearFavourites() {
    saveFavourites([]);
    setFavIds([]);
  }

  return (
    <div className="searchPage">
      <section className="filterSection">
        <div className="filterCard">
          <SearchForm criteria={criteria} onChange={setCriteria} />
        </div>
      </section>

      <section className="resultsSection">
        <div className="resultsGridLayout">
          <div className="resultsCol">
            <h2 className="resultsHeading">Properties ({results.length})</h2>

            <ResultsList
              properties={results}
              favIds={favIds}
              onAddFavourite={addFavourite}
            />
          </div>

          <aside className="favsCol">
            <FavouritesPanel
              properties={propertiesData}
              favIds={favIds}
              onRemoveFavourite={removeFavourite}
              onClear={clearFavourites}
              onDropFavourite={addFavourite}
            />
          </aside>
        </div>
      </section>
    </div>
  );
}
