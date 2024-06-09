import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image, Alert
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import PromotionButton from '../components/PromotionButton';
import { border_add } from '../assets/images';
import { Dropdown } from 'react-native-element-dropdown';
import FONT_FAMILY from '../constants/fonts.js';
import CUSTOM_COLOR from '../constants/colors.js';
import { Firestore } from '../../../Firebase/firebase';
import {
  doc,
  updateDoc,
} from 'firebase/firestore';

function ImportProduct({ navigation, route }) {
  const { item } = route.params
  const [name, setName] = useState('');
  const [quanity, setQuanity] = useState(0);
  const [description, setDescription] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [danhMuc, setDanhMuc] = useState([]);
  const [value, setValue] = useState(null);

  const isNumeric = input => {
    return /^-?\d+$/.test(input);
  };


  const KiemTraNhapLieu = () => {
    if (isNumeric(quanity)) return true
    return false
  }

  const CapNhatSoLuong = () => {

    if (!KiemTraNhapLieu()) {
      Alert.alert(
        'Notification',
        'Please fill in the information accurately!',
        [{ text: 'OK', style: 'cancel' }],
      );
      return;
    }
    const confirmRef = doc(Firestore, 'SANPHAM', item.MaSP);
    updateDoc(confirmRef, {
      SoLuongSP: item.SoLuongSP + parseInt(quanity, 10)
    });

    Alert.alert('Notification', 'Successfully added product quanity!', [
      { text: 'OK', onPress: () => navigation.goBack(), style: 'cancel' },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', height: 10 }} />

      <>
        <View style={styles.headerContainer}>
          <CustomHeader
            onPress={() => navigation.goBack()}
            title="Add product quantity"
          />
        </View>
      </>

      <View style={{ width: '100%', height: 50 }} />

      <>
        <View style={styles.bodyContainer}>
          <>
            <View style={[styles.comboxContainer, { height: 150 }]}>

              <Image
                style={{
                  height: 140,
                  width: 140
                }}
                source={{ uri: item.HinhAnhSP[0] }}
              />

              <Text style={{
                marginHorizontal: 20,
                fontSize: 20,
                fontWeight: 'bold'
              }}>{item.TenSP}</Text>

            </View>
          </>

          <View style={{ width: '100%', height: 20 }} />



          <View style={{ width: '100%', height: 20 }} />

          <>
            <View style={[styles.comboxContainer1, { height: 110 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={[styles.unitComboContainer, { height: '20%' }]}>
                <Text style={styles.titleInputStyle}>Quantiy</Text>
                <Text
                  style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                  {' '}
                  *
                </Text>
              </View>
              <View
                style={[
                  styles.unitComboContainer,
                  {
                    justifyContent: 'center',
                    height: '70%',
                  },
                ]}>
                <TextInput
                  style={styles.comboType}
                  onChangeText={text => setQuanity(text)}
                  value={quanity.toString()}
                  keyboardType='numeric'
                />
              </View>
            </View>
          </>

          <View style={{ width: '100%', height: 50 }} />

          <>
            <View style={styles.buttonContainer}>
              <PromotionButton
                type="secondary"
                text="Save"
                onPress={() => {
                  CapNhatSoLuong()
                }}
              />
            </View>
          </>
        </View>
      </>
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
    height: 70,
    marginHorizontal: '5%',
  },
  bodyContainer: {
    width: '90%',
    height: '85%',
    marginHorizontal: '5%',
  },
  titleInputStyle: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 17,
  },
  comboxContainer: {
    width: '100%',
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  comboxContainer1: {
    width: '100%',
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'column',

  },
  unitComboContainer: {
    width: '90%',
    marginHorizontal: '5%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  comboType: {
    width: '100%',
    height: '70%',
    borderColor: CUSTOM_COLOR.MineShaft,
    borderWidth: 0.5,
    borderRadius: 1,
    paddingHorizontal: '5%',
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
  buttonContainer: {
    width: '90%',
    height: 60,
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ImportProduct;
