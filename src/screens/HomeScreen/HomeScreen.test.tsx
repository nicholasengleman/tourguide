import React from "react";
import { render } from "../../test-utils";
import HomeScreen from "./HomeScreen";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("<HomeScreen />", () => {
  it("renders the home screen text", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("What city do you want to tour?")).toBeTruthy();
  });
});
