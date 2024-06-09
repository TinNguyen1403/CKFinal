import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../components/Buttons/CustomButton.js';
import HeaderWithBack from '../components/Header/HeaderWithBack.js';
import HeaderTitlle from '../components/Header/HeaderTitlle.js';
import HederContent from '../components/Header/HederContent.js';
import OTPCard from '../components/Cards/OTPCard.js';
import {IMG_Rectangle182} from '../assets/images/index.js';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import {firebaseApp} from '../../../Firebase/firebase.js';

const SmartOTP = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_Rectangle182}
        resizeMode="cover"
        style={styles.container}>
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={[styles.unitContainer, {height: '5%'}]}>
          <HeaderTitlle title="Smart OTP" />
        </View>
        <View style={[styles.topContainer, styles.unitContainer]}>
          <HederContent content="Vui lòng kiểm tra điện thoại và nhập mã xác minh chúng tôi gửi tới 0785******" />
        </View>

        <View style={{width: '100%', height: '8%', top: '8%'}}>
          <OTPCard />
        </View>

        <View style={styles.centerContainer}>
          <View
            style={{flex: 3, justifyContent: 'center', alignItems: 'flex-end'}}>
            <HederContent content="You don’t receive the code?  " />
          </View>

          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity>
              <Text style={styles.resendStyles}>Gửi lại (After 2:00)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerBot}>
          <View style={styles.button}>
            <CustomButton
              type="primary"
              text="Continue"
              onPress={() => {
                navigation.navigate('SignIn');
                console.log(firebaseApp);
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
  },
  unitContainer: {
    width: '80%',
    marginHorizontal: '10%',
    justifyContent: 'center',
    top: '5%',
  },
  topContainer: {
    height: '8%',
    alignItems: 'center',
  },
  centerContainer: {
    width: '90%',
    height: '5%',
    top: '15%',
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  containerBot: {
    width: '100%',
    height: '10%',
    bottom: '-45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
  },
  resendStyles: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.Light,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
});
export default SmartOTP;
