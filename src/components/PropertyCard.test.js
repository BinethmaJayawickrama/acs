import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PropertyCard from "./PropertyCard";

function makeDataTransfer() {
  const store = {};
  return {
    setData: (k, v) => (store[k] = String(v)),
    getData: (k) => store[k] || "",
    effectAllowed: "",
    dropEffect: "",
  };
}

describe("PropertyCard", () => {
  test("renders basic info and buttons", () => {
    const property = {
      id: "1",
      images: ["/img.jpg"],
      price: 4500000,
      shortDescription: "Nice house",
      type: "house",
      bedrooms: 4,
      postcode: "Colombo",
    };

    render(
      <MemoryRouter>
        <PropertyCard property={property} isFav={false} onAddFavourite={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(/LKR/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add favourite/i })).toBeInTheDocument();
  });

  test("clicking Add Favourite calls onAddFavourite with id", () => {
    const property = {
      id: "99",
      images: [],
      price: 1000,
      shortDescription: "Test",
      type: "flat",
      bedrooms: 1,
      postcode: "X",
    };

    const onAddFavourite = jest.fn();

    render(
      <MemoryRouter>
        <PropertyCard property={property} isFav={false} onAddFavourite={onAddFavourite} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /add favourite/i }));
    expect(onAddFavourite).toHaveBeenCalledWith("99");
  });

  test("dragStart sets text/plain id", () => {
    const property = {
      id: "99",
      images: [],
      price: 1000,
      shortDescription: "",
      type: "flat",
      bedrooms: 1,
      postcode: "X",
    };

    render(
      <MemoryRouter>
        <PropertyCard property={property} isFav={false} onAddFavourite={jest.fn()} />
      </MemoryRouter>
    );

    const card = document.querySelector(".pCard");
    expect(card).toBeTruthy();

    const dt = makeDataTransfer();
    fireEvent.dragStart(card, { dataTransfer: dt });

    expect(dt.getData("text/plain")).toBe("99");
  });

  test("button is disabled when already favourite", () => {
    const property = {
      id: "1",
      images: [],
      price: 1000,
      shortDescription: "X",
      type: "house",
      bedrooms: 2,
      postcode: "CMB",
    };

    render(
      <MemoryRouter>
        <PropertyCard property={property} isFav={true} onAddFavourite={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /saved/i })).toBeDisabled();
  });
});
