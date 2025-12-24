export default function SearchForm({ criteria, onChange }) {
  function update(field, value) {
    onChange({ ...criteria, [field]: value });
  }

  return (
    <form>
      <label>
        Property Type:
        <select value={criteria.type} onChange={(e) => update("type", e.target.value)}>
          <option value="any">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
          <option value="Bungalow">Bungalow</option>
        </select>
      </label>

      <label>
        Min Price:
        <input value={criteria.minPrice} onChange={(e) => update("minPrice", e.target.value)} />
      </label>

      <label>
        Max Price:
        <input value={criteria.maxPrice} onChange={(e) => update("maxPrice", e.target.value)} />
      </label>

      <label>
        Min Beds:
        <input value={criteria.minBeds} onChange={(e) => update("minBeds", e.target.value)} />
      </label>

      <label>
        Max Beds:
        <input value={criteria.maxBeds} onChange={(e) => update("maxBeds", e.target.value)} />
      </label>

      <label>
        Date From:
        <input type="date" value={criteria.dateFrom} onChange={(e) => update("dateFrom", e.target.value)} />
      </label>

      <label>
        Date To:
        <input type="date" value={criteria.dateTo} onChange={(e) => update("dateTo", e.target.value)} />
      </label>

      <label>
        Postcode Area:
        <input
          value={criteria.postcodeArea}
          onChange={(e) => update("postcodeArea", e.target.value)}
          placeholder="e.g. BR1"
        />
      </label>
    </form>
  );
}
