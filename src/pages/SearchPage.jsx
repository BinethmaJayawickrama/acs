import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

  const [favIds, setFavIds] = useState(() => loadFavourites());

  const location = useLocation();

useEffect(() => {
  if (location.state?.quickPostcode) {
    setCriteria((prev) => ({
      ...prev,
      postcodeArea: "location.state.quickPostcode",
    }));
  }
}, [location.state]);


  const results = useMemo(() => {
    return filterProperties(propertiesData, criteria);
  }, [criteria]);

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
    const next = prev.filter((x) => String(x) !== String(id));
    saveFavourites(next);
    return next;
  });
}

  function clearFavourites() {
    const next = [];
    saveFavourites(next);
    setFavIds(next);
  }

  return (
    <div className="page" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      <div className="main">
        <h1>Property Search</h1>

        {/* IMPORTANT: SearchForm must accept criteria + onChange */}
        <SearchForm criteria={criteria} onChange={setCriteria} />

        <h2>Results ({results.length})</h2>

        {/* IMPORTANT: ResultsList must accept these props */}
        <ResultsList properties={results} favIds={favIds} onAddFavourite={addFavourite} />
      </div>

      {/* IMPORTANT: FavouritesPanel must accept these props */}
      <FavouritesPanel
        properties={propertiesData}
        favIds={favIds}
        onRemoveFavourite={removeFavourite}
        onClear={clearFavourites}
        onDropFavourite={addFavourite}  //favourites
      />
    </div>
  );
}
