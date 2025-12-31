import { Link } from "react-router-dom";

export default function FavouritesPanel({
  properties,
  favIds,
  onRemoveFavourite,
  onClear,
  onDropFavourite,
}) {
  const favProps = properties.filter((p) => favIds.includes(p.id));

  function handleDropAdd(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id && onDropFavourite) onDropFavourite(id);
  }

  function handleDropRemove(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) onRemoveFavourite(id);
  }

  return (
    <aside className="favPanel" id="favourites">
      <div className="favPanel__header">
        <h3 className="favPanel__title">Favourites ({favProps.length})</h3>
      </div>

      <p className="favPanel__hint">Drag a property card here to add it.</p>

      {/* ✅ DROP ZONE: ADD */}
      <div
        className="favPanel__drop"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropAdd}
      >
        Drop here to add ✅
      </div>

      {favProps.length === 0 ? (
        <p className="favPanel__hint">No favourites yet.</p>
      ) : (
        <ul className="favPanel__list">
          {favProps.map((p) => {
            const img =
              (Array.isArray(p.images) && p.images[0]) ||
              "/images/placeholder.jpg";

            const shortDesc =
              p.shortDescription || "No short description.";

            return (
              <li key={p.id} className="favMini">
                <Link to={`/property/${p.id}`} className="favMini__left">
                  <img
                    className="favMini__img"
                    src={img}
                    alt={p.type || "Property"}
                  />

                  <div className="favMini__info">
                    <div className="favMini__price">
                      {typeof p.price === "number"
                        ? p.price.toLocaleString("en-GB", {
                            style: "currency",
                            currency: "GBP",
                          })
                        : "Price N/A"}
                    </div>

                    <div className="favMini__meta">
                      {(p.type || "property").toLowerCase()} •{" "}
                      {p.bedrooms ?? "?"} beds •{" "}
                      {p.postcode || p.postcodeArea || "Postcode N/A"}
                    </div>

                    <div className="favMini__desc">
                      {shortDesc.length > 55 ? shortDesc.slice(0, 55) + "…" : shortDesc}
                    </div>
                  </div>
                </Link>

                <button
                  className="favMini__remove"
                  type="button"
                  onClick={() => onRemoveFavourite(p.id)}
                  aria-label="Remove favourite"
                  title="Remove"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <button className="favPanel__clear" onClick={onClear} type="button">
        Clear all
      </button>

      {/* ✅ REMOVE ZONE */}
      <div
        className="favPanel__removeZone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropRemove}
      >
        Remove Zone (drop here to remove)
      </div>
    </aside>
  );
}
