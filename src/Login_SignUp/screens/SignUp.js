import React, {useEffect, useState} from 'react';

import CheckBox from '@react-native-community/checkbox';

import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IMG_Rectangle182} from '../assets/images/index.js';
import CustomButton from '../components/Buttons/CustomButton.js';
import PasswordCard from '../components/Cards/PasswordCard.js';
import TextInputCard from '../components/Cards/TextInputCard.js';
import HeaderTitlle from '../components/Header/HeaderTitlle.js';
import HeaderWithBack from '../components/Header/HeaderWithBack.js';
import HederContent from '../components/Header/HederContent.js';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';

import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import {firebase, Firestore} from '../../../Firebase/firebase.js';

import DateTimePicker from '@react-native-community/datetimepicker';

const SignUp = props => {
  const {navigation} = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birth, setBirth] = useState('01/01/2023');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setuserType] = useState('customer');
  const [address, setAddress] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [avatar, setAvatar] = useState(
    'https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fusers%2FuserCustomer.png?alt=media&token=16225e3a-c284-4a14-bdc6-710ae891f34b',
  );

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const getCurrentDate = () => {
      const currentDate = date;
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        '/' +
        (tempDate.getMonth() + 1) +
        '/' +
        tempDate.getFullYear();

      console.log('Current date: ', fDate);
      setBirth(fDate);
    };

    getCurrentDate('');
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setToggleCheckBox(false);
  }, []);

  const handleDateChange = (event, selected) => {
    const currentDate = selected;
    setShowPicker(false);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    console.log('Date of birth: ', fDate);
    setBirth(fDate);
    setDate(selected);
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const isValidName = fullName => {
    if (fullName === '') {
      return false;
    }
    return true;
  };

  const isValidEmail = email => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = password => {
    // Password validation criteria
    // Add your own password validation logic here
    return password.length >= 8;
  };

  const [errorMessage, setErrorMessage] = useState('');

  const isValidForm = (
    fullName,
    email,
    password,
    corfirmPassword,
    toggleCheckBox,
  ) => {
    let isValid = true;

    if (
      fullName === '' &&
      email === '' &&
      password === '' &&
      corfirmPassword === ''
    ) {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Please enter your information then click sign up');
    } else if (fullName === '') {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Please enter your full name');
    } else if (email === '') {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Please enter your email');
    } else if (password === '') {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Please enter your password');
    } else if (!isValidEmail(email)) {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Your email is not valid');
    } else if (!isValidPassword(password)) {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Your password must be longer than 8 characters');
    } else if (password != corfirmPassword) {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Corfirm password not match with password');
    } else if (corfirmPassword === '') {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Please enter your corfirm password');
    } else if (!toggleCheckBox) {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Please check agree with policy');
    }

    setShowDialog(false);
    return isValid;
  };

  const signUp = async (
    fullName,
    email,
    phoneNumber,
    birth,
    password,
    userType,
    avatar,
    address,
  ) => {
    try {
      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('User registered successfully:', userCredentials.user);
      navigation.navigate('Congratulation');
      await firebase
        .firestore()
        .collection('NGUOIDUNG')
        .doc(userCredentials.user.uid)
        .set({
          TenND: fullName,
          Email: email,
          Phone: phoneNumber,
          NgaySinh: birth,
          MaND: userCredentials.user.uid,
          LoaiND: userType,
          Avatar: avatar,
          DiaChi: address,
        });
      console.log('Push data user successfully:', userCredentials.user.uid);
    } catch (error) {
      console.log('Error registering user: ', error);
      Alert.alert('Error', error.message);
    }

    const currentTime = new Date();
    const docRef = await addDoc(collection(Firestore, 'CHAT'), {
      MaND: firebase.auth().currentUser.uid,
      ThoiGian: Timestamp.fromDate(currentTime),
      SoLuongChuaDoc: 0,
      SoLuongChuaDocCuaCustomer: 0,
      MoiKhoiTao: true,
    });

    const updateRef = doc(Firestore, 'CHAT', docRef.id);
    await updateDoc(updateRef, {
      MaChat: docRef.id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_Rectangle182}
        resizeMode="cover"
        style={styles.container}>
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={[styles.topContainer, styles.unitContainer]}>
          <HeaderTitlle title="Đăng ký" />
        </View>
        <View style={[styles.bodyContainer, styles.unitContainer]}>
          <View style={{flex: 1}}>
            <TextInputCard
              title="Họ và tên*"
              txtInput="Nguyen Van A"
              // value={fullName}
              onChangeText={fullName => setFullName(fullName)}
            />
          </View>

          <View style={{flex: 1}}>
            <TextInputCard
              title="Email*"
              txtInput="abc@gmail.com"
              onChangeText={email => setEmail(email)}
              keyboardType="email-address"
              // value={email}
            />
          </View>

          <View style={{flex: 1}}>
            <TextInputCard
              title="Số điện thoại"
              txtInput="03333333333"
              // value={phoneNumber}
              onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.titleStyle}>Ngày sinh</Text>

            <View style={styles.dateContainer}>
              <TouchableOpacity
                style={styles.dateStyle}
                onPress={() => {
                  setShowPicker(true);
                }}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.Semibold,
                    fontSize: 15,
                    color: CUSTOM_COLOR.Black,
                    justifyContent: 'center',
                  }}>
                  {' '}
                  {birth}
                </Text>
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date" // Can be "date", "time", or "datetime"
                  display="spinner" // Can be "default", "spinner", or "calendar"
                  onChange={handleDateChange}
                />
              )}
            </View>
          </View>

          <View style={{flex: 1}}>
            <PasswordCard
              title="Mật khẩu*"
              txtInput="********"
              // value={password}
              onChangeText={password => setPassword(password)}
            />
          </View>

          <View style={{flex: 1}}>
            <PasswordCard
              title="Nhập lại mập khẩu*"
              txtInput="********"
              // value={confirmPassword}
              onChangeText={corfirmPassword =>
                setConfirmPassword(corfirmPassword)
              }
            />
          </View>

          <View style={[styles.checkContainer, styles.unitContainer]}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <HederContent content="I agree with this " />
            <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
              <Text style={styles.policyStyles}>Policy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerBot}>
            <View style={styles.button}>
              <CustomButton
                type="primary"
                text="Đăng ký"
                onPress={() => {
                  if (
                    isValidForm(
                      fullName,
                      email,
                      password,
                      confirmPassword,
                      toggleCheckBox,
                    )
                  ) {
                    signUp(
                      fullName,
                      email,
                      phoneNumber,
                      birth,
                      password,
                      userType,
                      avatar,
                      address,
                    );
                  } else {
                    Alert.alert('Error', errorMessage);
                  }
                }}
              />
            </View>
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
  topContainer: {
    height: 50,
    top: '-1%',
    left: '3%',
  },
  bodyContainer: {
    height: 570,
    top: '0%',
  },
  checkContainer: {
    height: '4%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  containerBot: {
    width: '100%',
    height: 55,
    // marginHorizontal: '10%',
    marginTop: 10,
  },
  button: {
    width: '200%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-50%',
  },
  policyStyles: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.Light,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
  titleStyle: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 20,
    color: CUSTOM_COLOR.Black,
    left: '5%',
  },
  dateContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: CUSTOM_COLOR.Alto,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingLeft: '5%',
  },
  dateStyle: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
export default SignUp;
