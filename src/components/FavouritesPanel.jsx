import { Link } from "react-router-dom";

export default function FavouritesPanel({
  properties,
  favIds,
  onRemoveFavourite,
  onClear,
  onDropFavourite,
}) {
  const favProps = properties.filter((p) => favIds.includes(p.id));

  function parseId(raw) {
    // handles number ids safely
    const n = Number(raw);
    return Number.isNaN(n) ? raw : n;
  }

  function handleDropAdd(e) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/plain");
    if (!raw) return;

    const id = parseId(raw);
    onDropFavourite?.(id);
  }

  function handleDropRemove(e) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/plain");
    if (!raw) return;

    const id = parseId(raw);
    onRemoveFavourite?.(id);
  }

  return (
    <aside className="favPanel" id="favourites">
      <div className="favPanel__header">
        <h3 className="favPanel__title">Favourites ({favProps.length})</h3>
      </div>

      <p className="favPanel__hint">Drag a property card here to add it.</p>

      {/* ✅ DROP TO ADD */}
      <div
        className="favPanel__drop"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropAdd}
      >
        Drop favourites here.
      </div>

      {favProps.length === 0 ? (
        <p className="favPanel__hint">No favourites yet.</p>
      ) : (
        <ul className="favPanel__list">
          {favProps.map((p) => {
            const img =
              (Array.isArray(p.images) && p.images[0]) ||
              p.image ||
              "/images/placeholder.jpg";

            return (
              <li
                key={p.id}
                className="favMini"
                draggable
                onDragStart={(e) => {
                  // ✅ so you can drag favourites into Remove Zone
                  e.dataTransfer.setData("text/plain", String(p.id));
                  e.dataTransfer.effectAllowed = "move";
                }}
              >
                <Link to={`/property/${p.id}`} className="favMini__left">
                  <img
                    className="favMini__img"
                    src={img}
                    alt={p.type || "Property"}
                  />

                  <div className="favMini__info">
                    <div className="favMini__price">
                      £{Number(p.price).toLocaleString()}
                    </div>

                    <div className="favMini__meta">
                      {(p.type || "property").toLowerCase()} •{" "}
                      {p.bedrooms ?? "?"} beds •{" "}
                      {p.postcodeArea || p.postcode || "Postcode N/A"}
                    </div>

                    <div className="favMini__desc">
                      {p.description
                        ? p.description.slice(0, 55) + "…"
                        : "No description"}
                    </div>
                  </div>
                </Link>

                <button
                  className="favMini__remove"
                  type="button"
                  onClick={() => onRemoveFavourite?.(p.id)}
                  aria-label="Remove favourite"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <button className="favPanel__clear" type="button" onClick={onClear}>
        Clear all
      </button>

      {/* ✅ DROP TO REMOVE */}
      <div
        className="favPanel__removeZone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropRemove}
      >         
        (drag here to remove)
      </div>
    </aside>
  );
}
