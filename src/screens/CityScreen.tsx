import { Image, StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import data from '../../data';
import LandMarkTile from '../components/LandmarkTile';

const CityScreen = ({ route }) => {
  const cityId = route.params.cityId;

  const city = data.find((city) => city.cityId === cityId);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.main}>
        <Text style={styles.cityName} category='h3'>
          {city?.cityName}
        </Text>
        <Text style={styles.description}>
          Select a popular landmark or search for a new one.
        </Text>
        <FlatList
          data={city?.landmarks}
          numColumns={2}
          renderItem={({ item }) => (
            <LandMarkTile {...item} city={city.cityName} />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    marginBottom: 20,
    fontSize: 12,
    textAlign: 'center',
  },
  cityName: {
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CityScreen;
