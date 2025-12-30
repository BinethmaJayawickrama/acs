import PropertyCard from "./PropertyCard";

export default function ResultsList({ properties, favIds, onAddFavourite }) {
  if (!properties || properties.length === 0) {
    return <p className="muted">No properties match your filters.</p>;
  }

  return (
    <div className="propertyGrid">
      {properties.map((p) => (
        <PropertyCard
          key={p.id}
          property={p}
          isFav={favIds.includes(p.id)}
          onAddFavourite={() => onAddFavourite(p.id)}
        />
      ))}
    </div>
  );
}
