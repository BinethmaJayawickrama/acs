import React from "react";
import "./SearchForm.css";

export default function SearchForm({ criteria, onChange, onSearch }) {
  const setField = (name, value) => {
    // your SearchPage uses: onChange={setCriteria}
    // so onChange can accept a functional update
    onChange((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) onSearch(criteria); // optional (works even if you don't pass onSearch)
  }

  return (
    <section className="filterCard" aria-label="Property filters">
      <h2 className="filterTitle">Find property</h2>

      <form className="rmGrid" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="rmField">
          <label className="rmLabel" htmlFor="type">Property type</label>
          <select
            id="type"
            className="rmControl"
            value={criteria.type}
            onChange={(e) => setField("type", e.target.value)}
          >
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="rmField">
          <label className="rmLabel" htmlFor="postcodeArea">Postcode area</label>
          <input
            id="postcodeArea"
            className="rmControl"
            value={criteria.postcodeArea}
            onChange={(e) => setField("postcodeArea", e.target.value)}
            placeholder="e.g. BR1"
          />
        </div>

        <div className="rmField">
          <label className="rmLabel" htmlFor="minPrice">Min price</label>
          <input
            id="minPrice"
            className="rmControl"
            type="number"
            value={criteria.minPrice}
            onChange={(e) => setField("minPrice", e.target.value)}
            placeholder="e.g. 150000"
            min="0"
          />
        </div>

        {/* Row 2 */}
        <div className="rmField">
          <label className="rmLabel" htmlFor="maxPrice">Max price</label>
          <input
            id="maxPrice"
            className="rmControl"
            type="number"
            value={criteria.maxPrice}
            onChange={(e) => setField("maxPrice", e.target.value)}
            placeholder="e.g. 300000"
            min="0"
          />
        </div>

        <div className="rmField">
          <label className="rmLabel" htmlFor="minBeds">Min beds</label>
          <input
            id="minBeds"
            className="rmControl"
            type="number"
            value={criteria.minBeds}
            onChange={(e) => setField("minBeds", e.target.value)}
            placeholder="e.g. 2"
            min="0"
          />
        </div>

        <div className="rmField">
          <label className="rmLabel" htmlFor="maxBeds">Max beds</label>
          <input
            id="maxBeds"
            className="rmControl"
            type="number"
            value={criteria.maxBeds}
            onChange={(e) => setField("maxBeds", e.target.value)}
            placeholder="e.g. 4"
            min="0"
          />
        </div>

        {/* Row 3 */}
        <div className="rmField">
          <label className="rmLabel" htmlFor="dateFrom">Date from</label>
          <input
            id="dateFrom"
            className="rmControl"
            type="date"
            value={criteria.dateFrom}
            onChange={(e) => setField("dateFrom", e.target.value)}
          />
        </div>

        <div className="rmField">
          <label className="rmLabel" htmlFor="dateTo">Date to</label>
          <input
            id="dateTo"
            className="rmControl"
            type="date"
            value={criteria.dateTo}
            onChange={(e) => setField("dateTo", e.target.value)}
          />
        </div>

        {/* ✅ Button placed right after Date To (row 3 col 3) */}
        <div className="rmActions">
          <button type="submit" className="rmSearchBtn">
            Search properties
          </button>
        </div>
      </form>
    </section>
  );
}
