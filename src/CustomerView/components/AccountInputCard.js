import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import CUSTOM_COLOR from '../constants/colors';
import FONT_FAMILY from '../constants/fonts';

const AccountInputCard = props => {
  <View style={styles.inputContainer}>
    <View style={{width: '100%', height: 10}} />
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={[styles.unitTitleContainer, {justifyContent: 'flex-start'}]}>
        <View style={{width: '10%', height: '100%'}} />
        <Text style={styles.titleInputStyle}>{props.title}</Text>
        <Text style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
          {' '}
          *
        </Text>
      </View>
      <View style={[styles.unitTitleContainer, {justifyContent: 'flex-end'}]}>
        <Text style={styles.titleInputStyle}>{props.count}</Text>
        <View style={{width: '10%', height: '100%'}} />
      </View>
    </View>
    <View style={{flex: 2, flexDirection: 'row'}}>
      <View style={{width: '5%', height: '100%'}} />
      <TextInput
        style={{flex: 1, fontSize: 17}}
        onChangeText={props.onChangeText}
        value={props.name}
      />
      <View style={{width: '5%', height: '100%'}} />
    </View>
  </View>;
};
const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: '100%',
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'column',
    backgroundColor: 'red',
  },
  unitTitleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleInputStyle: {},
});
export default AccountInputCard;
