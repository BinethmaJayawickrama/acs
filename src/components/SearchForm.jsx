export default function SearchForm({ criteria, onChange }) {
  const update = (field) => (e) => {
    const value = e.target.value;
    onChange((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="rmForm">
      <div className="rmGrid">
        <div className="rmField">
          <label>Property type</label>
          <select value={criteria.type} onChange={update("type")}>
            <option value="any">Any</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
          </select>
        </div>

        <div className="rmField">
          <label>Postcode area</label>
          <input
            value={criteria.postcodeArea}
            onChange={update("postcodeArea")}
            placeholder="e.g. BR1"
          />
        </div>

        <div className="rmField">
          <label>Min price</label>
          <input
            value={criteria.minPrice}
            onChange={update("minPrice")}
            placeholder="e.g. 150000"
          />
        </div>

        <div className="rmField">
          <label>Max price</label>
          <input
            value={criteria.maxPrice}
            onChange={update("maxPrice")}
            placeholder="e.g. 300000"
          />
        </div>

        <div className="rmField">
          <label>Min beds</label>
          <input
            value={criteria.minBeds}
            onChange={update("minBeds")}
            placeholder="e.g. 2"
          />
        </div>

        <div className="rmField">
          <label>Max beds</label>
          <input
            value={criteria.maxBeds}
            onChange={update("maxBeds")}
            placeholder="e.g. 4"
          />
        </div>

        <div className="rmField">
          <label>Date from</label>
          <input type="date" value={criteria.dateFrom} onChange={update("dateFrom")} />
        </div>

        <div className="rmField">
          <label>Date to</label>
          <input type="date" value={criteria.dateTo} onChange={update("dateTo")} />
        </div>
      </div>
    </div>
  );
}
