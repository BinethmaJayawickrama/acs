import { useState } from "react";

export default function PropertyTabs({ property }) {
  const [tab, setTab] = useState("description");

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <button onClick={() => setTab("description")}>Description</button>
        <button onClick={() => setTab("floorplan")}>Floor Plan</button>
        <button onClick={() => setTab("map")}>Map</button>
      </div>

      {tab === "description" && (
        <p>{property.longDescription || "No description available."}</p>
      )}

      {tab === "floorplan" && (
        property.floorPlan ? (
          <img
            src={property.floorPlan}
            alt="Floor plan"
            style={{ maxWidth: "100%" }}
          />
        ) : (
          <p>No floor plan available.</p>
        )
      )}

      {tab === "map" && (
        <div>
          <p>Map placeholder (Google Maps)</p>
          <iframe
            title="map"
            width="100%"
            height="300"
            loading="lazy"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              property.postcode
            )}&output=embed`}
          />
        </div>
      )}
    </div>
  );
}
