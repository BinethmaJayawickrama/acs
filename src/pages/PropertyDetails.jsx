import { Link, useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import ImageGallery from "../components/ImageGallery";
import PropertyTabs from "../components/PropertyTabs";

export default function PropertyDetails() {
  const { id } = useParams();
  const property = propertiesData.find((p) => String(p.id) === String(id));

  if (!property) {
    return (
      <div className="container">
        <h1>Property not found</h1>
        <Link to="/">← Back</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/">← Back to Search</Link>

      <h1>{property.type.toUpperCase()} — £{property.price}</h1>
      <p>{property.bedrooms} bedrooms • {property.postcode}</p>

      <ImageGallery images={property.images} />

      <PropertyTabs property={property} />
    </div>
  );
}
