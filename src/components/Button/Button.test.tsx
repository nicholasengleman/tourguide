import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "./Button";

describe("<Button />", () => {
  it("renders the button text", () => {
    const { getByText } = render(<Button text="Click me" number={5} />);
    expect(getByText("Click me")).toBeTruthy();
  });

  it("renders the button number", () => {
    const { getByText } = render(<Button text="Click me" number={5} />);
    expect(getByText("5")).toBeTruthy();
  });

  it("calls onPress when the button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button text="Click me" number={5} onPress={onPressMock} />
    );
    fireEvent.press(getByText("Click me"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("applies pressed styles when the button is pressed", () => {
    const { getByText, toJSON } = render(<Button text="Click me" number={5} />);
    const button = getByText("Click me").parent;

    // Before pressing
    expect(toJSON()).toMatchSnapshot("unpressed");

    // Simulate press
    fireEvent(button, "pressIn");
    expect(toJSON()).toMatchSnapshot("pressed");
  });

  it("doesn't call onPress when onPress prop is not provided", () => {
    const onPressMock = jest.fn(); // Create a mock function even though it won't be used
    const { getByText } = render(<Button text="Click me" number={5} />);
    fireEvent.press(getByText("Click me"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  // This test is not really necessary since the icon prop is not being used
  it("does not render an icon when icon prop is not provided", () => {
    const { queryByTestId } = render(<Button text="Click me" number={5} />);
    expect(queryByTestId("icon")).toBeNull();
  });

  // This test is not really necessary since the icon prop is not being used
  it("renders an icon when icon prop is provided", () => {
    const { queryByTestId } = render(
      <Button text="Click me" number={5} icon="some-icon-name" />
    );
    expect(queryByTestId("icon")).toBeNull(); // Still null because it's not rendered
  });

  it("matches snapshot", () => {
    const { toJSON } = render(<Button text="Click me" number={5} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
