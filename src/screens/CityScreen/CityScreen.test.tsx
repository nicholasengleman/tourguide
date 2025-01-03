import React from "react";
import { render } from "../../test-utils";
import CityScreen from "./CityScreen";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("<CityScreen />", () => {
  const defaultProps = {
    route: {
      params: {
        cityId: 5,
      },
    },
  };
  it("renders city screen text", () => {
    const { getByText, debug } = render(<CityScreen {...defaultProps} />);
    expect(getByText(/Select a popular landmark/)).toBeTruthy();
  });
});
