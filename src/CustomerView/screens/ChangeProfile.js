import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  TextInput,
  Platform,
  Button,
} from 'react-native';
import CUSTOM_COLOR from '../../AdminView/constants/colors';
import FONT_FAMILY from '../constants/fonts';
import CustomHeader from '../../AdminView/components/CustomHeader';
import {IMG_Rectangle} from '../../Login_SignUp/assets/images';
import {IC_User, IC_Next} from '../assets/icons';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import {firebase} from '../../../Firebase/firebase';
import LoadingComponent from '../components/Loading';
import CustomButton from '../../Login_SignUp/components/Buttons/CustomButton';
// import ImagePicker from 'react-native-image-picker';
const ImagePicker = require('react-native-image-picker');
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ref, uploadBytes, put, getDownloadURL} from 'firebase/storage';
import {Firestore, Storage} from '../../../Firebase/firebase';

const ChangeProfile = props => {
  const {navigation} = props;
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [danhMuc, setDanhMuc] = useState([]);
  const [value, setValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState('01/01/2023');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [backgroundUrl, setBackgroundUrl] = useState(null);
  const [image, setImage] = useState();

  const gioiTinh = [
    {
      id: 'Nam',
      title: 'Nam',
    },
    {
      id: 'Nữ',
      title: 'Nữ',
    },
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
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
    setDate(selectedDate);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const fetchUserData = async userId => {
    try {
      const userRef = firebase.firestore().collection('NGUOIDUNG').doc(userId);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserData(userData);
        setFullName(userData.TenND);
        setPhoneNumber(userData.Phone);
        setAddress(userData.DiaChi);
        setBirth(userData.NgaySinh);
        setGender(userData.GioiTinh);
        setValue(userData.GioiTinh);
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchImageUrl = async (documentId, fieldName) => {
    try {
      const documentSnapshot = await firebase
        .firestore()
        .collection('NGUOIDUNG')
        .doc(documentId)
        .get();
      const data = documentSnapshot.data();
      const imageUrl = data[fieldName];
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image URL:', error);
      return null;
    }
  };

  const fetchBackgroundUrl = async (documentId, fieldName) => {
    try {
      const documentSnapshot = await firebase
        .firestore()
        .collection('NGUOIDUNG')
        .doc(documentId)
        .get();
      const data = documentSnapshot.data();
      const backgroundUrl = data[fieldName];
      return backgroundUrl;
    } catch (error) {
      console.error('Error fetching image URL:', error);
      return null;
    }
  };

  const updateFullname = async (documentId, newData) => {
    try {
      await firebase
        .firestore()
        .collection('NGUOIDUNG')
        .doc(documentId)
        .update({
          TenND: newData,
        });

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updatePhoneNumber = async (documentId, newData) => {
    try {
      await firebase
        .firestore()
        .collection('NGUOIDUNG')
        .doc(documentId)
        .update({
          Phone: newData,
        });

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updateAddress = async (documentId, newData) => {
    try {
      await firebase
        .firestore()
        .collection('NGUOIDUNG')
        .doc(documentId)
        .update({
          DiaChi: newData,
        });

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updateBirth = async (documentId, newData) => {
    try {
      await firebase
        .firestore()
        .collection('NGUOIDUNG')
        .doc(documentId)
        .update({
          NgaySinh: newData,
        });

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const UploadFile = async () => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image.uri, true);
        xhr.send(null);
      });
      const storageRef = ref(Storage, `images/users/image-${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, blob);
      console.log('Upload successfully!');
      const url = await getDownloadURL(snapshot.ref);
      console.log('Get URL successfully');
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const updateAvatar = async (documentId, avatar) => {
    const urlImage = image ? await UploadFile() : imageUrl;
    console.log(urlImage);
    try {
      await firebase
        .firestore()
        .collection('NGUOIDUNG')
        .doc(documentId)
        .update({
          Avatar: urlImage,
        });

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updateGender = async (documentId, newData) => {
    try {
      await firebase
        .firestore()
        .collection('NGUOIDUNG')
        .doc(documentId)
        .update({
          GioiTinh: newData,
        });

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // Assume data is fetched here
      const fetchedData = 'Sample Data';
      setData(fetchedData);
      setIsLoading(false);
    }, 2000);

    fetchUserData(firebase.auth().currentUser.uid);
    fetchImageUrl(firebase.auth().currentUser.uid, 'Avatar').then(url =>
      setImageUrl(url),
    );
    fetchBackgroundUrl(firebase.auth().currentUser.uid, 'Background').then(
      url => setBackgroundUrl(url),
    );

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

    getCurrentDate();
  }, []);

  const chooseImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

      selectionLimit: 5,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0]);
        console.log(image);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {userData ? (
        <>
          <>
            <TouchableOpacity style={styles.backgroundContainer}>
              <ImageBackground
                source={backgroundUrl ? {uri: backgroundUrl} : IMG_Rectangle}
                resizeMode="cover"
                style={styles.image}>
                <>
                  <View style={styles.headerContainer}>
                    <CustomHeader
                      onPress={() => navigation.goBack()}
                      title="Tài khoản / Thay đổi thông tin"
                    />
                  </View>
                </>

                <>
                  <View style={styles.avataContainer}>
                    <TouchableOpacity
                      style={styles.avataStyle}
                      onPress={() => chooseImage()}>
                      {imageUrl ? (
                        <Image
                          source={image ? image : {uri: imageUrl}}
                          style={styles.avataStyle}
                        />
                      ) : (
                        <Image source={IC_User} style={styles.avataStyle} />
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              </ImageBackground>
            </TouchableOpacity>
          </>
          <View style={{width: '100%', height: '3%'}} />
          <>
            <View style={styles.bodyContainer}>
              <ScrollView style={{width: '100%', height: '100%'}}>
                <>
                  <View style={[styles.inputContainer, {height: 90}]}>
                    <View style={{width: '100%', height: 10}} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>Họ và tên</Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-end'},
                        ]}>
                        {fullName ? (
                          <Text style={styles.titleInputStyle}>
                            {fullName.length}/50
                          </Text>
                        ) : null}
                        <View style={{width: '10%', height: '100%'}} />
                      </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{width: '5%', height: '100%'}} />
                      <TextInput
                        style={{flex: 1, fontSize: 17}}
                        onChangeText={setFullName}
                        value={fullName}
                      />
                      <View style={{width: '5%', height: '100%'}} />
                    </View>
                  </View>
                </>

                <View style={{width: '100%', height: 15}} />

                <>
                  <View style={[styles.inputContainer, {height: 90}]}>
                    <View style={{width: '100%', height: 10}} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>
                          Ngày sinh
                        </Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-end'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                      </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{width: '5%', height: '100%'}} />
                      <TouchableOpacity
                        style={styles.dateStyle}
                        onPress={showDateTimePicker}>
                        <Text style={{fontSize: 17, color: CUSTOM_COLOR.Black}}> {birth}</Text>
                      </TouchableOpacity>
                      {showPicker && (
                        <DateTimePicker
                          value={date}
                          mode="date" // Can be "date", "time", or "datetime"
                          display="spinner" // Can be "default", "spinner", or "calendar"
                          onChange={onChange}
                        />
                      )}
                      <View style={{width: '5%', height: '100%'}} />
                    </View>
                  </View>
                </>

                <View style={{width: '100%', height: 15}} />

                <>
                  <View style={[styles.inputContainer, {height: 90}]}>
                    <View style={{width: '100%', height: 10}} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '5%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>Giới tính</Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{width: '5%', height: '100%'}} />
                      <Dropdown
                        style={[
                          styles.comboType,
                          isFocus && {borderColor: 'blue'},
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={gioiTinh}
                        search
                        maxHeight={200}
                        labelField="title"
                        valueField="id"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setValue(item.id);
                          setIsFocus(false);
                          setGender(item.id);
                        }}
                      />
                    </View>
                  </View>
                </>

                <View style={{width: '100%', height: 15}} />

                <>
                  <View style={[styles.inputContainer, {height: 90}]}>
                    <View style={{width: '100%', height: 10}} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>Địa chỉ</Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-end'},
                        ]}>
                        {address ? (
                          <Text style={styles.titleInputStyle}>
                            {address.length}/150
                          </Text>
                        ) : null}
                        <View style={{width: '10%', height: '100%'}} />
                      </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{width: '5%', height: '100%'}} />
                      <TextInput
                        style={{flex: 1, fontSize: 17}}
                        onChangeText={setAddress}
                        value={address}
                      />
                      <View style={{width: '5%', height: '100%'}} />
                    </View>
                  </View>
                </>

                <View style={{width: '100%', height: 15}} />

                <>
                  <View style={[styles.inputContainer, {height: 90}]}>
                    <View style={{width: '100%', height: 10}} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>Số điện thoại</Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-end'},
                        ]}>
                        {phoneNumber ? (
                          <Text style={styles.titleInputStyle}>
                            {phoneNumber.length}/10
                          </Text>
                        ) : null}
                        <View style={{width: '10%', height: '100%'}} />
                      </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{width: '5%', height: '100%'}} />
                      <TextInput
                        style={{flex: 1, fontSize: 17}}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        keyboardType="phone-pad"
                      />
                      <View style={{width: '5%', height: '100%'}} />
                    </View>
                  </View>
                </>
                <View style={{width: '100%', height: 15}} />
                <>
                </>
              </ScrollView>
              <View style={{width: '100%', height: 65}}>
                    <View style={styles.buttonContainer}>
                      <CustomButton
                        type="primary"
                        text="Lưu"
                        onPress={() => {
                          navigation.goBack();
                          updateFullname(
                            firebase.auth().currentUser.uid,
                            fullName,
                          );
                          updateGender(firebase.auth().currentUser.uid, gender);
                          updatePhoneNumber(
                            firebase.auth().currentUser.uid,
                            phoneNumber,
                          );
                          {
                            address
                              ? updateAddress(
                                  firebase.auth().currentUser.uid,
                                  address,
                                )
                              : null;
                          }
                          updateBirth(firebase.auth().currentUser.uid, birth);

                          {
                            image
                              ? updateAvatar(
                                  firebase.auth().currentUser.uid,
                                  image,
                                )
                              : null;
                          }
                        }}
                      />
                    </View>
                  </View>
            </View>
          </>
        </>
      ) : (
        <LoadingComponent text="Loading data..." />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  headerContainer: {
    width: '90%',
    height: '32%',
    marginHorizontal: '5%',
  },
  backgroundContainer: {
    width: '100%',
    height: 185,
  },
  image: {
    flex: 1,
  },
  avataContainer: {
    width: '100%',
    height: '67%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonChangePasswordContainer: {
    width: '60%',
    height: '70%',
    marginRight: '5%',
    // backgroundColor: CUSTOM_COLOR.FlushOrange,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avataStyle: {
    width: 100,
    height: 100,
    // aspectRatio: 1,
    borderRadius: 50,
    resizeMode: 'contain',
    borderColor: CUSTOM_COLOR.Black,
    borderWidth: 1,
  },
  bodyContainer: {
    width: '90%',
    height: 450,
    marginHorizontal: '5%',
  },
  inputContainer: {
    width: '100%',
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'column',
  },
  unitTitleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleInputStyle: {},
  comboxContainer: {
    width: '100%',
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'row',
  },
  unitComboContainer: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  comboType: {
    width: '90%',
    height: '90%',
    // borderColor: CUSTOM_COLOR.MineShaft,
    // borderWidth: 0.5,
    // borderRadius: 1,
    // paddingHorizontal: '5%',
  },
  placeholderStyle: {
    fontSize: 17,
    color: CUSTOM_COLOR.Black,
  },
  selectedTextStyle: {
    fontSize: 17,
    color: CUSTOM_COLOR.Black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dateStyle: {
    width: '90%',
    height: '90%',
    // borderColor: CUSTOM_COLOR.MineShaft,
    // borderWidth: 0.5,
    // borderRadius: 1,
    // paddingHorizontal: '5%',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '200%',
    height: '100%',
    bottom: '0%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-50%',
  },
});
export default ChangeProfile;
