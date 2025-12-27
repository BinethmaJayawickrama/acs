import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ favCount = 0 }) {
  const [postcode, setPostcode] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    // Go to Search page and pass postcode into route state
    navigate("/search", {
      state: { postcodeArea: postcode.trim() }
    });
  }

  return (
    <header className="sitebar">
      <div className="sitebar__inner">
        {/* LEFT */}
        <Link to="/" className="sitebar__brand">
          RentReady
        </Link>

        {/* CENTER */}
        <form className="sitebar__search" onSubmit={onSubmit}>

          <input
            className="sitebar__input"
            type="text"
            placeholder="Postcode area (e.g., BR1)"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />

          <button className="sitebar__btn" type="submit">
            Search
          </button>
        </form>

        {/* RIGHT */}
        <nav className="sitebar__links">
          <NavLink className="sitebar__link" to="/contact">
            Contact us
          </NavLink>

          <NavLink className="sitebar__link" to="/favourites">
            Favourites {favCount > 0 ? `(${favCount})` : ""}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
