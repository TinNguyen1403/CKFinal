import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import {IMG_mditickcircle} from '../assets/images/index.js';
import CustomButton from '../components/Buttons/CustomButton.js';
import {IMG_Rectangle182} from '../assets/images/index.js';

const Done = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_Rectangle182}
        resizeMode="cover"
        style={styles.container}>
        <View style={styles.containerCenter}>
          <Image
            source={IMG_mditickcircle}
            style={{width: '60%', height: '60%', resizeMode: 'contain'}}
          />
          <View style={{width: '100%', height: 5}} />
          <View style={styles.textView}>
            <Text style={styles.topText}>Hoàn Thành!</Text>
            <View style={{width: '100%', height: 5}} />
            <Text style={styles.botText}>
              Mật khẩu đã được gửi đến Email của bạn.
            </Text>
            <View style={{width: '100%', height: 3}} />
            <Text style={styles.botText}>
              Vui lòng kiểm tra email của bạn đặt lại mật khẩu.
            </Text>
          </View>
        </View>

        <View style={styles.containerBot}>
          <View style={styles.button}>
            <CustomButton
              type="primary"
              text="Xong"
              onPress={() => navigation.navigate('SignIn')}
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
  containerCenter: {
    width: '90%',
    height: '40%',
    top: '20%',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 30,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
  botText: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 17,
    color: CUSTOM_COLOR.Black,
  },
  containerBot: {
    width: '100%',
    height: '10%',
    bottom: '-40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
  },
});
export default Done;
