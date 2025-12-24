export default function FavouritesPanel({ properties, favIds, onRemoveFavourite, onClear }) {
  const favourites = properties.filter((p) => favIds.includes(p.id));

  return (
    <aside className="favourites">
      <h3>Favourites</h3>

      {favourites.length === 0 && <p>No favourites yet.</p>}

      {favourites.map((p) => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span>{p.shortDescription}</span>
          <button onClick={() => onRemoveFavourite(p.id)}>Remove</button>
        </div>
      ))}

      {favIds.length > 0 && <button onClick={onClear}>Clear All</button>}
    </aside>
  );
}
