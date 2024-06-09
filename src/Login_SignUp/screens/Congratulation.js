import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, Text, Image} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import {IMG_emojione_fireworks} from '../assets/images/index.js';
import CustomButton from '../components/Buttons/CustomButton.js';

const Congratulation = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerCenter}>
        <Image
          source={IMG_emojione_fireworks}
          style={{width: '60%', height: '60%', resizeMode: 'contain'}}
        />

        <View style={styles.textView}>
          <Text style={styles.topText}>Chức mừng!</Text>
          <Text style={styles.botText}>Tài khoản của bạn đã kích hoạt</Text>
        </View>
      </View>

      <View style={styles.containerBot}>
        <View style={styles.button}>
          <CustomButton
            type="primary"
            text="Continue"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </View>
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
    fontSize: 15,
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
export default Congratulation;
