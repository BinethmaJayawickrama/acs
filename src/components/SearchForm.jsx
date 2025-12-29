import React from "react";
import "./SearchForm.css"; // make sure this path matches your project

export default function SearchForm({ criteria, onChange, onSearch }) {
  const setField = (name, value) => {
    onChange((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) onSearch(criteria);
  }

  return (
    <section className="filterCard" aria-label="Property filters">
      <h2 className="filterTitle">Find property</h2>

      <form className="filterGrid" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="filterField">
          <label className="filterLabel" htmlFor="type">Property type</label>
          <select
            id="type"
            className="filterControl"
            value={criteria.type}
            onChange={(e) => setField("type", e.target.value)}
          >
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="filterField">
          <label className="filterLabel" htmlFor="postcodeArea">Postcode area</label>
          <input
            id="postcodeArea"
            className="filterControl"
            value={criteria.postcodeArea}
            onChange={(e) => setField("postcodeArea", e.target.value)}
            placeholder="e.g. BR1"
          />
        </div>

        <div className="filterField">
          <label className="filterLabel" htmlFor="minPrice">Min price</label>
          <input
            id="minPrice"
            className="filterControl"
            type="number"
            value={criteria.minPrice}
            onChange={(e) => setField("minPrice", e.target.value)}
            min="0"
          />
        </div>

        {/* Row 2 */}
        <div className="filterField">
          <label className="filterLabel" htmlFor="maxPrice">Max price</label>
          <input
            id="maxPrice"
            className="filterControl"
            type="number"
            value={criteria.maxPrice}
            onChange={(e) => setField("maxPrice", e.target.value)}
            min="0"
          />
        </div>

        <div className="filterField">
          <label className="filterLabel" htmlFor="minBeds">Min beds</label>
          <input
            id="minBeds"
            className="filterControl"
            type="number"
            value={criteria.minBeds}
            onChange={(e) => setField("minBeds", e.target.value)}
            min="0"
          />
        </div>

        <div className="filterField">
          <label className="filterLabel" htmlFor="maxBeds">Max beds</label>
          <input
            id="maxBeds"
            className="filterControl"
            type="number"
            value={criteria.maxBeds}
            onChange={(e) => setField("maxBeds", e.target.value)}
            min="0"
          />
        </div>

        {/* Row 3 (Date from + Date to + Search button on the same line) */}
<div className="filterField">
  <label className="filterLabel" htmlFor="dateFrom">Date from</label>
  <input
    id="dateFrom"
    className="filterControl"
    type="date"
    value={criteria.dateFrom}
    onChange={(e) => setField("dateFrom", e.target.value)}
  />
</div>

<div className="filterField">
  <label className="filterLabel" htmlFor="dateTo">Date to</label>
  <input
    id="dateTo"
    className="filterControl"
    type="date"
    value={criteria.dateTo}
    onChange={(e) => setField("dateTo", e.target.value)}
  />
</div>

<div className="filterField filterField--btn">
  <label className="filterLabel" style={{ visibility: "hidden" }}>Search</label>
  <button type="submit" className="filterSearchBtn">
    Search
  </button>
</div>

      </form>
    </section>
  );
}
