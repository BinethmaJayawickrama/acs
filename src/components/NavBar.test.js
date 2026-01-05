// src/components/NavBar.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

test("shows brand title and contact link", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  // Brand text
  expect(screen.getByText(/RentReady/i)).toBeInTheDocument();

  // "Contact Us" nav link
  expect(
    screen.getByRole("link", { name: /Contact Us/i })
  ).toBeInTheDocument();
});

test("shows favourites icon with badge", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  // Favourites link is identified by its accessible name from aria-label
  const favLink = screen.getByRole("link", { name: /Favourites/i });
  expect(favLink).toBeInTheDocument();

  // Badge showing count, initial length is 0
  expect(screen.getByText("0")).toBeInTheDocument();
});
