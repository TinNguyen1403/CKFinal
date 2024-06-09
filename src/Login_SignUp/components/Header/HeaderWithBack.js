import React from 'react';
import {View, StyleSheet} from 'react-native';
import PreviousButton from '../Buttons/PreviousButton.js';

const HeaderWithBack = props => {
  return (
    <View style={styles.header}>
      <View style={styles.buttonContainer}>
        <PreviousButton onPress={props.onPress}> </PreviousButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '12%',
    height: '100%',
    top: '15%',
    left: '8%',
  },
});
export default HeaderWithBack;
