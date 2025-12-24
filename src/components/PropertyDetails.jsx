import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import ImageGallery from "../components/ImageGallery";
import PropertyTabs from "../components/PropertyTabs";

export default function PropertyDetails() {
  const { id } = useParams();

  const property = propertiesData.find((p) => String(p.id) === id);

  if (!property) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Property not found</h2>
        <Link to="/">Back to search</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">← Back to search</Link>

      <h1>{property.shortDescription}</h1>
      <h2>£{Number(property.price).toLocaleString()}</h2>

      <ImageGallery images={property.images} />

      <PropertyTabs property={property} />
    </div>
  );
}
