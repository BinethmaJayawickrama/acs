import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="home">
      <section className="homeHero" aria-label="Homepage hero">
        <div className="homeHero__inner">
          {/* LEFT: text */}
          <div className="homeHero__text">
            <h1 className="homeHero__title">Find your next home, faster.</h1>

            <p className="homeHero__desc">
              RentReady helps you search and filter properties by price, bedrooms and
              date added. Save favourites instantly and compare them later.
            </p>

            <div className="homeHero__actions">
              <Link className="homeHero__btn homeHero__btn--primary" to="/search">
                Start Searching
              </Link>
            </div>
          </div>

          {/* RIGHT: single image */}
          <div className="homeHero__imageWrap">
            {/* Put ONE image here. You can change the path to your own image. */}
            <img
              className="homeHero__image"
              src="/images/house1/1.jpg"
              alt="Property preview"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
