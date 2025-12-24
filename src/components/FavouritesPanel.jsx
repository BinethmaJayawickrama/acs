import PropertyCardMini from "./PropertyCardMini";

export default function FavouritesPanel({
  properties = [],
  favIds = [],
  onRemoveFavourite,
  onClear,
  onDropFavourite,
}) {
  const favourites = favIds
    .map((id) => properties.find((p) => String(p.id) === String(id)))
    .filter(Boolean);

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) onDropFavourite(id);
  }

  return (
    <aside
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: "2px dashed #888",
        padding: 12,
        minWidth: 280,
        height: "fit-content",
      }}
    >
      <h2>Favourites ({favourites.length})</h2>
      <p style={{ opacity: 0.8 }}>Drag a property card here to add it.</p>

      {favourites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        <>
          <button onClick={onClear} style={{ marginBottom: 10 }}>
            Clear all
          </button>

          <div style={{ display: "grid", gap: 10 }}>
            {favourites.map((p) => (
              <PropertyCardMini
                key={p.id}
                property={p}
                onRemove={() => onRemoveFavourite(p.id)}
              />
            ))}
          </div>
        </>
      )}

      {/* REMOVE ZONE */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const id = e.dataTransfer.getData("text/plain");
          if (id) onRemoveFavourite(id);
        }}
        style={{
          marginTop: 14,
          padding: 12,
          border: "2px dashed red",
          borderRadius: 6,
          textAlign: "center",
          color: "red",
        }}
      >
        🗑️ Remove Zone (drag a favourite here to remove)
      </div>
    </aside>
  );
}
