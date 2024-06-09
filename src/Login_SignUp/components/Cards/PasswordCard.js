import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';
import {IC_visibility1, IC_visibility} from '../../assets/icons/index.js';

const PasswordCard = props => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <View style={styles.textInputContainer}>
        <View style={{flex: 5}}>
          <TextInput
            style={styles.textinputStyle}
            placeholder={props.txtInput}
            // placeholderTextColor='CUSTOM_COLOR.Black'
            secureTextEntry={!isPasswordVisible}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={props.onChangeText}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: '80%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={togglePasswordVisibility}>
            <Image
              style={styles.iconStyle}
              source={isPasswordVisible ? IC_visibility : IC_visibility1}
            />
          </TouchableOpacity>

          {/* <Image
            source={IC_visibility1}
            style={{width: '60%', height: '60%', resizeMode: 'contain'}}
          /> */}
        </View>
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
    backgroundColor: CUSTOM_COLOR.Alto,
    borderRadius: 40,
    flexDirection: 'row',
  },
  textinputStyle: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
    left: '5%',
    justifyContent: 'center',
  },
  iconStyle: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
});
export default PasswordCard;
