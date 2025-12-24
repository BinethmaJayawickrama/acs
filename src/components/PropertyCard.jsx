import { Link } from "react-router-dom";

export default function PropertyCard({ property, isFavourite, onAddFavourite }) {
  // ✅ If property is undefined, don't crash
  if (!property) return null;

  // ✅ If images missing, use placeholder
  const img =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div className="property-card" style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
      <img src={img} alt={property.shortDescription || "Property"} style={{ width: "100%", maxWidth: 420 }} />

      <h3>£{Number(property.price || 0).toLocaleString()}</h3>
      <p>{property.shortDescription || "No description"}</p>
      <p>{property.bedrooms ?? "?"} bedrooms</p>
      <p>{property.postcode || "No postcode"}</p>

      <div style={{ display: "flex", gap: 12 }}>
        <Link to={`/property/${property.id}`}>View Property</Link>

        <button onClick={onAddFavourite} disabled={isFavourite}>
          {isFavourite ? "Favourited" : "Add Favourite"}
        </button>
      </div>
    </div>
  );
}
