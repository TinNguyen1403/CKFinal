import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import HeaderWithBack from '../components/Header/HeaderWithBack.js';
import HeaderTitlle from '../components/Header/HeaderTitlle.js';
import HederContent from '../components/Header/HederContent.js';
import TextInputCard from '../components/Cards/TextInputCard.js';
import CustomButton from '../components/Buttons/CustomButton.js';
import {firebase} from '../../../Firebase/firebase.js';
import {IMG_Rectangle182} from '../assets/images/index.js';

const ForgotPassword = props => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const fogotPassword = email => {
    firebase
      .auth()
      // .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .sendPasswordResetEmail(email)
      .then(() => {
        navigation.navigate('Done');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_Rectangle182}
        resizeMode="cover"
        style={styles.container}>
        <View style={{width: '100%', height: 20}} />
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={[styles.topContainer, styles.unitContainer]}>
          <HeaderTitlle title="Quên mật khẩu" />
          {/* <HederContent content="Fill some Personal Information" /> */}
        </View>

        <View style={{width: '100%', height: '10%'}} />

        <View style={[styles.centerContainer, styles.unitContainer]}>
          <TextInputCard
            title="Nhập email của bạn"
            txtInput="abc@gmail.com"
            onChangeText={email => setEmail(email)}
            keyboardType="email-address"
          />
        </View>

        <View style={{width: '100%', height: '5%'}} />

        <View style={[styles.botContainer, styles.unitContainer]}>
          <View
            style={{
              width: '200%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              left: '-50%',
            }}>
            <CustomButton
              type="primary"
              text="Tiếp tục"
              onPress={() => {
                fogotPassword(email);
                // onPress={() => navigation.navigate('SmartOTP')}
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  unitContainer: {
    width: '80%',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
  topContainer: {
    height: 60,
  },
  centerContainer: {
    height: 110,
  },
  botContainer: {
    height: 65,
  },
  italicText: {
    fontFamily: FONT_FAMILY.MediumItalic,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
    fontStyle: 'italic',
  },
});
export default ForgotPassword;
