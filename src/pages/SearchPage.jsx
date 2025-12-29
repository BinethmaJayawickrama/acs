import { useMemo, useState } from "react";
import propertiesData from "../data/properties.json";

import { filterProperties } from "../utils/filterProperties";
import { loadFavourites, saveFavourites } from "../utils/favouritesStorage";

import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList";
import FavouritesPanel from "../components/FavouritesPanel";

export default function SearchPage() {
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
      {/* FILTER SECTION (Centered) */}
      <section className="filterSection">
        {/* IMPORTANT: DO NOT wrap SearchForm inside another filterCard */}
        <SearchForm criteria={criteria} onChange={setCriteria} />
      </section>

      {/* RESULTS + FAVOURITES SIDE BY SIDE */}
      <section className="resultsSection">
        <div className="resultsGridLayout">
          {/* LEFT: property cards */}
          <div className="resultsCol">
            <h2 className="resultsHeading">Properties({results.length})</h2>

            <ResultsList
              properties={results}
              favIds={favIds}
              onAddFavourite={addFavourite}
            />
          </div>

          {/* RIGHT: favourites panel */}
          <aside className="favsCol" id="favourites">
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
