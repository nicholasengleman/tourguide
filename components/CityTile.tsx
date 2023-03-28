import { Text } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Price from './Price';

const CityTile = () => {
  return (
    <View style={styles.tile}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode='cover'
            source={require('./../assets/images/travel.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles.textContent}>
          <Text style={{ marginBottom: 10 }}>
            Travel Guide to the Hanging Monestary in China
          </Text>
          <View style={styles.textContentFooter}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name='place' size={12} color='black' />
              <Text style={styles.locationText}>East Asian China</Text>
            </View>

            <Price price='$88.99' />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 300,
    borderRadius: 20,
    borderColor: 'lightgrey',
    borderWidth: 10,
  },
  content: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    padding: 10,
  },
  textContentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 10,
    marginLeft: 5,
    color: 'grey',
  },
});

export default CityTile;
