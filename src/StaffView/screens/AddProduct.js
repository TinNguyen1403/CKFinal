import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackTo from '../components/BackTo'
import CUSTOM_COLOR from '../constants/colors'
import ButtonDetail from '../components/ButtonDetail'
import { AddImage } from '../assets/images'
import Search from '../components/Search'
import Categorybutton from '../components/categorybutton'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CheckBox from 'react-native-check-box'
import { Firestore, Storage } from '../../../Firebase/firebase'
import { collection, doc, setDoc, getDocs, query, where, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, put, getDownloadURL } from "firebase/storage";
import { Dropdown } from 'react-native-element-dropdown';
import { firebase, storage } from 'firebase'
import { async } from '@firebase/util'



export default function AddProduct({ navigation }) {


  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);




  const [image, setImage] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState()
  const [amount, setAmount] = useState()
  const [categorize, setCategorize] = useState()

  const [color, setColor] = useState([])
  const [size, setSize] = useState([
    {
      id: 'sizeS',
      title: 'S',
      checked: false
    },
    {
      id: 'sizeM',
      title: 'M',
      checked: false
    },
    {
      id: 'sizeL',
      title: 'L',
      checked: false
    },
    {
      id: 'sizeXL',
      title: 'XL',
      checked: false
    },
    {
      id: 'sizeXXL',
      title: 'XXL',
      checked: false
    },
    {
      id: 'sizeXXXL',
      title: 'XXXL',
      checked: false
    },

  ])

  const [danhMuc, setDanhMuc] = useState([])

  const handleCheckColor = (key) => {
    const newList = color.map((item) =>
      item.key === key ? { ...item, checked: !item.checked } : item
    );
    setColor(newList);
  };

  const handleCheckSize = (id) => {
    const newList = size.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setSize(newList);
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


    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {

        setImage([...image, ...response.assets]);
        console.log(image)

      }
    });


  }

  const setData = async () => {

    const colors = color.filter(item => item.checked == true)
    const sizes = size.filter(item => item.checked == true)

    const imageUri = await UploadFile()


    const docRef = await addDoc(collection(Firestore, "SANPHAM"), {
      TenSP: name,
      MoTaSP: description,
      GiaSP: Number(price),
      SoLuongSP: Number(amount),
      MauSac: colors,
      Size: sizes,
      MaDM: value,
      TrangThai: 'OnWait',
      SoLuongDaBan: 0,
      SoLuotYeuThich: 0,
      SoLuotXem: 0,
      HinhAnhSP: imageUri
    });
    console.log("Document written with ID: ", docRef.id);

    const updateId = await updateDoc(docRef, {
      MaSP: docRef.id
    })

    Alert.alert("Notification", "Successfully added new products!", [{ text: 'OK', onPress: () => navigation.goBack(), style: 'cancel' }])
  }

  useEffect(() => {


    //setColor([{ id: 1, title: 'red', checked: true }, { id: 2, title: 'blue', checked: false }])
    const getDataColor = async () => {
      const querySnapshot = await getDocs(collection(Firestore, "MAUSAC"));

      const colors = [];

      querySnapshot.forEach(documentSnapshot => {
        colors.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
          checked: false
        });
      });

      setColor(colors);

    }

    const getDataDanhMuc = async () => {
      const querySnapshot = await getDocs(collection(Firestore, "DANHMUC"));
      const danhMucs = [];
      querySnapshot.forEach(documentSnapshot => {
        danhMucs.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id
        })
      })

      setDanhMuc(danhMucs);
    }



    getDataColor();
    getDataDanhMuc();

    //const interval = setInterval(() => getDataColor(), 5000); // Lặp lại phương thức lấy dữ liệu sau mỗi 5 giây
    // return () => clearInterval(interval); // Xóa interval khi component bị unmount

  }, [])


  const UploadFile = async () => {
    const data = [];
    for (let index = 0; index < image.length; index++) {
      try {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", image[index].uri, true);
          xhr.send(null);
        });
        const storageRef = ref(Storage, `images/products/image-${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, blob);
        console.log("Upload successfully!");
        const url = await getDownloadURL(snapshot.ref);
        console.log("Get URL successfully");
        data.push(url);
      } catch (error) {
        console.log(error);
      }
    }



    console.log(data);

    return data;
  };


  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: CUSTOM_COLOR.White }}>
      <BackTo
        onPress={() => { navigation.goBack() }}
        Info='Add Product'



      ></BackTo>
      <ScrollView style={{ backgroundColor: CUSTOM_COLOR.White }}>
        <View style={{
          width: '100%', height: 130, marginTop: 10, elevation: 2,
          borderRadius: 0.5, shadowColor: CUSTOM_COLOR.Black, flexDirection: 'row', alignItems: 'center'
        }}>
          <TouchableOpacity
            style={{ width: 90, height: 90, marginTop: 10, marginHorizontal: 20 }}
            onPress={selectImage}
          >
            <Image
              style={{ width: '100%', height: '100%' }}
              source={AddImage}
              resizeMode='cover'
            ></Image>
          </TouchableOpacity>
          {
            image ?
              <ScrollView
                horizontal={true}
              >

                {image.map((img) => (
                  <Image key={img.uri} source={{ uri: img.uri }} style={{ height: 90, width: 90, margin: 5 }} />
                ))}

              </ScrollView>
              :
              <Text style={{ marginLeft: 30 }}>(Add picture or video)</Text>
          }


        </View>
        <View style={{
          width: '100%', height: 90, marginTop: 10, elevation: 2,
          borderRadius: 0.5, shadowColor: CUSTOM_COLOR.Black, flexDirection: 'column'
        }}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 15 }}>
            <Text>Name Of Product</Text>
            <Text style={{ color: CUSTOM_COLOR.Red }}> *</Text>
            <Text style={{ marginLeft: 220 }}>0/200</Text>
          </View>
          <TextInput style={{ marginLeft: 15 }}
            onChangeText={text => setName(text)}
            value={name}
          >

          </TextInput>
        </View>

        <View style={{
          width: '100%', height: 130, marginTop: 10, flexDirection: 'column',
          elevation: 2, borderRadius: 0.5, shadowColor: CUSTOM_COLOR.Black
        }}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 15 }}>
            <Text>Description</Text>
            <Text style={{ color: CUSTOM_COLOR.Red }}> *</Text>
            <Text style={{ marginLeft: 260 }}>0/200</Text>
          </View>
          <TextInput style={{ marginLeft: 15 }}
            onChangeText={text => setDescription(text)}
            value={description}
            multiline={true}
          >

          </TextInput>
        </View>

        <View style={{
          width: '100%', height: 90, marginTop: 10, elevation: 2, flexDirection: 'column',
          borderRadius: 0.5, shadowColor: CUSTOM_COLOR.Black
        }}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 15 }}>
            <Text>Price</Text>
            <Text style={{ color: CUSTOM_COLOR.Red }}> *</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextInput style={{ marginLeft: 15, width: 200 }}
              onChangeText={text => setPrice(text)}
              value={price}
              keyboardType='numeric'
            >

            </TextInput>
            <Text style={{ marginLeft: 150, marginTop: 12 }}>VND</Text>
          </View>
        </View>



        <View style={{
          width: '100%', height: 90, marginTop: 10, elevation: 2, flexDirection: 'column'
          , borderRadius: 0.5, shadowColor: CUSTOM_COLOR.Black
        }}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 15 }}>
            <Text>Color</Text>
            <Text style={{ color: CUSTOM_COLOR.Red }}> *</Text>
          </View>
          <ScrollView
            horizontal={true}
            style={{ flexDirection: 'row' }}>

            {color ?
              color.map((item) => (
                <CheckBox
                  key={item.key}
                  style={{ flex: 1, padding: 10 }}
                  onClick={() => {
                    //setChecked(!checked)
                    handleCheckColor(item.key)
                  }}
                  isChecked={item.checked}
                  leftText={item.TenMau}
                  leftTextStyle={{ fontSize: 15, marginHorizontal: 5 }}

                />
              )
              ) : null
            }

          </ScrollView>
        </View>

        <View style={{
          width: '100%', height: 90, marginTop: 10, elevation: 2, flexDirection: 'column',
          borderRadius: 0.5, shadowColor: CUSTOM_COLOR.Black
        }}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 15 }}>
            <Text>Size</Text>
            <Text style={{ color: CUSTOM_COLOR.Red }}> *</Text>
          </View>
          <ScrollView style={{ flexDirection: 'row' }}
            horizontal={true}
          >
            {
              size ?


                size.map((item) => (
                  <CheckBox
                    key={item.id}
                    style={{ flex: 1, padding: 10 }}
                    isChecked={item.checked}
                    leftText={item.title}
                    leftTextStyle={{ fontSize: 15, marginHorizontal: 5 }}
                    onClick={() => {
                      handleCheckSize(item.id)
                    }}
                  />
                ))
                : null
            }
          </ScrollView>
        </View>

        <View style={{
          width: '100%', height: 90, marginTop: 10, elevation: 2, borderRadius: 0.5, flexDirection: 'column',
          shadowColor: CUSTOM_COLOR.Black
        }}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 15 }}>
            <Text>Amount</Text>
            <Text style={{ color: CUSTOM_COLOR.Red }}> *</Text>
          </View>
          <TextInput style={{ marginLeft: 15 }}
            onChangeText={text => setAmount(text)}
            value={amount}
            keyboardType='numeric'
          >

          </TextInput>
        </View>
        <View style={{ width: '100%', height: 200, marginTop: 10, elevation: 2, flexDirection: 'column', borderRadius: 0.5, shadowColor: CUSTOM_COLOR.Black }}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 15 }}>
            <Text>Categorize</Text>
            <Text style={{ color: CUSTOM_COLOR.Red }}> *</Text>
          </View>

          <View>

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
                setCategorize(item)
              }}

            />
          </View>
        </View>
        <View style={{ alignItems: 'center', width: '100%', marginTop: 30 }}>
          <ButtonDetail
            title='Add now'
            style={{ width: 150, height: 50 }}
            onPress={() => { setData() }}
            color={CUSTOM_COLOR.DarkOrange}
          ></ButtonDetail>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 10
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
});