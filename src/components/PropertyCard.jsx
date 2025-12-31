import { Link } from "react-router-dom";

export default function PropertyCard({ property, isFav, onAddFavourite }) {
  if (!property) return null;

  const {
    id,
    images,
    price,
    shortDescription,
    type,
    bedrooms,
    postcode,
  } = property;

  const mainImg =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "/images/placeholder.jpg";

  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("en-GB", { style: "currency", currency: "GBP" })
      : price || "Price not available";

  return (
    <article className="pCard">
      <img className="pCard__img" src={mainImg} alt={type || "Property"} />

      <div className="pCard__body">
        <div className="pCard__price">{formattedPrice}</div>

        <div className="pCard__meta">
          <span>{type || "Property"}</span>
          <span>•</span>
          <span>{bedrooms ? `${bedrooms} beds` : "Beds N/A"}</span>
          <span>•</span>
          <span>{postcode || "Postcode N/A"}</span>
        </div>

        {/* ✅ SHORT description on card */}
        <p className="pCard__desc">
          {shortDescription ? shortDescription.slice(0, 90) : "No description"}
          {shortDescription && shortDescription.length > 90 ? "..." : ""}
        </p>

        <div className="pCard__actions">
          <Link className="pCard__link" to={`/property/${id}`}>
            View
          </Link>

          <button
            className="pCard__btn"
            type="button"
            onClick={onAddFavourite}
            disabled={isFav}
          >
            {isFav ? "Saved" : "Add Favourite"}
          </button>
        </div>
      </div>
    </article>
  );
}
