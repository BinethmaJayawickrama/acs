import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./sitebar.css";

import propertiesData from "../data/properties.json";
import { loadFavourites } from "../utils/favouritesStorage";

export default function NavBar() {
  const navigate = useNavigate();
  const [postcodeQuick, setPostcodeQuick] = useState("");
  const [openFavs, setOpenFavs] = useState(false);
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    setFavIds(loadFavourites());
  }, []);

  const favProperties = favIds
    .map((id) => propertiesData.find((p) => String(p.id) === String(id)))
    .filter(Boolean);

  function handleQuickSearch(e) {
    e.preventDefault();
    navigate("/search", { state: { quickPostcode: postcodeQuick } });
  }

  return (
    <header className="sitebar">
      <div className="sitebar__inner">
        {/* Left brand */}
        <div className="sitebar__brand">
          <span className="sitebar__brandIcon">🏠</span>
          <h1 className="sitebar__brandTitle">RentReady</h1>
        </div>

        {/* Middle search */}
        <form className="sitebar__search" onSubmit={handleQuickSearch}>
          <span className="sitebar__searchIcon">🔍</span>
          <input
            className="sitebar__input"
            value={postcodeQuick}
            onChange={(e) => setPostcodeQuick(e.target.value)}
            placeholder="Postcode area (e.g., BR1)"
          />
          <button className="sitebar__btn" type="submit">
            Search
          </button>
        </form>

        {/* Right nav + favourites dropdown */}
        <nav className="sitebar__nav">
          <NavLink className="sitebar__navLink" to="/">
            Home
          </NavLink>

          <NavLink className="sitebar__navLink" to="/search">
            Search
          </NavLink>

          <NavLink className="sitebar__navLink" to="/contact">
            Contact Us
          </NavLink>

          <div
            className="sitebar__favWrap"
            onMouseEnter={() => setOpenFavs(true)}
            onMouseLeave={() => setOpenFavs(false)}
          >
            <button className="sitebar__favBtn" type="button" aria-haspopup="true">
              ♥ Favourites ({favProperties.length})
            </button>

            {openFavs && (
              <div className="sitebar__dropdown">
                <div className="sitebar__dropdownTitle">Your favourites</div>

                {favProperties.length === 0 ? (
                  <div className="sitebar__dropdownEmpty">No favourites yet.</div>
                ) : (
                  <ul className="sitebar__dropdownList">
                    {favProperties.slice(0, 5).map((p) => (
                      <li key={p.id} className="sitebar__dropdownItem">
                        <Link to={`/property/${p.id}`} className="sitebar__dropdownLink">
                          {p.type} • £{Number(p.price).toLocaleString()} • {p.bedrooms} beds
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <Link to="/search" className="sitebar__dropdownGo">
                  Go to Search (full list)
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
