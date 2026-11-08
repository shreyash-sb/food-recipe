import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalState from "./context";

// Mock window.scrollTo
beforeAll(() => {
  window.scrollTo = jest.fn();
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    };
});

test("renders FlavorCraft Studio branding and navigation links", () => {
  render(
    <BrowserRouter>
      <GlobalState>
        <App />
      </GlobalState>
    </BrowserRouter>
  );

  // Brand title check
  const brandElements = screen.getAllByText(/Flavor/i);
  expect(brandElements.length).toBeGreaterThan(0);

  // Navigation check
  const homeLinks = screen.getAllByText(/Home/i);
  expect(homeLinks.length).toBeGreaterThan(0);

  const favoriteLinks = screen.getAllByText(/Favorites/i);
  expect(favoriteLinks.length).toBeGreaterThan(0);

  // Search input check
  const searchInputs = screen.getAllByPlaceholderText(/Search/i);
  expect(searchInputs.length).toBeGreaterThan(0);
});
