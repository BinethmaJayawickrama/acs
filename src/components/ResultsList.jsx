import PropertyCard from "./PropertyCard";

export default function ResultsList({ properties, favIds, onAddFavourite }) {
  return (
    <div className="propertyGrid">
      {properties.map((p) => (
        <PropertyCard
          key={p.id}
          property={p}
          isFavourite={favIds.includes(p.id)}
          onAddFavourite={() => onAddFavourite(p.id)}
        />
      ))}
    </div>
  );
}
