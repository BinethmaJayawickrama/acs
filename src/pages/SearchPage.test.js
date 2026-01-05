import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchPage from "./SearchPage";

// mock JSON
jest.mock("../data/properties.json", () => [
  { id: "1", type: "house", price: 4500000, bedrooms: 4, postcodeArea: "Colombo", images: ["/a.jpg"], shortDescription: "A" },
  { id: "2", type: "flat", price: 3200000, bedrooms: 2, postcodeArea: "Kandy", images: ["/b.jpg"], shortDescription: "B" },
]);

describe("SearchPage", () => {
  test("renders properties count heading", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/properties/i)).toBeInTheDocument();
    expect(screen.getByText(/properties\s*\(\s*2\s*\)/i)).toBeInTheDocument();
  });

  test("renders favourites panel", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    // panel text from your component
    expect(screen.getByText(/drag a property card here to add/i)).toBeInTheDocument();
  });
});
