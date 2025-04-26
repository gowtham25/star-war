// SkywarRoutes.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SkywarRoutes from "../SkywarRoutes";

jest.mock("../../pages/Home", () => () => <div>Home Page</div>);
jest.mock("../../pages/Favourite", () => () => <div>Favourite Page</div>);
jest.mock("../../pages/Details", () => () => <div>Details Page</div>);
jest.mock("../../Components/Header", () => () => <div>Header</div>);

describe("SkywarRoutes", () => {
  it("renders Header and Home page by default", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <SkywarRoutes />
      </MemoryRouter>
    );
    expect(getByText("Header")).toBeInTheDocument();
    expect(getByText("Home Page")).toBeInTheDocument();
  });

  it("renders Favourite page", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/favourite"]}>
        <SkywarRoutes />
      </MemoryRouter>
    );
    expect(getByText("Favourite Page")).toBeInTheDocument();
  });

  it("renders Details page", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/details/people/1"]}>
        <SkywarRoutes />
      </MemoryRouter>
    );
    expect(getByText("Details Page")).toBeInTheDocument();
  });
});
