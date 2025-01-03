import React from "react";
import { render } from "./../../test-utils";
import LandMarkTile from "./LandmarkTile";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("LandmarkTile Component", () => {
  const defaultProps = {
    city: "Rome",
    image:
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80",
    name: "Colosseum",
  };

  it("renders all components correctly", () => {
    const { getByText } = render(<LandMarkTile {...defaultProps} />);
    expect(getByText("Colosseum")).toBeTruthy();
  });
});
