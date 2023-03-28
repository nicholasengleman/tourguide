import { CheckBox, IndexPath, Layout, Text } from '@ui-kitten/components';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import CityTile from '../components/CityTile';
import Carousel from 'react-native-reanimated-carousel';

const HomeScreen = () => {
  const width = Dimensions.get('window').width;
  return (
    <SafeAreaView style={styles.main}>
      <Layout style={styles.layoutContainer}>
        <Text category='h3' style={styles.marginBottom}>
          Where do you want to go?
        </Text>
        <Text category='h6' style={styles.marginBottom}>
          Popular Travel
        </Text>
        <Carousel
          width={width}
          height={300}
          mode='parallax'
          modeConfig={{
            parallaxScrollingOffset: 120,
            parallaxScrollingScale: 0.9,
          }}
          autoPlay={false}
          pagingEnabled={false}
          data={[...new Array(6).keys()]}
          renderItem={({ index }) => <CityTile />}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  layoutContainer: {
    height: '100%',
    padding: 15,
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default HomeScreen;
