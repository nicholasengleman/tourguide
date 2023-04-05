import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ButtonProps {
  text: string;
  number: number;
  icon?: string;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  number,
  onPress,
}) => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <Text>{text}</Text>
        <View style={styles.number}>
          <Text style={styles.numberText}>{number}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    fontFamily: 'Roboto-Regular',
  },
  buttonPressed: {
    backgroundColor: 'blue',
  },
  number: {
    color: 'black',
    backgroundColor: 'white',
    width: 23,
    height: 23,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    borderWidth: 2,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 5,
  },
  numberText: {
    fontFamily: 'Roboto-Bold',
  },
});
