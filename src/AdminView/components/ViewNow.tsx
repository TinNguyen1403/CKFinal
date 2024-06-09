import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CUSTOM_COLOR from '../constants/colors';
const ViewNow = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text>+{props.number}</Text>
        <Text>{props.status}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: CUSTOM_COLOR.LightGray,
    width: 70,
    height: 70,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ViewNow;
