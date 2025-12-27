export default function SearchForm({ criteria, onChange }) {
  function setField(name, value) {
    onChange((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form className="rmForm" onSubmit={(e) => e.preventDefault()}>
      <div className="rmGrid">
        {/* Row 1 */}
        <div className="rmField">
          <label>Property types</label>
          <select
            value={criteria.type}
            onChange={(e) => setField("type", e.target.value)}
          >
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="rmField">
          <label>Added to site</label>
          <select
            value={criteria.dateFrom ? "custom" : "anytime"}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "anytime") {
                setField("dateFrom", "");
                setField("dateTo", "");
              }
            }}
          >
            <option value="anytime">Anytime</option>
            <option value="custom">Custom (use dates below)</option>
          </select>
        </div>

        <div className="rmField">
          <label>Postcode area</label>
          <input
            placeholder="e.g. BR1"
            value={criteria.postcodeArea}
            onChange={(e) => setField("postcodeArea", e.target.value)}
          />
        </div>

        {/* Row 2 */}
        <div className="rmField">
          <label>Price range (£)</label>
          <div className="rmDouble">
            <input
              placeholder="Min"
              value={criteria.minPrice}
              onChange={(e) => setField("minPrice", e.target.value)}
            />
            <input
              placeholder="Max"
              value={criteria.maxPrice}
              onChange={(e) => setField("maxPrice", e.target.value)}
            />
          </div>
        </div>

        <div className="rmField">
          <label>No. of bedrooms</label>
          <div className="rmDouble">
            <input
              placeholder="Min"
              value={criteria.minBeds}
              onChange={(e) => setField("minBeds", e.target.value)}
            />
            <input
              placeholder="Max"
              value={criteria.maxBeds}
              onChange={(e) => setField("maxBeds", e.target.value)}
            />
          </div>
        </div>

        <div className="rmField rmButtonWrap">
          <label className="rmGhostLabel">.</label>
          <button className="rmButton" type="button">
            Search properties
          </button>
        </div>

        {/* Optional date row */}
        <div className="rmField">
          <label>Date from</label>
          <input
            type="date"
            value={criteria.dateFrom}
            onChange={(e) => setField("dateFrom", e.target.value)}
          />
        </div>

        <div className="rmField">
          <label>Date to</label>
          <input
            type="date"
            value={criteria.dateTo}
            onChange={(e) => setField("dateTo", e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
