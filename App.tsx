import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import { useCallback } from "react";
import { View } from "react-native";
import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider } from "@ui-kitten/components";
import { RootNavStack } from "./src/components/Navigation/RootNavStack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </View>
  );
}
