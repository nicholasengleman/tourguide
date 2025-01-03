import { render } from "@testing-library/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

const AllTheProviders = ({ children }) => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <GestureHandlerRootView>{children}</GestureHandlerRootView>
    </ApplicationProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
