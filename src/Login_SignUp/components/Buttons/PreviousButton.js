import React from 'react';
import {IC_previous} from '../../assets/icons/index.js';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import CUSTOM_COLOR from '../../constants/colors.js';

class PreviousButton extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image source={IC_previous} style={{resizeMode: 'contain'}} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default PreviousButton;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // borderRadius: 50,
    // borderWidth: 1,
    // borderColor: CUSTOM_COLOR.Black,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: CUSTOM_COLOR.Mercury,
  },
});
