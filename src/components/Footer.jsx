import "./sitebar.css";

export default function Footer() {
  return (
    <footer className="sitefooter">
      <div className="sitefooter__inner">
        <p>
          © {new Date().getFullYear()} ACS Property Search — Coursework project
          (5COSC026W)
        </p>
        <p className="sitefooter__muted">
          Built with React. Data stored locally in JSON. No backend server used.
        </p>
      </div>
    </footer>
  );
}
