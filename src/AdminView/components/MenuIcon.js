import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

const MenuIcon = props => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={props.onPress}>
      <Image
        style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
        source={props.source}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MenuIcon;
