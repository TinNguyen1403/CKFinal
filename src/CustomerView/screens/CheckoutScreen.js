import { async } from '@firebase/util';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Firestore, firebase } from '../../../Firebase/firebase';
import {
  IC_Back,
  IC_CheckGreen,
  IC_CheckGrey,
  IC_Location,
  IC_Next,
  IC_Visa,
} from '../assets/icons';
import { IM_AnhGiay1 } from '../assets/images';
import Button from '../components/Button';
import Delivery from '../components/Delivery';
import ProductCard from '../components/ProductCard';
import ProductCheckOut from '../components/ProductCheckOut';
import Promotion from '../components/Promotion';
import CUSTOM_COLOR from '../constants/colors';
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDoc
} from 'firebase/firestore';

function CheckoutScreen({ navigation, route }) {
  const { itemsCheckout, totalMoney } = route.params;

  const { delivery, choosePayment, promotion } = route.params;

  const [index, setIndex] = useState(0);

  const deliveryCharge =
    promotion && promotion.Loai === 'MienPhiVanChuyen' ? 0 : 20000;

  const discount =
    promotion && promotion.Loai === 'GiamGia'
      ? totalMoney * promotion.TiLe
      : 5000;

  const totalOrder = totalMoney + deliveryCharge - discount;

  const day = promotion ? promotion.NgayKetThuc.toDate().getDate() : null;
  const month = promotion ? promotion.NgayKetThuc.toDate().getMonth() : null;
  const year = promotion ? promotion.NgayKetThuc.toDate().getFullYear() : null;

  const [idDonHang, setIdDonHang] = useState();

  const AddDonHang = async () => {
    const currentTime = new Date();
    const docRef = await addDoc(collection(Firestore, 'DONHANG'), {
      MaDC: delivery.MaDC,
      MaND: firebase.auth().currentUser.uid,
      MaKM: promotion.MaKM,
      NgayDatHang: Timestamp.fromDate(currentTime),
      TenNguoiMua: delivery.TenNguoiMua,
      PhiVanChuyen: deliveryCharge,
      SDT: delivery.SDT,
      TamTinh: totalMoney,
      GiamGia: discount,
      TongTien: totalOrder,
      PhuongThucTT: choosePayment,
      TrangThai: 'Confirm',
    });

    const updateRef = doc(Firestore, 'DONHANG', docRef.id);
    await updateDoc(updateRef, {
      MaDH: docRef.id,
    });

    console.log(itemsCheckout);

    itemsCheckout.forEach(item => {
      AddDatHang(item, docRef.id);
    });

    navigation.navigate('HomeScreen');

    // Alert.alert('Notification', 'You have placed our order successfully!', [
    //   {
    //     text: 'Cancle',
    //     onPress: () => {
    //       navigation.navigate('HomeScreen')

    //     }
    //   }
    // ])
  };

  const getSoLuongSP = async (maSP) => {
    const docRef = doc(Firestore, "SANPHAM", maSP);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };
  const AddDatHang = async (item, id) => {
    const docRef = await addDoc(collection(Firestore, 'DATHANG'), {
      MaDH: id,
      MaSP: item.MaSP,
      MauSac: item.MauSac,
      Size: item.Size,
      SoLuong: item.SoLuong,
      ThanhTien: item.GiaTien,
    });

    await deleteDoc(doc(Firestore, 'GIOHANG', item.MaGH));

    const dataSP = await getSoLuongSP(item.MaSP)

    const updateRef = doc(Firestore, "SANPHAM", item.MaSP);
    await updateDoc(updateRef, {
      SoLuongSP: dataSP.SoLuongSP - 1,
      SoLuongDaBan: dataSP.SoLuongDaBan + 1
    });

  };

  const MoveNext = () => {
    setIndex(index == itemsCheckout.length - 1 ? 0 : index + 1);
  };

  useEffect(() => {
    console.log(itemsCheckout, totalMoney);
  }, [itemsCheckout, totalMoney]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={IC_Back}
            style={{
              width: 10,
              height: 20,
              marginHorizontal: 20,
              marginVertical: 15,
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            color: CUSTOM_COLOR.Black,
            fontWeight: 'bold',
          }}>
          Giỏ
        </Text>
      </View>

      <ScrollView>
        {itemsCheckout ? (
          <ProductCheckOut
            source={itemsCheckout[index].HinhAnhSP[0]}
            title={itemsCheckout[index].TenSP}
            color={itemsCheckout[index].MauSac}
            size={itemsCheckout[index].Size}
            price={itemsCheckout[index].GiaTien}
            number={itemsCheckout[index].SoLuong}
            style={{
              marginVertical: 10,
            }}
            show={false}
            onPressDelete={() => MoveNext()}
          />
        ) : null}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          onPress={() =>
            navigation.navigate('Promotion', {
              itemsCheckout,
              totalMoney,
              delivery,
              choosePayment,
            })
          }>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Áp dụng Voucher
          </Text>
          <Image source={IC_Next} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          {promotion ? (
            <Promotion
              source={promotion.HinhAnhKM}
              title={promotion.TenKM}
              minimum={promotion.DonToiThieu}
              expiry={`${day}.${month}.${year}`}
            />
          ) : (
            <Text
              style={{
                fontSize: 17,
              }}>
              Chọn khuyến mãi
            </Text>
          )}

          <Image source={promotion ? IC_CheckGreen : IC_CheckGrey} />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          onPress={() =>
            navigation.navigate('Delivery', {
              itemsCheckout,
              totalMoney,
              choosePayment,
              promotion,
            })
          }>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Địa chỉ nhận hàng 
          </Text>
          <Image source={IC_Next} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          {delivery ? (
            <Delivery
              name={delivery.TenNguoiMua}
              phoneNumber={delivery.SDT}
              ward={delivery.PhuongXa}
              district={delivery.QuanHuyen}
              city={delivery.TinhThanhPho}
              address={delivery.DiaChi}
              show={false}
              style={{
                width: '90%',
              }}
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={IC_Location}
                style={{
                  width: 50,
                  height: 50,
                }}
              />

              <Text
                style={{
                  marginHorizontal: 20,
                  fontSize: 17,
                }}>
                Thêm địa chỉ của bạn
              </Text>
            </View>
          )}
          <Image source={delivery ? IC_CheckGreen : IC_CheckGrey} />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          onPress={() =>
            navigation.navigate('PaymentMethod', {
              itemsCheckout,
              totalMoney,
              delivery,
              promotion,
            })
          }>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Phương thức thanh toán
          </Text>
          <Image source={IC_Next} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={IC_Visa}
              style={{
                width: 50,
                height: 50,
              }}
            />
            {choosePayment ? (
              choosePayment === 'MomoWallet' ? (
                <Text style={{ ...styles.textPayment }}>Momo Wallet</Text>
              ) : choosePayment === 'CashPayment' ? (
                <Text style={{ ...styles.textPayment }}>Thanh toán sau khi nhận hàng</Text>
              ) : choosePayment === 'OnlineBanking' ? (
                <Text style={{ ...styles.textPayment }}>Online Banking</Text>
              ) : null
            ) : (
              <Text
                style={{
                  ...styles.textPayment,
                }}>
                Thêm phương thức thanh toán
              </Text>
            )}
          </View>
          <Image source={choosePayment ? IC_CheckGreen : IC_CheckGrey} />
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 2,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Đặt hàng{' '}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
            }}>
            Giá tiền
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}>
            {totalMoney} đ
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
            }}>
            Phí giao hàng
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}>
            {deliveryCharge} đ
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
            }}>
            Giảm giá
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}>
            - {discount} đ
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: CUSTOM_COLOR.SeaBuckthorn,
            }}>
            Tổng tiền
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: CUSTOM_COLOR.SeaBuckthorn,
            }}>
            {totalOrder} đ
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Button
            color={CUSTOM_COLOR.FlushOrange}
            title="THANH TOÁN"
            onPress={
              promotion && delivery && choosePayment
                ? () => AddDonHang()
                : () => {
                  Alert.alert(
                    'Warning',
                    'Please provide enough information!',
                    [
                      {
                        text: 'Cancle',
                      },
                    ],
                  );
                }
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPayment: {
    marginHorizontal: 20,
    fontSize: 17,
  },
});

export default CheckoutScreen;
