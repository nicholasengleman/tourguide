import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import CityScreen from "../../screens/CityScreen/CityScreen";
import AttractionScreen from "../../screens/AttractionScreen/AttractionScreen";
import { RootStackParamList } from "../../routes";

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavStack = () => {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen name="City" component={CityScreen} />
      <RootStack.Screen name="Attraction" component={AttractionScreen} />
    </RootStack.Navigator>
  );
};
