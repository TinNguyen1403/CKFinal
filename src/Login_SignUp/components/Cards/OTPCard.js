import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';

const OTPCard = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 2}} />

      <View style={{flex: 2}}>
        <TextInput style={styles.txtInput} />
      </View>

      <View style={{flex: 1}}></View>

      <View style={{flex: 2}}>
        <TextInput style={styles.txtInput}></TextInput>
      </View>

      <View style={{flex: 1}}></View>

      <View style={{flex: 2}}>
        <TextInput style={styles.txtInput}></TextInput>
      </View>

      <View style={{flex: 1}}></View>

      <View style={{flex: 2}}>
        <TextInput style={styles.txtInput}></TextInput>
      </View>

      <View style={{flex: 2}}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtInput: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 20,
    color: CUSTOM_COLOR.White,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.White,
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});
export default OTPCard;
