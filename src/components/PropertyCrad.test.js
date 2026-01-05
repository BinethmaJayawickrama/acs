import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FavouritesPanel from "./FavouritesPanel";

function makeDataTransfer(id = "") {
  const store = { "text/plain": id, text: id };
  return {
    setData: (k, v) => (store[k] = String(v)),
    getData: (k) => store[k] || "",
    effectAllowed: "",
    dropEffect: "",
  };
}

describe("FavouritesPanel", () => {
  test("renders dropzone and remove zone", () => {
    render(
      <MemoryRouter>
        <FavouritesPanel
          properties={[]}
          favIds={[]}
          onRemoveFavourite={jest.fn()}
          onClear={jest.fn()}
          onDropFavourite={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId("fav-dropzone")).toBeInTheDocument();
    expect(screen.getByText(/remove zone/i)).toBeInTheDocument();
  });

  test("dropping id on add zone calls onDropFavourite", () => {
    const onDropFavourite = jest.fn();

    render(
      <MemoryRouter>
        <FavouritesPanel
          properties={[]}
          favIds={[]}
          onRemoveFavourite={jest.fn()}
          onClear={jest.fn()}
          onDropFavourite={onDropFavourite}
        />
      </MemoryRouter>
    );

    const dz = screen.getByTestId("fav-dropzone");
    const dt = makeDataTransfer("p1");

    fireEvent.dragOver(dz, { dataTransfer: dt });
    fireEvent.drop(dz, { dataTransfer: dt });

    expect(onDropFavourite).toHaveBeenCalledWith("p1");
  });

  test("dropping id on remove zone calls onRemoveFavourite", () => {
    const onRemoveFavourite = jest.fn();

    render(
      <MemoryRouter>
        <FavouritesPanel
          properties={[]}
          favIds={[]}
          onRemoveFavourite={onRemoveFavourite}
          onClear={jest.fn()}
          onDropFavourite={jest.fn()}
        />
      </MemoryRouter>
    );

    const rz = screen.getByText(/remove zone/i);
    const dt = makeDataTransfer("p2");

    fireEvent.dragOver(rz, { dataTransfer: dt });
    fireEvent.drop(rz, { dataTransfer: dt });

    expect(onRemoveFavourite).toHaveBeenCalledWith("p2");
  });
});
