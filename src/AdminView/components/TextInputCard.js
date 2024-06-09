import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import FONT_FAMILY from '../../Login_SignUp/constants/fonts';
import CUSTOM_COLOR from '../../Login_SignUp/constants/colors';

const TextInputCard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{props.title}</Text>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textinputStyle}
          placeholder={props.txtInput}
          // placeholderTextColor='CUSTOM_COLOR.Black'
          onChangeText={props.onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={props.keyboardType}
          value={props.value}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  titleStyle: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 20,
    color: CUSTOM_COLOR.Black,
    left: '5%',
  },
  textInputContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: CUSTOM_COLOR.White,
    borderColor: CUSTOM_COLOR.Alto,
    borderWidth: 1,
    borderRadius: 40,
    flexDirection: 'row',
  },
  textinputStyle: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
    left: '25%',
    justifyContent: 'center',
  },
});
export default TextInputCard;
