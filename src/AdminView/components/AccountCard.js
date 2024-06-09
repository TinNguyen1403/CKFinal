import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {IM_AnhGiay1} from '../../CustomerView/assets/images';
import CUSTOM_COLOR from '../constants/colors';
import FONT_FAMILY from '../constants/fonts';

const AccountCard = props => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <View style={styles.avataContainer}>
          <Image
            source={props.source}
            style={{
              width: '100%',
              height: '100%',
              aspectRatio: 1,
              borderRadius: 50,
              resizeMode: 'center',
              borderWidth: 1,
              borderColor: CUSTOM_COLOR.Black,
            }}
          />
        </View>
        <View style={styles.textViewContainer}>
          <Text style={styles.textViewStyles}>{props.name}</Text>
          <View style={{width: '100%', height: 5}} />
          <Text style={styles.textViewStyles}>{props.userType}</Text>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={{color: CUSTOM_COLOR.White}} onPress={props.onPress}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: CUSTOM_COLOR.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountContainer: {
    width: '95%',
    height: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: CUSTOM_COLOR.LightGray,
    borderWidth: 1,
    borderRadius: 5,
  },
  avataContainer: {
    width: '33%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    left: -15,
  },
  textViewContainer: {
    width: '50%',
    height: '100%',
    left: -25,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textViewStyles: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 15,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
  },
  buttonContainer: {
    width: '20%',
    height: '50%',
    left: -20,
    borderColor: CUSTOM_COLOR.FlushOrange,
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountCard;
