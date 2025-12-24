export default function GoogleMapEmbed({ lat, lng }) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <iframe
      title="map"
      width="100%"
      height="350"
      style={{ border: 0, borderRadius: 8 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={src}
    />
  );
}
