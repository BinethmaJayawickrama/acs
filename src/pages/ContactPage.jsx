import "./contact.css";

export default function ContactPage() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>
        If you have questions about listings, favourites, or using the filters,
        get in touch using the details below.
      </p>

      <div className="contact__card">
        <p><strong>Email:</strong> support@rentready.example</p>
        <p><strong>Phone:</strong> +44 0000 000000</p>
        <p><strong>Hours:</strong> Mon–Fri, 9am–5pm</p>
      </div>
    </div>
  );
}
