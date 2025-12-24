import { useState } from "react";

export default function ImageGallery({ images = [] }) {
  const safeImages =
    images.length > 0
      ? images
      : ["https://via.placeholder.com/600x400?text=No+Image"];

  const [active, setActive] = useState(safeImages[0]);

  return (
    <div style={{ marginBottom: 20 }}>
      <img
        src={active}
        alt="Property"
        style={{ width: "100%", maxWidth: 600, display: "block", marginBottom: 10 }}
      />

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {safeImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Thumbnail"
            style={{
              width: 100,
              height: 70,
              objectFit: "cover",
              cursor: "pointer",
              border: img === active ? "2px solid black" : "1px solid #ccc",
            }}
            onClick={() => setActive(img)}
          />
        ))}
      </div>
    </div>
  );
}
