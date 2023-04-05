import { View, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../routes';
import { Text } from '@ui-kitten/components';

interface LandmarkTileProps {
  name: string;
  image: string;
  onPress: () => void;
}

const LandMarkTile: React.FC<LandmarkTileProps> = ({ name, image }) => {
  const navigation = useNavigation<NavigationProps>();

  const onPress = () => {
    navigation.navigate('Attraction', { name });
  };

  return (
    <Pressable style={styles.tile} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode='cover'
            source={{ uri: image }}
            style={styles.image}
          />
        </View>
        <View style={styles.textContent}>
          <Text style={styles.cityName}>{name}</Text>
        </View>
      </View>
    </Pressable>
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
