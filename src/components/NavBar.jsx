import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sitebar.css";

import propertiesData from "../data/properties.json";
import { loadFavourites } from "../utils/favouritesStorage";

function HeartOutlineIcon() {
  return (
    <svg
      className="sitebar__favSvg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function NavBar() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState(""); // ✅ NEW
  const [openFav, setOpenFav] = useState(false);
  const [favIds, setFavIds] = useState(() => loadFavourites());

  const favProps = useMemo(() => {
    const ids = new Set(favIds);
    return propertiesData.filter((p) => ids.has(p.id));
  }, [favIds]);

  function doSearch() {
    const q = searchText.trim();
    if (!q) return;
    navigate(`/search?location=${encodeURIComponent(q)}`);
  }

  function handleFavEnter() {
    setFavIds(loadFavourites());
    setOpenFav(true);
  }

  function handleFavLeave() {
    setOpenFav(false);
  }

  return (
    <header className="sitebar">
      <div className="sitebar__inner">
        <Link to="/" className="sitebar__brand" aria-label="Go to Home">
          <span className="sitebar__brandTitle">RentReady</span>
        </Link>

        {/* ✅ Make search submit work */}
        <form
          className="sitebar__search"
          onSubmit={(e) => {
            e.preventDefault();
            doSearch();
          }}
        >
          <span className="sitebar__searchIcon">🔍</span>
          <input
            className="sitebar__input"
            placeholder="City (e.g., Colombo)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="sitebar__btn" type="submit">
            Search
          </button>
        </form>

        <div className="sitebar__actions">
          <Link className="sitebar__navLink" to="/contact">
            Contact Us
          </Link>

          <div
            className="sitebar__favWrap"
            onMouseEnter={handleFavEnter}
            onMouseLeave={handleFavLeave}
          >
            <Link
              to="/search#favourites"
              className="sitebar__favIcon"
              aria-label="Favourites"
              title="Favourites"
            >
              <HeartOutlineIcon />
              <span className="sitebar__favCount">{favProps.length}</span>
            </Link>

            {openFav && (
              <div className="sitebar__favDropdown" role="menu">
                <div className="sitebar__favDropTitle">
                  Favourites ({favProps.length})
                </div>

                {favProps.length === 0 ? (
                  <div className="sitebar__favEmpty">No favourites yet.</div>
                ) : (
                  <ul className="sitebar__favList">
                    {favProps.map((p) => {
                      const img =
                        (Array.isArray(p.images) && p.images[0]) ||
                        p.image ||
                        "/images/placeholder.jpg";

                      const price =
                        typeof p.price === "number"
                          ? p.price.toLocaleString("en-GB", {
                              style: "currency",
                              currency: "GBP",
                            })
                          : p.price || "Price N/A";

                      return (
                        <li key={p.id} className="sitebar__favItem">
                          <Link to="/search#favourites" className="sitebar__favItemLink">
                            <img className="sitebar__favThumb" src={img} alt="" />
                            <div className="sitebar__favInfo">
                              <div className="sitebar__favPrice">{price}</div>
                              <div className="sitebar__favMeta">
                                {(p.type || "property").toLowerCase()} • {p.bedrooms ?? "?"} beds •{" "}
                                {p.postcodeArea || p.postcode || p.city || p.location || "N/A"}
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="sitebar__favHint">
                  Click to jump to the favourites panel
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
