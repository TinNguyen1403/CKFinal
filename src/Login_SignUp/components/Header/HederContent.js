import React from 'react';
import {StyleSheet, Text} from 'react-native';
import FONT_FAMILY from '../../constants/fonts';
import CUSTOM_COLOR from '../../constants/colors';

const HederContent = props => {
  return <Text style={styles.contentView}>{props.content}</Text>;
};
const styles = StyleSheet.create({
  contentView: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
  },
});
export default HederContent;
