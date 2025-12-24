import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PropertyDetails from "./pages/PropertyDetails";
import "./styles/App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  );
}
