import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CustomHeader = ({ title }) => (
  <SafeAreaView>
    <View style={styles.headerContent}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: '#d6d2d2',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#594c4c',
  },
});

export default CustomHeader;
