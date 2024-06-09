import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import FONT_FAMILY from '../../Login_SignUp/constants/fonts';
import CUSTOM_COLOR from '../../Login_SignUp/constants/colors';
import {
  IC_visibility1,
  IC_visibility,
} from '../../Login_SignUp/assets/icons/index';

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
              width: '100%',
              height: '100%',
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
