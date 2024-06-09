import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackTo from '../components/BackTo';
import { SearchIcon } from '../../CustomerView/assets/icons';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import CUSTOM_COLOR from '../constants/colors';
import Status from '../components/Status';
import { Acount } from './OverView';
import PerSon from '../components/PerSon';
import { IM_MauAo } from '../assets/images';
import OneOrder from '../components/OneOrder';
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
import { Firestore } from '../../../Firebase/firebase';
import { async } from '@firebase/util';
import CustomHeader from '../components/CustomHeader';

export default function Order({ navigation }) {
  const [confirm, setConfirm] = useState(true);
  const [onWait, setOnWait] = useState(false);
  const [delivering, setDelivering] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const [donHangConfirm, setDonHangConfirm] = useState([]);
  const [donHangOnWait, setDonHangOnWait] = useState([]);
  const [donHangDelivering, setDonHangDelivering] = useState([]);
  const [donHangDelivered, setDonHangDelivered] = useState([]);

  const ConfirmDonHang = async item => {
    const confirmRef = doc(Firestore, 'DONHANG', item.MaDH);

    await updateDoc(confirmRef, {
      TrangThai: 'OnWait',
    });

    getDonHangConfirm();
  };

  const OnWaitDonHang = async item => {
    const confirmRef = doc(Firestore, 'DONHANG', item.MaDH);

    await updateDoc(confirmRef, {
      TrangThai: 'Delivering',
    });

    getDonHangOnWait();
  };

  const DeliveringDonHang = async item => {
    const confirmRef = doc(Firestore, 'DONHANG', item.MaDH);

    await updateDoc(confirmRef, {
      TrangThai: 'Delivered',
    });

    getDonHangDelivering();
  };

  const getUsers = async item => {
    item = item.trim();

    const docRef = doc(Firestore, 'NGUOIDUNG', item);
    const docSnap = await getDoc(docRef);

    const user = {
      ...docSnap.data(),
    };

    return user;
  };

  const getDatHang = async item => {
    const q = query(
      collection(Firestore, 'DATHANG'),
      where('MaDH', '==', item),
    );

    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach(doc => {
      data.push(doc.data());
      //console.log(doc.id, " => ", doc.data());
    });
    return data;
  };

  const getSanPham = async item => {
    const docRef = doc(Firestore, 'SANPHAM', item);

    const docSnap = await getDoc(docRef);

    const sanPham = {
      ...docSnap.data(),
    };

    return sanPham;
  };

  const getDonHangConfirm = () => {
    const q = query(
      collection(Firestore, 'DONHANG'),
      where('TrangThai', '==', 'Confirm'),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const promises = [];
      const promisesDatHang = [];

      querySnapshot.forEach(documentSnapshot => {
        const promise = getUsers(documentSnapshot.data().MaND);
        const datHang = getDatHang(documentSnapshot.data().MaDH);

        promises.push(promise);
        promisesDatHang.push(datHang);
      });

      Promise.all(promises)
        .then(dataUser =>
          Promise.all(promisesDatHang).then(async dataDatHang => {
            const dataSanPham = [];

            for (const documentDatHang of dataDatHang) {
              const promises = [];
              for (const documentSanPham of documentDatHang) {
                const promise = getSanPham(documentSanPham.MaSP);
                promises.push(promise);
              }
              const promiseSanPham = await Promise.all(promises);
              dataSanPham.push(promiseSanPham);
            }

            dataDatHang.forEach((datHang, i) => {
              datHang.forEach((sanPham, index) => {
                dataDatHang[i][index] = {
                  ...dataDatHang[i][index],
                  SanPham: dataSanPham[i][index],
                };
              });
            });

            const data = dataUser.map((user, index) => {
              const documentSnapshot = querySnapshot.docs[index];
              return {
                ...documentSnapshot.data(),
                ...user,
                DatHang: dataDatHang[index],
              };
            });
            setDonHangConfirm(data);
          }),
        )
        .catch(error => {
          console.log('Error getting data: ', error);
        });
    });

    return unsubscribe;
  };

  const getDonHangOnWait = () => {
    const q = query(
      collection(Firestore, 'DONHANG'),
      where('TrangThai', '==', 'OnWait'),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const promises = [];
      const promisesDatHang = [];

      querySnapshot.forEach(documentSnapshot => {
        const promise = getUsers(documentSnapshot.data().MaND);
        const datHang = getDatHang(documentSnapshot.data().MaDH);

        promises.push(promise);
        promisesDatHang.push(datHang);
      });

      Promise.all(promises)
        .then(dataUser =>
          Promise.all(promisesDatHang).then(async dataDatHang => {
            const dataSanPham = [];

            for (const documentDatHang of dataDatHang) {
              const promises = [];
              for (const documentSanPham of documentDatHang) {
                const promise = getSanPham(documentSanPham.MaSP);
                promises.push(promise);
              }
              const promiseSanPham = await Promise.all(promises);
              dataSanPham.push(promiseSanPham);
            }

            dataDatHang.forEach((datHang, i) => {
              datHang.forEach((sanPham, index) => {
                dataDatHang[i][index] = {
                  ...dataDatHang[i][index],
                  SanPham: dataSanPham[i][index],
                };
              });
            });

            const data = dataUser.map((user, index) => {
              const documentSnapshot = querySnapshot.docs[index];
              return {
                ...documentSnapshot.data(),
                ...user,
                DatHang: dataDatHang[index],
              };
            });
            setDonHangOnWait(data);
          }),
        )
        .catch(error => {
          console.log('Error getting data: ', error);
        });
    });

    return unsubscribe;
  };

  const getDonHangDelivering = () => {
    const q = query(
      collection(Firestore, 'DONHANG'),
      where('TrangThai', '==', 'Delivering'),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const promises = [];
      const promisesDatHang = [];

      querySnapshot.forEach(documentSnapshot => {
        const promise = getUsers(documentSnapshot.data().MaND);
        const datHang = getDatHang(documentSnapshot.data().MaDH);

        promises.push(promise);
        promisesDatHang.push(datHang);
      });

      Promise.all(promises)
        .then(dataUser =>
          Promise.all(promisesDatHang).then(async dataDatHang => {
            const dataSanPham = [];

            for (const documentDatHang of dataDatHang) {
              const promises = [];
              for (const documentSanPham of documentDatHang) {
                const promise = getSanPham(documentSanPham.MaSP);
                promises.push(promise);
              }
              const promiseSanPham = await Promise.all(promises);
              dataSanPham.push(promiseSanPham);
            }

            dataDatHang.forEach((datHang, i) => {
              datHang.forEach((sanPham, index) => {
                dataDatHang[i][index] = {
                  ...dataDatHang[i][index],
                  SanPham: dataSanPham[i][index],
                };
              });
            });

            const data = dataUser.map((user, index) => {
              const documentSnapshot = querySnapshot.docs[index];
              return {
                ...documentSnapshot.data(),
                ...user,
                DatHang: dataDatHang[index],
              };
            });
            setDonHangDelivering(data);
          }),
        )
        .catch(error => {
          console.log('Error getting data: ', error);
        });
    });

    return unsubscribe;
  };

  const getDonHangDelivered = () => {
    const q = query(
      collection(Firestore, 'DONHANG'),
      where('TrangThai', '==', 'Delivered'),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const promises = [];
      const promisesDatHang = [];

      querySnapshot.forEach(documentSnapshot => {
        const promise = getUsers(documentSnapshot.data().MaND);
        const datHang = getDatHang(documentSnapshot.data().MaDH);

        promises.push(promise);
        promisesDatHang.push(datHang);
      });

      Promise.all(promises)
        .then(dataUser =>
          Promise.all(promisesDatHang).then(async dataDatHang => {
            const dataSanPham = [];

            for (const documentDatHang of dataDatHang) {
              const promises = [];
              for (const documentSanPham of documentDatHang) {
                const promise = getSanPham(documentSanPham.MaSP);
                promises.push(promise);
              }
              const promiseSanPham = await Promise.all(promises);
              dataSanPham.push(promiseSanPham);
            }

            dataDatHang.forEach((datHang, i) => {
              datHang.forEach((sanPham, index) => {
                dataDatHang[i][index] = {
                  ...dataDatHang[i][index],
                  SanPham: dataSanPham[i][index],
                };
              });
            });

            const data = dataUser.map((user, index) => {
              const documentSnapshot = querySnapshot.docs[index];
              return {
                ...documentSnapshot.data(),
                ...user,
                DatHang: dataDatHang[index],
              };
            });
            setDonHangDelivered(data);
          }),
        )
        .catch(error => {
          console.log('Error getting data: ', error);
        });
    });

    return unsubscribe;
  };

  useEffect(() => {
    getDonHangConfirm();
    getDonHangOnWait();
    getDonHangDelivering();
    getDonHangDelivered();
  }, [
    donHangConfirm.length,
    donHangOnWait.length,
    donHangDelivering.length,
    donHangDelivered.length,
  ]);

  if (confirm == true) {
    return (
      <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Order" />
        </View>

        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="Confirm"
            Color={CUSTOM_COLOR.DarkOrange}
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            countProduct={donHangConfirm.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOnWait(true), setConfirm(false);
            }}
            title="On Wait"
            countProduct={donHangOnWait.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivering(true), setConfirm(false);
            }}
            title="Delivering"
            countProduct={donHangDelivering.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivered(true), setConfirm(false);
            }}
            title="Delivered"
            countProduct={donHangDelivered.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <GestureHandlerRootView>
          <FlatList
            data={donHangConfirm}
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              //console.log(item)
              return (
                <View style={{ width: '100%' }}>
                  <View
                    style={{ width: '100%', height: 60, flexDirection: 'row' }}>
                    <View
                      style={{
                        width: '75%',
                        height: '100%',
                        justifyContent: 'center',
                      }}>
                      <PerSon
                        avartar={item.Avatar}
                        name={item.TenND}
                        id={item.MaND}
                      />
                    </View>
                    <View
                      style={{
                        width: '25%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DeTailsDelivery', { item });
                        }}
                        style={{
                          backgroundColor: CUSTOM_COLOR.White,
                          width: '95%',
                          height: '75%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                          // borderWidth: 1,
                          // borderColor: CUSTOM_COLOR.DarkOrange,
                        }}>
                        <Text
                          style={{
                            color: CUSTOM_COLOR.DarkOrange,
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <FlatList
                    data={item.DatHang}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                      console.log(item);
                      return (
                        <View>
                          <OneOrder
                            source={item.SanPham.HinhAnhSP[0]}
                            title={item.SanPham.TenSP}
                            price={item.SanPham.GiaSP}
                            number={item.SoLuong}
                            totalPrice={item.ThanhTien}
                            color={item.MauSac}
                            size={item.Size}
                            Code={item.MaDH}
                            onPress={() => {
                              navigation.navigate('DeTailsDelivery');
                            }}
                            PressConfirm={() => { }}
                          />
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log(item);

                        ConfirmDonHang(item);
                      }}
                      style={{
                        backgroundColor: CUSTOM_COLOR.DarkOrange,
                        width: '90%',
                        height: 53,
                        marginHorizontal: '5%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                      }}>
                      <Text
                        style={{
                          color: CUSTOM_COLOR.White,
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.White,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.LightGray,
                    }}
                  />
                </View>
              );
            }}
          /></GestureHandlerRootView>
        </View>
      </SafeAreaView>
    );
  }
  if (onWait == true) {
    return (
      <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Order" />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="Confirm"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setConfirm(true), setOnWait(false);
            }}
            countProduct={donHangConfirm.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="On Wait"
            countProduct={donHangOnWait.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivering(true), setOnWait(false);
            }}
            title="Delivering"
            countProduct={donHangDelivering.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivered(true), setOnWait(false);
            }}
            title="Delivered"
            countProduct={donHangDelivered.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <GestureHandlerRootView>
          <FlatList
            data={donHangOnWait}
            keyExtractor={item => item.MaDH}
            renderItem={({ item }) => {
              //console.log(item)
              return (
                <View style={{ width: '100%' }}>
                  <View
                    style={{ width: '100%', height: 60, flexDirection: 'row' }}>
                    <View
                      style={{
                        width: '75%',
                        height: '100%',
                        justifyContent: 'center',
                      }}>
                      <PerSon
                        avartar={item.Avatar}
                        name={item.TenND}
                        id={item.MaND}
                      />
                    </View>
                    <View
                      style={{
                        width: '25%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DeTailsDelivery', { item });
                        }}
                        style={{
                          backgroundColor: CUSTOM_COLOR.White,
                          width: '95%',
                          height: '75%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                          // borderWidth: 1,
                          // borderColor: CUSTOM_COLOR.DarkOrange,
                        }}>
                        <Text
                          style={{
                            color: CUSTOM_COLOR.DarkOrange,
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 10 }} />
                  <FlatList
                    data={item.DatHang}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                      console.log(item);
                      return (
                        <View>
                          <OneOrder
                            source={item.SanPham.HinhAnhSP[0]}
                            title={item.SanPham.TenSP}
                            price={item.SanPham.GiaSP}
                            number={item.SoLuong}
                            totalPrice={item.ThanhTien}
                            Code={item.MaDH}
                            onPress={() => {
                              navigation.navigate('DeTailsDelivery');
                            }}
                            PressConfirm={() => { }}
                          />
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        OnWaitDonHang(item);
                      }}
                      style={{
                        backgroundColor: CUSTOM_COLOR.DarkOrange,
                        width: '90%',
                        height: 53,
                        marginHorizontal: '5%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                      }}>
                      <Text
                        style={{
                          color: CUSTOM_COLOR.White,
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.White,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.LightGray,
                    }}
                  />
                </View>
              );
            }}
          /></GestureHandlerRootView>
        </View>
      </SafeAreaView>
    );
  }
  if (delivering == true) {
    return (
      <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Order" />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="Confirm"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setConfirm(true), setDelivering(false);
            }}
            countProduct={donHangConfirm.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOnWait(true), setDelivering(false);
            }}
            title="On Wait"
            countProduct={donHangOnWait.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="Delivering"
            countProduct={donHangDelivering.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivered(true), setDelivering(false);
            }}
            title="Delivered"
            countProduct={donHangDelivered.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <GestureHandlerRootView>
          <FlatList
            data={donHangDelivering}
            keyExtractor={item => item.MaDH}
            renderItem={({ item }) => {
              //console.log(item)
              return (
                <View style={{ width: '100%' }}>
                  <View
                    style={{ width: '100%', height: 60, flexDirection: 'row' }}>
                    <View
                      style={{
                        width: '75%',
                        height: '100%',
                        justifyContent: 'center',
                      }}>
                      <PerSon
                        avartar={item.Avatar}
                        name={item.TenND}
                        id={item.MaND}
                      />
                    </View>
                    <View
                      style={{
                        width: '25%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DeTailsDelivery', { item });
                        }}
                        style={{
                          backgroundColor: CUSTOM_COLOR.White,
                          width: '95%',
                          height: '75%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                          // borderWidth: 1,
                          // borderColor: CUSTOM_COLOR.DarkOrange,
                        }}>
                        <Text
                          style={{
                            color: CUSTOM_COLOR.DarkOrange,
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 10 }} />
                  <FlatList
                    data={item.DatHang}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                      console.log(item);
                      return (
                        <View>
                          <OneOrder
                            source={item.SanPham.HinhAnhSP[0]}
                            title={item.SanPham.TenSP}
                            price={item.SanPham.GiaSP}
                            number={item.SoLuong}
                            totalPrice={item.ThanhTien}
                            Code={item.MaDH}
                            onPress={() => {
                              navigation.navigate('DeTailsDelivery');
                            }}
                            PressConfirm={() => { }}
                          />
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        DeliveringDonHang(item);
                      }}
                      style={{
                        backgroundColor: CUSTOM_COLOR.DarkOrange,
                        width: '90%',
                        height: 53,
                        marginHorizontal: '5%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                      }}>
                      <Text
                        style={{
                          color: CUSTOM_COLOR.White,
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.White,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.LightGray,
                    }}
                  />
                </View>
              );
            }}
          /></GestureHandlerRootView>
        </View>
      </SafeAreaView>
    );
  }
  if (delivered == true) {
    return (
      <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Order" />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="Confirm"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setConfirm(true), setDelivered(false);
            }}
            countProduct={donHangConfirm.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOnWait(true), setDelivered(false);
            }}
            title="On Wait"
            countProduct={donHangOnWait.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivering(true), setDelivered(false);
            }}
            title="Delivering"
            countProduct={donHangDelivering.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="Delivered"
            countProduct={donHangDelivered.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <GestureHandlerRootView>
          <FlatList
            data={donHangDelivered}
            keyExtractor={item => item.MaDH}
            renderItem={({ item }) => {
              //console.log(item)
              return (
                <View style={{ width: '100%' }}>
                  <View
                    style={{ width: '100%', height: 60, flexDirection: 'row' }}>
                    <View
                      style={{
                        width: '75%',
                        height: '100%',
                        justifyContent: 'center',
                      }}>
                      <PerSon
                        avartar={item.Avatar}
                        name={item.TenND}
                        id={item.MaND}
                      />
                    </View>
                    <View
                      style={{
                        width: '25%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DeTailsDelivery', { item });
                        }}
                        style={{
                          backgroundColor: CUSTOM_COLOR.White,
                          width: '95%',
                          height: '75%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                          // borderWidth: 1,
                          // borderColor: CUSTOM_COLOR.DarkOrange,
                        }}>
                        <Text
                          style={{
                            color: CUSTOM_COLOR.DarkOrange,
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 10 }} />

                  <FlatList
                    data={item.DatHang}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                      console.log(item);
                      return (
                        <View>
                          <OneOrder
                            source={item.SanPham.HinhAnhSP[0]}
                            title={item.SanPham.TenSP}
                            price={item.SanPham.GiaSP}
                            number={item.SoLuong}
                            totalPrice={item.ThanhTien}
                            color={item.MauSac}
                            size={item.Size}
                          />
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.White,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.LightGray,
                    }}
                  />
                </View>
              );
            }}
          /></GestureHandlerRootView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
