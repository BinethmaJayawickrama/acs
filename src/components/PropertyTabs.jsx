import { useState } from "react";

export default function PropertyTabs({ property }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div style={{ marginTop: 20 }}>
      {/* TAB BUTTONS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button
          onClick={() => setActiveTab("description")}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            background: activeTab === "description" ? "#eee" : "#fff",
            cursor: "pointer",
          }}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab("floorplan")}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            background: activeTab === "floorplan" ? "#eee" : "#fff",
            cursor: "pointer",
          }}
        >
          Floor Plan
        </button>

        <button
          onClick={() => setActiveTab("map")}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            background: activeTab === "map" ? "#eee" : "#fff",
            cursor: "pointer",
          }}
        >
          Map
        </button>
      </div>

      {/* TAB CONTENT */}
      <div style={{ border: "1px solid #ddd", padding: 12 }}>
        {activeTab === "description" && (
          <div>
            <h3>Description</h3>
            <p>{property.longDescription || "No description available."}</p>
          </div>
        )}

        {activeTab === "floorplan" && (
          <div>
            <h3>Floor Plan</h3>
            {property.floorPlan ? (
              <img
                src={property.floorPlan}
                alt="Floor Plan"
                style={{ maxWidth: "100%", border: "1px solid #ccc" }}
              />
            ) : (
              <p>No floor plan available.</p>
            )}
          </div>
        )}

        {activeTab === "map" && (
          <div>
            <h3>Map</h3>

            {property.postcode ? (
              <iframe
                title="map"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  property.postcode
                )}&output=embed`}
              />
            ) : (
              <p>No postcode available to show map.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
