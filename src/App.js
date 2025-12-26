import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PropertyDetails from "./pages/PropertyDetails";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </>
  );
}
