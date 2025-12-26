import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ContactPage from "./pages/ContactPage";
import PropertyDetails from "./pages/PropertyDetails";

export default function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />

        {/* Optional: if someone goes to old "/" expecting search, remove this line.
            If you previously used "/" for SearchPage and want to support it, do:
            <Route path="/old-search" element={<SearchPage />} /> etc.
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}
