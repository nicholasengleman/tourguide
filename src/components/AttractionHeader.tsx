import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CustomHeader = ({ title, parentQuestion, fetchAnswer }) => (
  <SafeAreaView>
    <View style={styles.headerContent}>
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
              color='#d6d2d2'
              style={{ marginRight: 10 }}
            />
            <Text style={styles.headerText}>{title}</Text>
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
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
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
  },
});

export default CustomHeader;
