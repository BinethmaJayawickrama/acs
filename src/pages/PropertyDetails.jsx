import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import "./PropertyDetails.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = useMemo(() => {
    const numId = Number(id);
    return propertiesData.find((p) => p.id === numId || String(p.id) === String(id));
  }, [id]);

  const images = useMemo(() => {
    if (!property) return [];
    const arr = Array.isArray(property.images) ? property.images : [];
    return arr.length ? arr : ["/images/placeholder.jpg"];
  }, [property]);

  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState("description"); // description | floorplan | map

  if (!property) {
    return (
      <div className="pd__wrap">
        <div className="pd__container">
          <h1 className="pd__title">Property not found</h1>
          <p className="pd__muted">This property ID doesn’t exist in your JSON.</p>

          <button className="pd__backBtn" onClick={() => navigate("/search")}>
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const priceText =
    typeof property.price === "number"
      ? property.price.toLocaleString("en-GB", { style: "currency", currency: "LKR" })
      : property.price || "Price not available";

  const metaType = (property.type || "Property").toUpperCase();
  const metaBeds = property.bedrooms != null ? `${property.bedrooms} bedrooms` : "Bedrooms N/A";
  const metaPost = property.postcode || property.postcodeArea || "Postcode N/A";

  // Optional: if you have floorPlan image field in JSON
  const floorPlanImg = property.floorPlan || property.floorplan || null;

  const mapQuery = encodeURIComponent(property.postcode || property.postcodeArea || "");
  const mapSrc = mapQuery
    ? `https://www.google.com/maps?q=${mapQuery}&output=embed`
    : null;

  return (
    <div className="pd__wrap">
      <div className="pd__container">
        {/* Header row */}
        <div className="pd__header">
          <div>
            <h1 className="pd__title">
              {metaType} — <span className="pd__price">{priceText}</span>
            </h1>
            <div className="pd__meta">
              <span>{metaBeds}</span>
              <span className="pd__dot">•</span>
              <span>{metaPost}</span>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="pd__grid">
          {/* Left column: Gallery + Tabs */}
          <div className="pd__main">
            {/* Gallery */}
            <div className="pd__gallery">
              <img
                className="pd__mainImg"
                src={images[activeImg]}
                alt={`${property.type || "Property"} main`}
              />

              <div className="pd__thumbRow">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    className={`pd__thumbBtn ${i === activeImg ? "is-active" : ""}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img className="pd__thumb" src={src} alt={`thumb ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="pd__tabs">
              <button
                className={`pd__tab ${tab === "description" ? "is-active" : ""}`}
                onClick={() => setTab("description")}
                type="button"
              >
                Description
              </button>

              <button
                className={`pd__tab ${tab === "floorplan" ? "is-active" : ""}`}
                onClick={() => setTab("floorplan")}
                type="button"
              >
                Floor Plan
              </button>

              <button
                className={`pd__tab ${tab === "map" ? "is-active" : ""}`}
                onClick={() => setTab("map")}
                type="button"
              >
                Map
              </button>
            </div>

            <div className="pd__panel">
              {tab === "description" && (
                <>
                <h3 className="pd__panelTitle">Description</h3>
                
                <p className="pd__text">
                    {property.longDescription || property.shortDescription || "No description available."}
                </p>
                </>
            )}


              {tab === "floorplan" && (
                <>
                  <h3 className="pd__panelTitle">Floor Plan</h3>
                  {floorPlanImg ? (
                    <img className="pd__floorImg" src={floorPlanImg} alt="Floor plan" />
                  ) : (
                    <p className="pd__muted">No floor plan available for this property.</p>
                  )}
                </>
              )}

              {tab === "map" && (
                <>
                  <h3 className="pd__panelTitle">Map</h3>
                  {mapSrc ? (
                    <iframe
                      className="pd__map"
                      title="Map"
                      src={mapSrc}
                      loading="lazy"
                    />
                  ) : (
                    <p className="pd__muted">No postcode available to show a map.</p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right column: Quick facts */}
          <aside className="pd__side">
            <div className="pd__sideCard">
              <h3 className="pd__sideTitle">Quick facts</h3>

              <div className="pd__facts">
                <div className="pd__fact">
                  <span className="pd__factLabel">Type</span>
                  <span className="pd__factValue">{property.type || "N/A"}</span>
                </div>

                <div className="pd__fact">
                  <span className="pd__factLabel">Bedrooms</span>
                  <span className="pd__factValue">
                    {property.bedrooms != null ? property.bedrooms : "N/A"}
                  </span>
                </div>

                <div className="pd__fact">
                  <span className="pd__factLabel">Postcode</span>
                  <span className="pd__factValue">{metaPost}</span>
                </div>

                <div className="pd__fact">
                  <span className="pd__factLabel">Price</span>
                  <span className="pd__factValue">{priceText}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* FIXED bottom-right button (on every property page) */}
        <div className="pd__backRow">
  <button
    type="button"
    className="pd__backIconBtn"
    onClick={() => navigate("/search")}
    aria-label="Back to Search"
  >
    <span className="pd__backIcon" aria-hidden="true"></span>
  </button>
</div>


      </div>
    </div>
  );
}
