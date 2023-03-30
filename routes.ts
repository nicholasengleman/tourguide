import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  City: { cityId: number };
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
