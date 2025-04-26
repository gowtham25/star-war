// Home.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../Home";
import { SkyWarContext } from "../../context/SkyWarContext";

jest.mock("../../Components/Table/index.tsx", () => () => (
  <div>TableComponent</div>
));

const mockContext = {
  getSkyWarCharacterList: jest.fn().mockResolvedValue([]),
  getOtherProperties: jest.fn(),
  charactersList: {},
  isLoading: false,
  planetMemo: {},
  planetIsLoading: false,
  setCurrentPage: jest.fn(),
  currentPage: 1,
  totalPages: 5,
  getExtractDetails: jest.fn(),
  errorMessage: "",
  setIsLoading: jest.fn(),
  handleFavourite: jest.fn(),
  favourite: {},
  possibleGender: [],
};

describe("Home", () => {
  it("renders search input and TableComponent", async () => {
    render(
      <SkyWarContext.Provider value={mockContext as any}>
        <Home />
      </SkyWarContext.Provider>
    );

    expect(
      await screen.findByPlaceholderText("Search by name...")
    ).toBeInTheDocument();
    expect(screen.getByText("Mocked Table")).toBeInTheDocument();
  });

  it("calls setSearchQuery and setCurrentPage on search", async () => {
    render(
      <SkyWarContext.Provider value={mockContext as any}>
        <Home />
      </SkyWarContext.Provider>
    );

    const input = screen.getByPlaceholderText("Search by name...");

    fireEvent.change(input, { target: { value: "luke" } });

    await waitFor(() => {
      expect(mockContext.setCurrentPage).toHaveBeenCalledWith(1);
    });
  });

  it("handles failed API and rolls back page", async () => {
    const failingContext = {
      ...mockContext,
      getSkyWarCharacterList: jest.fn().mockRejectedValue(new Error("Failed")),
      currentPage: 2,
    };

    render(
      <SkyWarContext.Provider value={failingContext as any}>
        <Home />
      </SkyWarContext.Provider>
    );

    await waitFor(() => {
      expect(failingContext.setIsLoading).toHaveBeenCalledWith(false);
      expect(failingContext.setCurrentPage).toHaveBeenCalledWith(1);
    });
  });
});
