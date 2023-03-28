import { View, Text, StyleSheet } from 'react-native';

interface PriceProps {
  price: string;
}

const Price: React.FC<PriceProps> = ({ price }) => {
  return (
    <View style={styles.priceContainer}>
      <Text style={styles.priceText}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    width: 80,
    height: 35,
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  priceText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Price;
