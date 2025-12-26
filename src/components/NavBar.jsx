import { useState } from "react";
import { Link } from "react-router-dom";
import "./sitebar.css";

export default function NavBar({ onQuickSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (onQuickSearch) onQuickSearch(query);
  }

  return (
    <header className="sitebar">
      <div className="sitebar__inner">
        <div className="sitebar__brand">
          <span className="sitebar__brandIcon">🏠</span>
          <h1 className="sitebar__brandTitle">ACS Property Search</h1>
        </div>

        <form className="sitebar__search" onSubmit={handleSubmit}>
          <span className="sitebar__searchIcon">🔍</span>
          <input
            className="sitebar__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Postcode area (e.g., BR1)"
          />
          <button className="sitebar__btn" type="submit">
            Search
          </button>
        </form>

        <div className="sitebar__actions">
          <Link to="/#favourites" className="sitebar__heart" title="Favourites">
            ♡
          </Link>
        </div>
      </div>
    </header>
  );
}
