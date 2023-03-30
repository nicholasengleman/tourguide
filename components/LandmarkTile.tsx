import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

interface LandmarkTileProps {
  name: string;
  image: string;
}

const LandMarkTile: React.FC<LandmarkTileProps> = ({ name, image }) => {
  return (
    <View style={styles.tile}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode='cover'
            source={{ uri: image }}
            style={styles.image}
          />
        </View>
        <View style={styles.textContent}>
          <Text style={styles.cityName} category='p'>
            {name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: '45%',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    margin: 10,
  },
  content: {
    width: '100%',
    borderRadius: 20,
    borderColor: 'lightgrey',
    borderWidth: 5,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 100,
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    padding: 5,
  },
  cityName: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default LandMarkTile;
