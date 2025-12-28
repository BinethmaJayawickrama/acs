import { Link } from "react-router-dom";
import "./home.css";

export default function HomePage() {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__heroText">
          <h1>Find your next home, faster.</h1>
          <p>
            RentReady helps you search and filter properties using price, bedrooms,
            date added and postcode area. Save favourites instantly and compare them later.
          </p>

          <div className="home__cta">
            <Link className="home__btn home__btnPrimary" to="/search">
              Start Searching
            </Link>
            <Link className="home__btn" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="home__heroImages">
          {/* Put images in: public/images/home/ */}
          <img src="/images/home/hero1.jpg" alt="Modern house exterior" />
          <img src="/images/home/hero2.jpg" alt="Living room interior" />
          <img src="/images/home/hero3.jpg" alt="Apartment building" />
        </div>
      </section>
    </div>
  );
}
