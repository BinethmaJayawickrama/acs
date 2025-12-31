import React from "react";
import "./ContactUs.css";

export default function ContactUs() {
  return (
    <main className="contactSimple">
      <h1 className="contactSimple__title">Contact Us</h1>

      <section className="contactSimple__whyGrid" aria-label="Why choose us">
        <div className="whyCard">
          <h3>Easy search</h3>
          <p>Quick filters to find matching properties.</p>
        </div>

        <div className="whyCard">
          <h3>Save favourites</h3>
          <p>Keep a shortlist to compare later.</p>
        </div>

        <div className="whyCard">
          <h3>Clear details</h3>
          <p>Simple property pages with key info.</p>
        </div>
      </section>

      <section className="contactSimple__infoBox" aria-label="Contact information">
        <div className="infoRow">
          <span className="infoLabel">Location</span>
          <span className="infoValue">Colombo, Sri Lanka.</span>
        </div>

        <div className="infoRow">
          <span className="infoLabel">Email</span>
          <a className="infoLink" href="mailto:rentready.support@gmail.com">
            rentready.support@gmail.com
          </a>
        </div>

        <div className="infoRow">
          <span className="infoLabel">Phone</span>
          <a className="infoLink" href="tel:+447700900123">
            +94 770 900 123
          </a>
        </div>
      </section>
    </main>
  );
}
