import { Link } from "react-router-dom";

export default function PropertyCard({ property, isFavourite, onAddFavourite }) {
  if (!property) return null;

  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", String(property.id));
    e.dataTransfer.effectAllowed = "copyMove";
  }

  const cover =
    property?.images?.[0] || property?.image || "/images/placeholder.jpg";

  return (
    <div className="card propertyCard" draggable onDragStart={handleDragStart}>
      <img className="thumb" src={cover} alt={property.shortDescription} />

      <h3 style={{ marginTop: 10 }}>
        £{Number(property.price).toLocaleString()}
      </h3>
      <p className="muted">{property.shortDescription}</p>

      <div className="rowWrap">
        <Link to={`/property/${property.id}`}>View Property</Link>

        <button type="button" onClick={onAddFavourite} disabled={isFavourite}>
          {isFavourite ? "Added" : "Add Favourite"}
        </button>
      </div>

      <p className="muted" style={{ marginTop: 10 }}>
        Tip: drag this card into Favourites →
      </p>
    </div>
  );
}
