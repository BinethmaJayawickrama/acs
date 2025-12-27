import { Link } from "react-router-dom";

export default function FavouritesPanel({
  properties,
  favIds,
  onRemoveFavourite,
  onClear,
  onDropFavourite,
}) {
  const favProps = (properties || []).filter((p) => favIds.includes(p.id));

  function allowDrop(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDropAdd(e) {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("text/plain"));
    if (!Number.isNaN(id)) onDropFavourite?.(id);
  }

  return (
    <div className="favSidebar" onDragOver={allowDrop} onDrop={handleDropAdd}>
      <h3 className="favSidebar__title">Favourites ({favIds.length})</h3>
      <p className="favSidebar__hint">Drag a card here to add it.</p>

      {favProps.length === 0 ? (
        <p className="muted">No favourites yet.</p>
      ) : (
        <ul className="favSidebar__list">
          {favProps.map((p) => (
            <li key={p.id} className="favSidebar__item">
              <Link to={`/property/${p.id}`} className="favSidebar__link">
                £{Number(p.price).toLocaleString()} — {p.type}
              </Link>
              <button onClick={() => onRemoveFavourite(p.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <button className="favSidebar__clear" onClick={onClear}>
        Clear all
      </button>
    </div>
  );
}
