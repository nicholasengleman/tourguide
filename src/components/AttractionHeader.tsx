import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CustomHeader = ({ title, parentQuestion, fetchAnswer }) => (
  <SafeAreaView>
    <View style={styles.headerContent}>
      <Text style={styles.headerText}>{title}</Text>
      {parentQuestion && (
        <Pressable
          onPress={() =>
            fetchAnswer({
              question: '',
              followUpQuestion: parentQuestion,
            })
          }
        >
          <View style={styles.iconTextWrapper}>
            <Ionicons
              name='arrow-back-circle-outline'
              size={30}
              color='#594c4c'
              style={{
                transform: [{ rotate: '90deg' }],
              }}
            />
          </View>
        </Pressable>
      )}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#d6d2d2',
    borderBottomWidth: 1,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#594c4c',
    marginLeft: 10,
  },
});

export default CustomHeader;
