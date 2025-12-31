import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./sitebar.css";

import propertiesData from "../data/properties.json";
import { loadFavourites } from "../utils/favouritesStorage";

function HeartOutlineIcon() {
  return (
    <svg
      className="sitebar__favSvg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NavBar() {
  const [openFav, setOpenFav] = useState(false);
  const [favIds, setFavIds] = useState(() => loadFavourites());

  const favProps = useMemo(() => {
    const ids = new Set(favIds);
    return propertiesData.filter((p) => ids.has(p.id));
  }, [favIds]);

  function handleFavEnter() {
    setFavIds(loadFavourites()); // refresh on hover
    setOpenFav(true);
  }

  function handleFavLeave() {
    setOpenFav(false);
  }

  return (
    <header className="sitebar">
      <div className="sitebar__inner">
        {/* LEFT */}
        <Link to="/" className="sitebar__brand" aria-label="Go to Home">
          <span className="sitebar__brandTitle">RentReady</span>
        </Link>

        {/* MIDDLE */}
        <div className="sitebar__search">
          <span className="sitebar__searchIcon">🔍</span>
          <input
            className="sitebar__input"
            placeholder="Postcode area (e.g., BR1)"
          />
          <button className="sitebar__btn" type="button">
            Search
          </button>
        </div>

        {/* RIGHT */}
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
                          <Link
                            to="/search#favourites"
                            className="sitebar__favItemLink"
                          >
                            <img
                              className="sitebar__favThumb"
                              src={img}
                              alt=""
                            />
                            <div className="sitebar__favInfo">
                              <div className="sitebar__favPrice">{price}</div>
                              <div className="sitebar__favMeta">
                                {(p.type || "property").toLowerCase()} •{" "}
                                {p.bedrooms ?? "?"} beds •{" "}
                                {p.postcodeArea || p.postcode || "N/A"}
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="sitebar__favHint">
                  Click an item to jump to the favourites panel
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
