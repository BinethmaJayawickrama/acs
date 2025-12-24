import { Link } from "react-router-dom";

export default function PropertyCardMini({ property, onRemove }) {
  const img =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : "https://via.placeholder.com/120x80?text=No+Image";

  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", String(property.id));
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{ border: "1px solid #ddd", padding: 10 }}
    >
      <img
        src={img}
        alt="Fav"
        style={{ width: "100%", maxWidth: 220, marginBottom: 6 }}
      />

      <strong>£{Number(property.price || 0).toLocaleString()}</strong>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <Link to={`/property/${property.id}`}>Open</Link>
        <button onClick={onRemove}>Remove</button>
      </div>

      <small style={{ opacity: 0.7 }}>Tip: drag this to Remove Zone</small>
    </div>
  );
}
