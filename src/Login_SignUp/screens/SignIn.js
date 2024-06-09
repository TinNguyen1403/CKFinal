import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import HeaderWithBack from '../components/Header/HeaderWithBack.js';
import CustomButton from '../components/Buttons/CustomButton.js';
import TextInputCard from '../components/Cards/TextInputCard.js';
import PasswordCard from '../components/Cards/PasswordCard.js';
import HeaderTitlle from '../components/Header/HeaderTitlle.js';
import HederContent from '../components/Header/HederContent.js';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import {firebase, Firestore} from '../../../Firebase/firebase.js';
import {doc, getDoc} from 'firebase/firestore';
import {IMG_Rectangle182} from '../assets/images/index.js';

const SignIn = props => {
  const {navigation} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (email, password) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully!', response.user.uid);
    } catch (error) {
      console.log('Error signing in:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = email => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = password => {
    // Password validation criteria
    // Add your own password validation logic here
    return password.length >= 8;
  };

  const isValidForm = (email, password) => {
    let isValid = true;

    if (email === '' && password === '') {
      isValid = false;
      setErrorMessage('Please enter your information then click sign in');
    } else if (email === '') {
      isValid = false;
      setErrorMessage('Please enter your email');
    } else if (password === '') {
      isValid = false;
      setErrorMessage('Please enter your password');
    } else if (!isValidEmail(email)) {
      isValid = false;
      setErrorMessage('Your email is not valid');
    } else if (!isValidPassword(password)) {
      isValid = false;
      setErrorMessage('Your password must be longer than 8 characters');
    }
    return isValid;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_Rectangle182}
        resizeMode="cover"
        style={styles.container}>
        <View style={{width: '100%', height: 10}} />
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={[styles.unitContainer, {height: 50}]}>
          <HeaderTitlle title="Đăng nhập" />
        </View>

        <View style={{width: '100%', height: '5%'}} />

        <View style={[styles.unitContainer, styles.bodyContainer]}>
          <View style={{width: '100%', height: 110}}>
            <TextInputCard
              title="Email*"
              txtInput="abc@gmail.com"
              onChangeText={email => setEmail(email)}
              keyboardType="email-address"
            />
          </View>

          <View style={{width: '100%', height: 110}}>
            <PasswordCard
              title="Mật khẩu*"
              txtInput="********"
              onChangeText={password => setPassword(password)}
            />
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.contentStyle}>Quên mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>

        <>
          <View style={{width: '80%', height: 65, marginHorizontal: '10%'}}>
            <View style={styles.buttonContainer}>
              <CustomButton
                type="primary"
                text="Đăng nhập"
                onPress={() => {
                  if (isValidForm(email, password)) {
                    loginUser(email, password);
                  } else {
                    Alert.alert('Error', errorMessage);
                  }
                }}
              />
            </View>
          </View>
        </>

        <View style={[styles.unitContainer, styles.botContainer]}>
          <View
            style={{flex: 5, justifyContent: 'center', alignItems: 'flex-end'}}>
            <HederContent content="Bạn chưa có tài khoản ? " />
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.contentStyle}>Đăng ký</Text>
            </TouchableOpacity>
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
  },
  bodyContainer: {
    height: 270,
    flexDirection: 'column',
  },
  containerBot: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '200%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-50%',
  },
  botContainer: {
    height: '5%',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  contentStyle: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
});
export default SignIn;
