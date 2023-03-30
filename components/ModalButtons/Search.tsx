import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Modal, Text } from '@ui-kitten/components';

export const Search = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Search?</Button>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      ></Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 16,
  },
  descriptionText: {
    textAlign: 'left',
    margin: 16,
  },
  icon: {
    width: 18,
    height: 18,
    margin: 4,
  },
  modalButton: {
    margin: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
