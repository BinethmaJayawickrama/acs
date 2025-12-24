import PropertyCard from "./PropertyCard";

export default function ResultsList({ properties = [], favIds = [], onAddFavourite }) {
  if (!Array.isArray(properties) || properties.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="results">
      {properties.map((p) => (
        <PropertyCard
          key={p?.id ?? Math.random()}
          property={p}  // ✅ make sure we pass "property"
          isFavourite={p?.id ? favIds.includes(p.id) : false}
          onAddFavourite={() => p?.id && onAddFavourite(p.id)}
        />
      ))}
    </div>
  );
}
