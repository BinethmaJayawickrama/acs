// src/App.test.js
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders home page hero text", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  // Use the unique hero heading instead of 'RentReady'
  expect(
    screen.getByRole("heading", { name: /Find your next home, faster\./i })
  ).toBeInTheDocument();
});
