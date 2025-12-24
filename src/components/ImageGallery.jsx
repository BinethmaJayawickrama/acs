import { useEffect, useState } from "react";

export default function ImageGallery({ images = [] }) {
  const safeImages =
    Array.isArray(images) && images.length > 0
      ? images
      : ["https://via.placeholder.com/800x500?text=No+Image"];

  const [active, setActive] = useState(safeImages[0]);

  // If images change (different property), reset active image
  useEffect(() => {
    setActive(safeImages[0]);
  }, [images]);

  return (
    <div style={{ margin: "20px 0" }}>
      {/* MAIN IMAGE */}
      <div style={{ marginBottom: 10 }}>
        <img
          src={active}
          alt="Property"
          style={{
            width: "100%",
            maxWidth: 700,
            height: "auto",
            borderRadius: 6,
            border: "1px solid #ddd",
          }}
        />
      </div>

      {/* THUMBNAILS */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {safeImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setActive(img)}
            style={{
              width: 110,
              height: 75,
              objectFit: "cover",
              cursor: "pointer",
              borderRadius: 4,
              border: img === active ? "2px solid black" : "1px solid #ccc",
              opacity: img === active ? 1 : 0.85,
            }}
          />
        ))}
      </div>
    </div>
  );
}
