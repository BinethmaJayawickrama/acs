import PropertyCard from "./PropertyCard";

export default function ResultsList({ properties, favIds, onAddFavourite }) {
  if (!properties || properties.length === 0) return <p>No results found.</p>;

  return (
    <div className="results">
      {properties.map((p) => (
        <PropertyCard
          key={p.id}
          property={p}
          isFavourite={favIds?.includes(p.id)}
          onAddFavourite={() => onAddFavourite(p.id)}
        />
      ))}
    </div>
  );
}
