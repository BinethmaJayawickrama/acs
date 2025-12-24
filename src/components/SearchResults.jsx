import React from "react";
import PropertyCard from "./PropertyCard";

export default function SearchResults({ properties }) {
  if (properties.length === 0) {
    return <p>No properties match your search.</p>;
  }

  return (
    <div className="results">
      <h2>Search Results</h2>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
