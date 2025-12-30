import { Link } from "react-router-dom";

export default function PropertyCard({ property, isFav, onAddFavourite }) {
  if (!property) return null;

  const { id, images, price, description, type, bedrooms, postcodeArea } =
    property;

  const mainImg =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "/images/placeholder.jpg";

  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("en-GB", { style: "currency", currency: "GBP" })
      : price || "Price not available";

  function handleDragStart(e) {
    // IMPORTANT: this is what favourites drop zone reads
    e.dataTransfer.setData("text/plain", String(id));
    e.dataTransfer.effectAllowed = "copy";
  }

  return (
    <article className="pCard" draggable onDragStart={handleDragStart}>
      <img className="pCard__img" src={mainImg} alt={type || "Property"} />

      <div className="pCard__body">
        <div className="pCard__price">{formattedPrice}</div>

        <div className="pCard__meta">
          <span>{type || "Property"}</span>
          <span>•</span>
          <span>{bedrooms ? `${bedrooms} beds` : "Beds N/A"}</span>
          <span>•</span>
          <span>{postcodeArea || "Postcode N/A"}</span>
        </div>

        <p className="pCard__desc">
          {description ? description.slice(0, 90) : "No description"}
          {description && description.length > 90 ? "..." : ""}
        </p>

        <div className="pCard__actions">
          <Link className="pCard__link" to={`/property/${id}`}>
            View
          </Link>

          <button
            className="pCard__btn"
            type="button"
            onClick={() => onAddFavourite?.(id)}
            disabled={isFav}
            title={isFav ? "Already in favourites" : "Add to favourites"}
          >
            {isFav ? "Saved" : "Add Favourite"}
          </button>
        </div>
      </div>
    </article>
  );
}
