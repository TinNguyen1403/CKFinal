import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import CUSTOM_COLOR from '../../Login_SignUp/constants/colors.js';
import FONT_FAMILY from '../../Login_SignUp/constants/fonts.js';
import HeaderWithBack from '../../Login_SignUp/components/Header/HeaderWithBack.js';
import HeaderTitlle from '../../Login_SignUp/components/Header/HeaderTitlle.js';
import HederContent from '../../Login_SignUp/components/Header/HederContent.js';
import PasswordCard from '../../Login_SignUp/components/Cards/PasswordCard.js';
import CustomButton from '../../Login_SignUp/components/Buttons/CustomButton.js';
import {firebase, Firestore} from '../../../Firebase/firebase.js';
import {IMG_Rectangle182} from '../../Login_SignUp/assets/images/index.js';

const ChangePassword = props => {
  const {navigation} = props;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const reauthenticate = oldPassword => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };

  const onChangePasswordPress = newPassword => {
    reauthenticate(oldPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            Alert.alert('Sucess', 'Your password has been changed');
            navigation.goBack();
          })
          .catch(error => {
            Alert.alert('Sucess', error.message);
          });
      })
      .catch(error => {
        Alert.alert('Sucess', error.message);
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
          <HeaderTitlle title="Change Password" />
        </View>
        <View style={{width: '100%', height: '5%'}} />
        <View style={[styles.centerContainer, styles.unitContainer]}>
          <View style={{flex: 1}}>
            <PasswordCard
              title="Old Password*"
              txtInput="********"
              onChangeText={oldPassword => setOldPassword(oldPassword)}
            />
          </View>

          <View style={{flex: 1}}>
            <PasswordCard
              title="New Password*"
              txtInput="********"
              onChangeText={newPassword => setNewPassword(newPassword)}
            />
          </View>

          <View style={{flex: 1}}>
            <PasswordCard
              title="Confirm Password*"
              txtInput="********"
              onChangeText={corfirmPassword =>
                setConfirmPassword(corfirmPassword)
              }
            />
          </View>
        </View>

        <View
          style={{
            width: '80%',
            height: 60,
            marginHorizontal: '10%',
            marginTop: 15,
          }}>
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
              text="Save"
              onPress={() => {
                if (!reauthenticate(oldPassword)) {
                  Alert.alert(
                    'Error',
                    'Your old password is  wrong. Please enter your password again.',
                  );
                } else {
                  if (newPassword === oldPassword) {
                    Alert.alert(
                      'Error',
                      'New password have been not match with old password',
                    );
                  } else if (newPassword === confirmPassword) {
                    onChangePasswordPress(newPassword);
                  } else {
                    Alert.alert(
                      'Error',
                      'Corfirm password not match with password',
                    );
                  }
                }
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
    height: '10%',
  },
  centerContainer: {
    flexDirection: 'column',
    height: 300,
  },
  botContainer: {
    height: 70,
    top: '10%',
  },
  italicText: {
    fontFamily: FONT_FAMILY.MediumItalic,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
    fontStyle: 'italic',
  },
});
export default ChangePassword;
