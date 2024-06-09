import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import BackTo from '../components/BackTo';
import CUSTOM_COLOR from '../constants/colors';
import FONT_FAMILY from '../constants/fonts';
import { border_add } from '../assets/images';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ButtonDetail from '../components/ButtonDetail';
import { AddImage } from '../assets/images';
import Search from '../components/Search';
import Categorybutton from '../components/categorybutton';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';
import { Firestore, Storage } from '../../../Firebase/firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { async } from '@firebase/util';
import CustomHeader from '../components/CustomHeader';

export default function EditProduct({ navigation, route }) {
  const { item } = route.params;

  const [image, setImage] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [danhMuc, setDanhMuc] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [lengthName, setLengthName] = useState(0);
  const [lengthDescription, setLengthDescription] = useState(0);

  const [color, setColor] = useState([]);
  const [sizes, setSize] = useState([
    {
      id: 'sizeS',
      title: 'S',
      checked: false,
    },
    {
      id: 'sizeM',
      title: 'M',
      checked: false,
    },
    {
      id: 'sizeL',
      title: 'L',
      checked: false,
    },
    {
      id: 'sizeXL',
      title: 'XL',
      checked: false,
    },
    {
      id: 'sizeXXL',
      title: 'XXL',
      checked: false,
    },
    {
      id: 'sizeXXXL',
      title: 'XXXL',
      checked: false,
    },
  ]);

  const handleCheckColor = key => {
    const newList = color.map(item =>
      item.key === key ? { ...item, checked: !item.checked } : item,
    );
    setColor(newList);
  };

  const handleCheckSize = id => {
    const newList = sizes.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setSize(newList);
  };

  const getDataDanhMuc = async () => {
    const querySnapshot = await getDocs(collection(Firestore, 'DANHMUC'));
    const danhMucs = [];
    querySnapshot.forEach(documentSnapshot => {
      danhMucs.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      });
    });

    setDanhMuc(danhMucs);
  };

  const getDataColor = async () => {
    const querySnapshot = await getDocs(collection(Firestore, 'MAUSAC'));

    const colors = [];

    querySnapshot.forEach(documentSnapshot => {
      const check = item.MauSac.find(
        color =>
          color.MaMS === documentSnapshot.data().MaMS && color.checked == true,
      );

      colors.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
        checked: check ? true : false,
      });
    });

    setColor(colors);
  };

  const getDataSize = () => {
    const data = [];
    sizes.forEach(sizes => {
      const check = item.Size.find(
        size => size.id === sizes.id && size.checked == true,
      );
      if (check) {
        data.push({
          ...sizes,
          checked: true,
        });
      } else {
        data.push({
          ...sizes,
        });
      }
    });

    setSize(data);
  };

  const UpdateData = async () => {
    const updateRef = doc(Firestore, 'SANPHAM', item.MaSP);

    await updateDoc(updateRef, {
      TenSP: name,
      MoTaSP: description,
      GiaSP: Number(price),
      SoLuongSP: Number(amount),
      MauSac: color,
      Size: sizes,
      MaDM: value,
    });

    navigation.navigate('MyProduct');
  };

  const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      multiple: true,
      selectionLimit: 5,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage([...image, ...response.assets]);
        console.log(image);
      }
    });
  };

  useEffect(() => {
    setImage(item.HinhAnhSP)
    setName(item.TenSP);
    setDescription(item.MoTaSP);
    setPrice(item.GiaSP);
    setAmount(item.SoLuongSP);
    setValue(item.MaDM);
    getDataColor();
    getDataSize();
    getDataDanhMuc();
    setLengthName(item.TenSP.length);
    setLengthDescription(item.MoTaSP.length);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: CUSTOM_COLOR.White }}>
      <View
        style={{
          width: '90%',
          height: '100%',
          marginHorizontal: '5%',
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        {/* <BackTo
          onPress={() => {
            navigation.goBack();
          }}
          Info="Edit Product"
        /> */}
        <>
          <View style={{ width: '100%', height: 60 }}>
            <CustomHeader
              onPress={() => navigation.goBack()}
              title="Product/ Edit product"
            />
          </View>
        </>

        <ScrollView style={{ backgroundColor: CUSTOM_COLOR.White }}>
          <>
            <View style={styles.addImageContainer}>
              <View style={{ width: 20, height: '100%' }} />
              <TouchableOpacity
                style={{ width: 75, height: 75 }}
                onPress={selectImage}>
                <ImageBackground
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={border_add}
                  resizeMode="cover">
                  <Text style={styles.icAddStyle}>+</Text>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{ width: 20, height: '100%' }} />

              {image ? (

                <ScrollView horizontal={true}>
                  {image.map((img, index) => (
                    <Image
                      key={index}
                      source={typeof img === 'string' ? { uri: img } : { uri: img.uri }}
                      style={{ height: 90, width: 90, margin: 5 }}
                    />
                  ))}
                </ScrollView>
                // <Image
                //   source={typeof image[0] === 'string' ? { uri: image } : image}
                //   style={{
                //     height: 75,
                //     width: 75,
                //   }}
                // />
              ) : (
                <Text style={styles.addImageTextStyles}>
                  (Add picture or video)
                </Text>
              )}
            </View>
          </>
          <View style={{ width: '100%', height: 10 }} />
          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Name Of Product</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <Text style={styles.titleInputStyle}>{lengthName}/200</Text>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={text => {
                    if (text.length < 200) {
                      setName(text);
                      setLengthName(text.length);
                    }
                  }}
                  value={name}
                />
                <View style={{ width: '5%', height: '100%' }} />
              </View>
            </View>
          </>
          <View style={{ width: '100%', height: 10 }} />
          <>
            <View style={[styles.inputContainer, { height: 100 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Description</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <Text style={styles.titleInputStyle}>
                    {lengthDescription}/500
                  </Text>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={text => {
                    if (text.length <= 500) {
                      setDescription(text);
                      setLengthDescription(text.length);
                    }
                  }}
                  value={description}
                  multiline={true}
                />
                <View style={{ width: '5%', height: '100%' }} />
              </View>
            </View>
          </>
          <View style={{ width: '100%', height: 10 }} />
          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Price</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  {/* <Text style={styles.titleInputStyle}>{lengthName}/200</Text> */}
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={text => setPrice(parseInt(text))}
                  value={String(price)}
                  keyboardType="numeric"
                />
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.titleInputStyle}>VNĐ</Text>
                </View>
              </View>
            </View>
          </>
          <View style={{ width: '100%', height: 10 }} />
          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Color</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '3%', height: '100%' }} />
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                  {color
                    ? color.map(item => (
                      <CheckBox
                        key={item.key}
                        style={{ flex: 1, padding: 10 }}
                        onClick={() => {
                          //setChecked(!checked)
                          handleCheckColor(item.key);
                        }}
                        isChecked={item.checked}
                        leftText={item.TenMau}
                        leftTextStyle={{ fontSize: 15 }}
                      />
                    ))
                    : null}
                </ScrollView>
                <View
                  style={{
                    width: '5%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </>
          <View style={{ width: '100%', height: 10 }} />
          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Size</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '3%', height: '100%' }} />
                <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
                  {sizes
                    ? sizes.map(item => (
                      <CheckBox
                        key={item.id}
                        style={{ flex: 1, padding: 10 }}
                        isChecked={item.checked}
                        leftText={item.title}
                        leftTextStyle={{ fontSize: 15, marginHorizontal: 5 }}
                        onClick={() => {
                          handleCheckSize(item.id);
                        }}
                      />
                    ))
                    : null}
                </ScrollView>
                <View
                  style={{
                    width: '5%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </>
          <View style={{ width: '100%', height: 10 }} />
          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Amount</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  {/* <Text style={styles.titleInputStyle}>{lengthName}/200</Text> */}
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={text => setAmount(parseInt(text))}
                  value={String(amount)}
                  keyboardType="numeric"
                />
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <Text style={styles.titleInputStyle}>%</Text> */}
                </View>
              </View>
            </View>
          </>
          <View style={{ width: '100%', height: 10 }} />
          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Categorize</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  {/* <Text style={styles.titleInputStyle}>{lengthName}/200</Text> */}
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View style={{ width: '5%', height: '100%' }} />
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={danhMuc}
                  search
                  maxHeight={200}
                  labelField="TenDM"
                  valueField="key"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.key);
                    setIsFocus(false);
                  }}
                />
                <View
                  style={{
                    width: '5%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </>
          <View style={{ width: '100%', height: 15 }} />
          <>
            <View
              style={{
                width: '100%',
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ButtonDetail
                title="Save"
                style={{ width: '100%', height: '90%' }}
                onPress={() => {
                  UpdateData();
                }}
                color={CUSTOM_COLOR.DarkOrange}
              />
            </View>
          </>
          <View style={{ width: '100%', height: 15 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addImageContainer: {
    width: '100%',
    height: 100,
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icAddStyle: {
    color: CUSTOM_COLOR.FlushOrange,
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 50,
  },
  addImageTextStyles: {
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 15,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    width: '90%',
    height: '80%',
    // height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 15,
    // marginHorizontal: 20,
    // marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
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
});
