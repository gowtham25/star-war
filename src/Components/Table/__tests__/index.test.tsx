import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableComponent from "../index";
import { MemoryRouter } from "react-router-dom";

// Mock context and useNavigate
const mockNavigate = jest.fn();
let mockHandleUpdateGender: any;

jest.mock("../../../context/SkyWarContext", () => {
  const React = require("react");
  mockHandleUpdateGender = jest.fn();
  return {
    __esModule: true,
    SkyWarContext: React.createContext({
      handleUpdateGender: mockHandleUpdateGender,
    }),
    mockHandleUpdateGender, // export it so you can access in tests
  };
});

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("TableComponent", () => {
  const mockData = [
    {
      uid: "1",
      name: "Luke Skywalker",
      gender: "male",
      height: "172",
      homeworld: "planet1",
      isFavourite: true,
      url: "url1",
      hair_color: "blond",
      eye_color: "blue",
      films: [],
      starships: [],
    },
  ];

  const mockPlanetMemo = { planet1: "Tatooine" };
  const mockSetCurrentPage = jest.fn();
  const mockToggleFavourite = jest.fn();

  const renderComponent = (overrides = {}) =>
    render(
      <MemoryRouter>
        <TableComponent
          data={mockData}
          isLoading={false}
          planetIsLoading={false}
          planetMemo={mockPlanetMemo}
          currentPage={1}
          totalPages={2}
          setCurrentPage={mockSetCurrentPage}
          errorMessage=""
          toggleFavourite={mockToggleFavourite}
          favourite={{ "1": mockData[0] }}
          possibleGender={["male", "female", "n/a"]}
          {...overrides}
        />
      </MemoryRouter>
    );

  it("renders character data", () => {
    renderComponent();
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByDisplayValue("male")).toBeInTheDocument();
  });

  it("calls toggleFavourite when star is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("★"));
    expect(mockToggleFavourite).toHaveBeenCalled();
  });

  it("calls handleUpdateGender on gender change", async () => {
    renderComponent();
    await fireEvent.change(screen.getByDisplayValue("male"), {
      target: { value: "female" },
    });
    expect(mockHandleUpdateGender).toHaveBeenCalled();
  });

  it("displays skeletons when loading", () => {
    renderComponent({ isLoading: true });
    expect(screen.getAllByRole("row")).toHaveLength(12);
  });

  it("displays error message if present", () => {
    const errorMsg = "Failed to load data";
    renderComponent({ errorMessage: errorMsg });
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  it("shows no data message when appropriate", () => {
    renderComponent({ data: [], isLoading: false, planetIsLoading: false });
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("shows and clicks load more button", () => {
    renderComponent();
    const btn = screen.getByText("Load More");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("navigates to details on row click", () => {
    renderComponent();
    const row = screen.getByText("Luke Skywalker").closest("tr");
    fireEvent.click(row!);
    expect(mockNavigate).toHaveBeenCalledWith("/details/people/1");
  });
});
