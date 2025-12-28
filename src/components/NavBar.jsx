import { Link } from "react-router-dom";
import "./sitebar.css";

function HeartOutlineIcon({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.84 4.61c-1.54-1.34-3.78-1.34-5.32 0L12 7.28 8.48 4.61c-1.54-1.34-3.78-1.34-5.32 0-1.82 1.59-1.95 4.35-.29 6.1L12 21l9.13-10.29c1.66-1.75 1.53-4.51-.29-6.1z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export default function NavBar({ favCount = 0, searchValue = "", onSearchChange, onSearchSubmit }) {
  return (
    <header className="sitebar">
      <div className="sitebar__inner">
        {/* LEFT: Brand */}
        <Link to="/" className="sitebar__brand" aria-label="Go to home">
          <span className="sitebar__brandTitle">RentReady</span>
        </Link>

        {/* MIDDLE: Search */}
        <form
          className="sitebar__search"
          onSubmit={(e) => {
            e.preventDefault();
            onSearchSubmit?.();
          }}
        >
          <span className="sitebar__searchIcon" aria-hidden="true"></span>

          <input
            className="sitebar__input"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Postcode area (e.g., BR1)"
          />

          <button className="sitebar__btn" type="submit">
            Search
          </button>
        </form>

        {/* RIGHT: Links */}
        <div className="sitebar__actions">
          <Link className="sitebar__navLink" to="/contact">
            Contact Us
          </Link>

          {/* ONLY ICON (no word) */}
          <Link to="/search#favourites" className="sitebar__favIcon" aria-label="Favourites"> <HeartOutlineIcon /> </Link>
        </div>
      </div>
    </header>
  );
}
