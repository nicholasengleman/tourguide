import { Layout, Text } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import CityTile from "./../../components/CityTile/CityTile";
import Carousel from "react-native-reanimated-carousel";
import data from "../../../data";

type Landmark = {
  name: string;
  image: string;
};

type City = {
  cityId: number;
  cityName: string;
  cityDescription: string;
  country: string;
  image: string;
  landmarks: Landmark[];
};

const cityData: City[] = data as City[];

const HomeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView>
      <Layout>
        <Text category="h3">What city do you want to tour?</Text>
        {/* <Text category='h6'>Search</Text> */}
        {/* <View style={styles.regionContainer}>
          <Button text='Europe' number={5} />
          <Button text='Asia' number={5} />
          <Button text='South America' number={5} />
          <Button text='North America' number={5} />
        </View> */}
        <Carousel
          width={width}
          height={600}
          mode="parallax"
          modeConfig={{
            parallaxScrollingOffset: 120,
            parallaxScrollingScale: 0.9,
          }}
          autoPlay={false}
          pagingEnabled={false}
          data={cityData}
          renderItem={({ item }: { item: City }) => <CityTile {...item} />}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  layoutContainer: {
    height: "100%",
    padding: 15,
    backgroundColor: "#91fbe4",
  },
  header: {
    color: "#000",
    fontFamily: "Roboto-Bold",
  },
  regionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});

export default HomeScreen;
