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

  useEffect(() => {
    const location = (searchParams.get("location") || "").trim();
    if (location) {
      setCriteria((prev) => ({ ...prev, postcodeArea: location }));
    }
  }, [searchParams]);

  const [favIds, setFavIds] = useState(() => {
    const raw = loadFavourites();
    return raw.map((id) => {
      const n = Number(id);
      return Number.isNaN(n) ? id : n;
    });
  });

  const results = useMemo(
    () => filterProperties(propertiesData, criteria),
    [criteria]
  );

  function addFavourite(id) {
    const norm = (() => {
      const n = Number(id);
      return Number.isNaN(n) ? id : n;
    })();

    setFavIds((prev) => {
      if (prev.includes(norm)) return prev;
      const next = [...prev, norm];
      saveFavourites(next.map(String));
      return next;
    });
  }

  function removeFavourite(id) {
    const norm = (() => {
      const n = Number(id);
      return Number.isNaN(n) ? id : n;
    })();

    setFavIds((prev) => {
      const next = prev.filter((x) => x !== norm);
      saveFavourites(next.map(String));
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
          {/* ✅ titles in the SAME grid row */}
          <h2 className="resultsHeading resultsHeading--props">
            Properties ({results.length})
          </h2>

          <h2 className="resultsHeading resultsHeading--favs">
            Favourites ({favIds.length})
          </h2>

          {/* LEFT */}
          <div className="resultsCol">
            <ResultsList
              properties={results}
              favIds={favIds}
              onAddFavourite={addFavourite}
            />
          </div>

          {/* RIGHT */}
          <aside className="favsCol">
            <FavouritesPanel
              properties={propertiesData}
              favIds={favIds}
              onRemoveFavourite={removeFavourite}
              onClear={clearFavourites}
              onDropFavourite={addFavourite}
              showTitle={false}   // ✅ hide duplicate title inside panel
            />
          </aside>
        </div>
      </section>
    </div>
  );
}
