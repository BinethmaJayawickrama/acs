import { Link } from "react-router-dom";

export default function PropertyCard({ property, isFavourite, onAddFavourite }) {
  if (!property) return null;

  const img =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : "https://via.placeholder.com/400x250?text=No+Image";

  function handleDragStart(e) {
    // store the property id in the drag payload
    e.dataTransfer.setData("text/plain", String(property.id));
  }

  return (
    <div
      className="property-card"
      draggable
      onDragStart={handleDragStart}
      style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}
    >
      <img src={img} alt="Property" style={{ width: "100%", maxWidth: 420 }} />

      <h3>£{Number(property.price || 0).toLocaleString()}</h3>
      <p>{property.shortDescription || "No description"}</p>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to={`/property/${property.id}`}>View Property</Link>

        <button onClick={onAddFavourite} disabled={isFavourite}>
          {isFavourite ? "Favourited" : "Add Favourite"}
        </button>
      </div>

      <small style={{ opacity: 0.7 }}>Tip: drag this card into Favourites →</small>
    </div>
  );
}
