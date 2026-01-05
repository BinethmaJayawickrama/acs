import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ContactUs from "./pages/ContactUs";
import PropertyDetails from "./pages/PropertyDetails";

import "./App.css";

export default function App() {
  return (
    <div className="appShell">
      <NavBar />

      <main className="appMain">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
