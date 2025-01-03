import React from "react";
import { render } from "./../../test-utils";
import CityTile from "./CityTile";
import userEvent from "@testing-library/user-event";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

import data from "./../../../data";

describe("CityTile Component", () => {
  const defaultProps = {
    ...data[0],
  };

  it("renders all components correctly", () => {
    const { getByText } = render(<CityTile {...defaultProps} />);

    expect(getByText("Rome")).toBeTruthy();
    expect(
      getByText(
        /Rome, the capital city of Italy, boasts a rich history spanning/
      )
    ).toBeTruthy();
  });

  it("passes the correct image source to the Image component", () => {
    const { getByTestId } = render(<CityTile {...defaultProps} />);
    const image = getByTestId("city-tile-image");
    expect(image.props.source.uri).toBe(defaultProps.image);
  });
});
