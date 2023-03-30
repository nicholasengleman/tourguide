import { Text } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from './Button';
import { NavigationProps } from '../routes';

interface CityTileProps {
  image: string;
  cityName: string;
  cityDescription: string;
  country: string;
  cityId: number;
}

const CityTile: React.FC<CityTileProps> = ({
  image,
  cityName,
  cityDescription,
  country,
  cityId,
}) => {
  const navigation = useNavigation<NavigationProps>();

  const onPress = () => {
    navigation.navigate('City', { cityId });
  };

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
          <Text style={styles.cityName} category='h5'>
            {cityName}
          </Text>
          <Text style={styles.cityDescription}>{cityDescription}</Text>
          <View style={styles.textContentFooter}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name='place' size={12} color='black' />
              <Text style={styles.locationText}>{country}</Text>
            </View>

            <Button number={5} text='Landmarks' onPress={onPress} />
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
    borderColor: 'white',
    borderWidth: 1,
  },
  content: {
    width: '100%',
    borderRadius: 20,
    borderColor: 'lightgrey',
    borderWidth: 10,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    padding: 20,
  },
  cityName: {
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
  },
  cityDescription: {
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    lineHeight: 20,
  },
  textContentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  locationText: {
    fontSize: 12,
    marginLeft: 5,
    color: 'grey',
    fontFamily: 'Roboto-Regular',
  },
});

export default CityTile;
