import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  City: { cityId: number };
  Attraction: { name: string; city: string };
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
