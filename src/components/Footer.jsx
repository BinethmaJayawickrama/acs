import "./sitebar.css";

export default function Footer() {
  return (
    <footer className="sitefooter">
      <div className="sitefooter__inner">
        <p>
          © {new Date().getFullYear()} RentReady — Coursework project
          (5COSC026W)
        </p>
      </div>
    </footer>
  );
}
