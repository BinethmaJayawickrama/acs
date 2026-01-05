import { Link } from "react-router-dom";

export default function FavouritesPanel({
  properties,
  favIds,
  onRemoveFavourite,
  onClear,
  onDropFavourite,
}) {
  const favProps = properties.filter((p) => favIds.includes(p.id));

  // ✅ write id in multiple formats (some browsers are picky)
  function setDragId(e, id, mode = "copy") {
    const safe = String(id);
    e.dataTransfer.setData("text/plain", safe);
    e.dataTransfer.setData("text", safe);
    e.dataTransfer.effectAllowed = mode;
  }

  function readDragId(e) {
    return (
      (e.dataTransfer.getData("text/plain") ||
        e.dataTransfer.getData("text") ||
        "")
    ).trim();
  }

  function handleDragOver(e) {
    e.preventDefault(); // REQUIRED
  }

  function handleDropAdd(e) {
    e.preventDefault();
    const id = readDragId(e);
    if (!id) return;
    onDropFavourite?.(id);
  }

  function handleDropRemove(e) {
    e.preventDefault();
    const id = readDragId(e);
    if (!id) return;
    onRemoveFavourite?.(id);
  }

  return (
    <aside className="favPanel" id="favourites">

      {/* ADD ZONE */}
      <div
        className="favPanel__drop"
        data-testid="fav-dropzone"
        onDragOver={handleDragOver}
        onDrop={handleDropAdd}
      >
        Drag a property card here to add
      </div>

      {favProps.length === 0 ? (
        <p className="favPanel__hint">No favourites yet.</p>
      ) : (
        <ul className="favPanel__list">
          {favProps.map((p) => {
            const img =
              (Array.isArray(p.images) && p.images[0]) ||
              "/images/placeholder.jpg";

            const shortDesc = p.shortDescription || "No short description.";

            const formattedPrice =
              typeof p.price === "number"
                ? p.price.toLocaleString("en-LK", {
                    style: "currency",
                    currency: "LKR",
                    maximumFractionDigits: 0,
                  })
                : "Price N/A";

            return (
              <li
                key={p.id}
                className="favMini"
                draggable
                onDragStart={(e) => setDragId(e, p.id, "move")}
              >
                {/*ALSO make the link draggable (so dragging from text works) */}
                <Link
                  to={`/property/${p.id}`}
                  className="favMini__left"
                  draggable
                  onDragStart={(e) => setDragId(e, p.id, "move")}
                >
                  {/* ALSO make the image draggable (so dragging from image works) */}
                  <img
                    className="favMini__img"
                    src={img}
                    alt={p.type || "Property"}
                    draggable
                    onDragStart={(e) => setDragId(e, p.id, "move")}
                  />

                  <div className="favMini__info">
                    <div className="favMini__price">{formattedPrice}</div>

                    <div className="favMini__meta">
                      {(p.type || "property").toLowerCase()} • {p.bedrooms ?? "?"} beds •{" "}
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
                  draggable={false}
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

      {/*  REMOVE ZONE */}
      <div
        className="favPanel__removeZone"
        onDragOver={handleDragOver}
        onDrop={handleDropRemove}
      >
        Remove Zone (drop here to remove)
      </div>
    </aside>
  );
}
