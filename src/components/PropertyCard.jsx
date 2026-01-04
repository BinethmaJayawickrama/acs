import { Link } from "react-router-dom";

export default function PropertyCard({ property, isFav, onAddFavourite }) {
  if (!property) return null;

  const { id, images, price, shortDescription, type, bedrooms, postcode } =
    property;

  const mainImg =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "/images/placeholder.jpg";

  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("en-LK", {
          style: "currency",
          currency: "LKR",
          maximumFractionDigits: 0,
        })
      : "Price N/A";

  function handleDragStart(e) {
    // ✅ always set id as string
    e.dataTransfer.setData("text/plain", String(id));
    e.dataTransfer.effectAllowed = "copy";
  }

  return (
    <article
      className="pCard"
      draggable
      onDragStart={handleDragStart}
    >
      {/* ✅ IMPORTANT: stop browser dragging the IMAGE itself */}
      <img
        className="pCard__img"
        src={mainImg}
        alt={type || "Property"}
        draggable={false}
      />

      <div className="pCard__body">
        <div className="pCard__price">{formattedPrice}</div>

        <div className="pCard__meta">
          <span>{type || "Property"}</span>
          <span>•</span>
          <span>{bedrooms ? `${bedrooms} beds` : "Beds N/A"}</span>
          <span>•</span>
          <span>{postcode || "Postcode N/A"}</span>
        </div>

        <p className="pCard__desc">
          {shortDescription ? shortDescription.slice(0, 90) : "No description"}
          {shortDescription && shortDescription.length > 90 ? "..." : ""}
        </p>

        <div className="pCard__actions">
          {/* ✅ stop browser dragging the LINK url */}
          <Link className="pCard__link" to={`/property/${id}`} draggable={false}>
            View
          </Link>

          <button
            className="pCard__btn"
            type="button"
            onClick={() => onAddFavourite(id)}
            disabled={isFav}
            draggable={false}
            title={isFav ? "Already in favourites" : "Add to favourites"}
          >
            {isFav ? "Saved" : "Add Favourite"}
          </button>
        </div>
      </div>
    </article>
  );
}
