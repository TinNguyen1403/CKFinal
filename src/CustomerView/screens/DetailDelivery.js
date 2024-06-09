import {
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import BackTo from '../../StaffView/components/BackTo';
import CUSTOM_COLOR from '../../StaffView/constants/colors';
import {Address, Delivery, Payment} from '../../StaffView/assets/icons';
// import { ScrollView } from 'react-native-gesture-handler'
//import { Acount } from './OverView'
import PerSon from '../../StaffView/components/PerSon';
//import { IM_MauAo } from '../assets/images'
import ButtonDetail from '../../StaffView/components/ButtonDetail';
import {Firestore, firebase} from '../../../Firebase/firebase';
import {
  collection,
  onSnapshot,
  query,
  doc,
  getDoc,
  querySnapshot,
  getDocs,
  where,
  updateDoc,
} from 'firebase/firestore';
import OneOrder from '../../StaffView/components/OneOrder';
import ItemList from '../../StaffView/components/ItemList';
import Size from '../constants/size';
import {SafeAreaView} from 'react-native-safe-area-context';

const DataDelivery = {
  Name: 'Trung Tinh',
  Phone: '0704408389',
  Address: '140/10 Dinh Bo Linh, Phuong 26, Binh Thanh, Ho Chi Minh',
  CTY: 'Fast Delivery VietNam',
  Code: '#JHGUJHCFJG',
};
export default function DeTailDelivery({navigation, route}) {
  const {item} = route.params;
  const [chatUser, setChatUser] = useState();
  const [address, setAddress] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');
  const getStatus = () => {
    if (item.TrangThai == 'Cancel') {
      setStatus = 'ReOrder';
    }
    if (item.TrangThai == 'Confirm') {
      setStatus = 'Cancel';
    }
  };
  const getAddress = async item => {
    const docRef = doc(Firestore, 'DIACHI', item);
    const docSnap = await getDoc(docRef);

    const address = {
      ...docSnap.data(),
    };

    setAddress(address);
    setIsLoading(false);
  };
  const getDataChatUser = async () => {
    try {
      const q = query(
        collection(Firestore, 'CHAT'),
        where('MaND', '==', firebase.auth().currentUser.uid),
      );

      const unsubscribe = onSnapshot(q, async querySnapshot => {
        querySnapshot.forEach(doc => {
          setChatUser(doc.data());
          console.log(doc.data());
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress(item.MaDC);
    getDataChatUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      console.log(address);
    }
  }, [isLoading]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: CUSTOM_COLOR.White,
        width: '100%',
        height: Size.DeviceHeight,
        flexDirection: 'column',
      }}>
      <BackTo
        style={{marginTop: 20}}
        Info="Order/DeTails"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          width: '100%',
          height: 10,
          marginTop: 10,
          backgroundColor: CUSTOM_COLOR.LightGray,
        }}
      />
      <View style={{width: '100%', height: '77%'}}>
        <ScrollView style={{flex: 1}}>
          <View style={{width: '100%', flexDirection: 'column', marginTop: 10}}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                height: 30,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={Address}
                  style={{width: 26, height: 26, marginLeft: 18}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    marginLeft: 5,
                    fontSize: 20,
                  }}>
                  Address
                </Text>
              </View>
            </View>
            <View style={{marginLeft: 50, marginTop: 5, marginRight: 20}}>
              <Text>{item.TenND}</Text>
              <Text>{item.SDT}</Text>
              {!isLoading && (
                <Text>{`${address.DiaChi}, ${address.PhuongXa}, ${address.QuanHuyen}, ${address.TinhThanhPho}`}</Text>
              )}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 10,
              marginTop: 10,
              backgroundColor: CUSTOM_COLOR.LightGray,
            }}
          />
          <View style={{width: '100%', flexDirection: 'column', marginTop: 10}}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                height: 30,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={Payment}
                  style={{width: 26, height: 26, marginLeft: 18}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    marginLeft: 5,
                    fontSize: 20,
                  }}>
                  Payment
                </Text>
              </View>
            </View>
            <View style={{marginLeft: 30, marginTop: 5, marginRight: 20}}>
              <View
                style={{
                  width: '100%',
                  height: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginLeft: 20,
                  }}>
                  Provisional:
                </Text>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginRight: 10,
                  }}>
                  {item.TamTinh} VND
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginLeft: 20,
                  }}>
                  Delivery fee:
                </Text>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginRight: 10,
                  }}>
                  {item.PhiVanChuyen} VND
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginLeft: 20,
                  }}>
                  Discount:
                </Text>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginRight: 10,
                  }}>
                  {item.GiamGia} VND
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginLeft: 20,
                  }}>
                  Total:{' '}
                </Text>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginRight: 10,
                  }}>
                  {item.TongTien} VND
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 10,
              marginTop: 20,
              backgroundColor: CUSTOM_COLOR.LightGray,
            }}
          />
          <View>
            <PerSon avartar={item.Avatar} name={item.TenND} id={item.MaND} />

            <View>
              {item.DatHang.map((product, index) => {
                return (
                  <View key={index}>
                    <OneOrder
                      source={product.SanPham.HinhAnhSP[0]}
                      title={product.SanPham.TenSP}
                      price={product.SanPham.GiaSP}
                      number={product.SoLuong}
                      color={product.MauSac}
                      size={product.Size}
                      totalPrice={product.ThanhTien}
                    />
                  </View>
                );
              })}
              {/* <FlatList
            data={item.DatHang}
            renderItem={({ item }) => {

              //console.log(item)
              return (
                <View>
                  <OneOrder
                    source={item.SanPham.HinhAnhSP[0]}
                    title={item.SanPham.TenSP}
                    price={item.SanPham.GiaSP}
                    number={item.SoLuong}
                    color={item.MauSac}
                    size={item.Size}
                    totalPrice={item.ThanhTien}

                  ></OneOrder>

                </View>
              )
            }}
          /> */}
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          width: '100%',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chat', {chatUser});
          }}
          style={{
            width: '50%',
            height: 55,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: CUSTOM_COLOR.DarkOrange,
          }}>
          <Text
            style={{
              color: CUSTOM_COLOR.White,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Contact Seller
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 40,
  },
});
