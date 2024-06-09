import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import BackTo from '../components/BackTo';
import CUSTOM_COLOR from '../constants/colors';
import { Address, Delivery, Payment } from '../assets/icons';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Acount } from './OverView';
import PerSon from '../components/PerSon';
import { IM_MauAo } from '../assets/images';
import ButtonDetail from '../components/ButtonDetail';
import { Firestore } from '../../../Firebase/firebase';
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
import OneOrder from '../components/OneOrder';
import CustomHeader from '../components/CustomHeader';
import dayjs from 'dayjs';


export default function DeTailDelivery({ navigation, route }) {
  const { item } = route.params;

  const [address, setAddress] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState()

  const getAddress = async item => {
    const docRef = doc(Firestore, 'DIACHI', item);
    const docSnap = await getDoc(docRef);

    const address = {
      ...docSnap.data(),
    };

    setAddress(address);
    setIsLoading(false);
  };

  const getTime = () => {
    const timestamp = item.NgayDatHang.toDate();
    const date = dayjs(timestamp);

    const day = date.date();
    const month = date.month();
    const year = date.year();

    const hour = date.hour();
    const minute = date.minute();
    const second = date.second();

    setTime(`${day}/${month}/${year} ${hour}:${minute}:${second}`);

  }

  useEffect(() => {
    getAddress(item.MaDC);
    getTime()
  }, []);

  useEffect(() => {
    if (!isLoading) {
      console.log(item);
    }
  }, [isLoading]);

  const Confirm = async () => {
    navigation.goBack();
    const confirmRef = doc(Firestore, 'DONHANG', item.MaDH);

    await updateDoc(confirmRef, {
      TrangThai:
        item.TrangThai === 'Confirm'
          ? 'OnWait'
          : item.TrangThai === 'OnWait'
            ? 'Delivering'
            : item.TrangThai === 'Delivering'
              ? 'Delivered'
              : 'Delivered',
    });
  };

  return (
  
    <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}>
      <>
        <View style={{ width: '100%', height: 55, justifyContent: 'center' }}>
          <CustomHeader
            onPress={() => navigation.goBack()}
            title="Order/ Detail Delivery"
          />
        </View>
      </>
      <>
        <View style={{ width: '100%', height: '80%', backgroundColor: 'red' }}>
          <GestureHandlerRootView>
          <ScrollView style={{ backgroundColor: CUSTOM_COLOR.White }}>
            <View
              style={{
                width: '100%',
                height: 10,
                backgroundColor: CUSTOM_COLOR.LightGray,
              }}
            />
            <View
              style={{ width: '100%', flexDirection: 'column', marginTop: 10 }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  height: 30,
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={Address}
                    style={{ width: 30, height: 30, marginLeft: 18 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: CUSTOM_COLOR.Black,
                      marginLeft: 5,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Address
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: 50, marginTop: 5, marginRight: 20 }}>
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

            <View
              style={{ width: '100%', flexDirection: 'column', marginTop: 10 }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  height: 30,
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={Payment}
                    style={{ width: 30, height: 30, marginLeft: 18 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: CUSTOM_COLOR.Black,
                      marginLeft: 5,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Payment
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: 30, marginTop: 5, marginRight: 20 }}>
                <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: CUSTOM_COLOR.Black, fontWeight: 'bold', marginLeft: 20 }}>Provisional:</Text>
                  <Text style={{ color: CUSTOM_COLOR.Black, fontWeight: 'bold', marginRight: 10 }}>{item.TamTinh} VND</Text>
                </View>
                <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: CUSTOM_COLOR.Black, fontWeight: 'bold', marginLeft: 20 }}>Delivery fee:</Text>
                  <Text style={{ color: CUSTOM_COLOR.Black, fontWeight: 'bold', marginRight: 10 }}>{item.PhiVanChuyen} VND</Text>
                </View>
                <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: CUSTOM_COLOR.Black, fontWeight: 'bold', marginLeft: 20 }}>Discount:</Text>
                  <Text style={{ color: CUSTOM_COLOR.Black, fontWeight: 'bold', marginRight: 10 }}>- {item.GiamGia} VND</Text>
                </View>
                <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: CUSTOM_COLOR.Black, fontWeight: 'bold', marginLeft: 20 }}>Total: </Text>
                  <Text style={{ color: CUSTOM_COLOR.Black, fontWeight: 'bold', marginRight: 10 }}>{item.TongTien} VND</Text>
                </View>
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

            <View
              style={{
                width: '100%',
                height: 75,
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <View style={{ width: 50, height: '100%' }} />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Code: {item.MaDH}
                </Text>
                <View style={{ width: '100%', height: 3 }} />
                <Text>Date: {time}</Text>
                <View style={{ width: '100%', height: 2 }} />
                <Text>Status: {item.TrangThai === 'OnWait' ? 'On wait' : item.TrangThai}</Text>
              </View>
              {/* <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  height: 30,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
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
              </View> */}
            </View>

            <View
              style={{
                width: '100%',
                height: 10,
                marginTop: 10,
                backgroundColor: CUSTOM_COLOR.LightGray,
              }}
            />
            <View>
              <PerSon avartar={item.Avatar} name={item.TenND} id={item.MaND} />

              <View>
                {item.DatHang.map((order, index) => {
                  return (
                    <View key={index}>
                      <OneOrder
                        source={order.SanPham.HinhAnhSP[0]}
                        title={order.SanPham.TenSP}
                        price={order.SanPham.GiaSP}
                        number={order.SoLuong}
                        color={order.MauSac}
                        size={order.Size}
                        totalPrice={order.ThanhTien}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={{ width: '100%', height: 20 }} />
          </ScrollView>
          </GestureHandlerRootView>
        </View>
      </>
      <>
        <View
          style={{
            width: '100%',
            height: 75,
            backgroundColor: CUSTOM_COLOR.White,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: 55,
              flexDirection: 'row',
              marginHorizontal: '5%',
            }}>
            <TouchableOpacity
              onPress={() => {
                Confirm(item);
              }}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: CUSTOM_COLOR.DarkOrange,
                borderRadius: 25,
              }}>
              <Text
                style={{
                  color: CUSTOM_COLOR.White,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 40,
  },
});
