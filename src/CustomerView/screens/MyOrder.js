import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackTo from '../../StaffView/components/BackTo'
//import { SearchIcon } from '../../CustomerView/assets/icons'
import { FlatList, ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler'
import CUSTOM_COLOR from '../../StaffView/constants/colors'
import Status from '../../StaffView/components/Status'
//import { Acount } from './OverView'
import PerSon from '../../StaffView/components/PerSon'
//import { IM_MauAo } from '../assets/images'
import OneOrder from '../../StaffView/components/OneOrder'
import { collection, onSnapshot, query, doc, getDoc, querySnapshot, getDocs, where, updateDoc } from "firebase/firestore";
import { Firestore, firebase } from '../../../Firebase/firebase'
import { async } from '@firebase/util'


export default function Order({navigation, route}) {
    const [confirm, setConfirm] = useState(true)
    const [onWait, setOnWait] = useState(false)
    const [delivering, setDelivering] = useState(false)
    const [delivered, setDelivered] = useState(false)
    const [cancel, setCancel] = useState(false)

    const [donHangConfirm, setDonHangConfirm] = useState([])
    const [donHangOnWait, setDonHangOnWait] = useState([])
    const [donHangDelivering, setDonHangDelivering] = useState([])
    const [donHangDelivered, setDonHangDelivered] = useState([])
    const [donHangCancel, setDonHangCancel] = useState([])
    const CancelDonHang = async (item) => {
        const confirmRef = doc(Firestore, "DONHANG", item.MaDH)

        await updateDoc(confirmRef, {
            TrangThai: "Cancel"
        })
    }
    const ConfirmDonHang = async (item) => {
        const confirmRef = doc(Firestore, "DONHANG", item.MaDH)

        await updateDoc(confirmRef, {
            TrangThai: "Confirm"
        })
    }

    const getUsers = async (item) => {
        item = item.trim();

        const docRef = doc(Firestore, "NGUOIDUNG", item);
        const docSnap = await getDoc(docRef);

        const user = {
            ...docSnap.data()
        }

        return user;
    }


    const getDatHang = async (item) => {
        const q = query(collection(Firestore, "DATHANG"), where("MaDH", "==", item));

        const querySnapshot = await getDocs(q);

        const data = []
        querySnapshot.forEach((doc) => {

            data.push(doc.data())
            //console.log(doc.id, " => ", doc.data());
        });
        return data
    }

    const getSanPham = async (item) => {
        const docRef = doc(Firestore, "SANPHAM", item);

        const docSnap = await getDoc(docRef);

        const sanPham = {
            ...docSnap.data()
        }

        return sanPham;
    }

    const getDonHangCancel = () => {
        const q = query(collection(Firestore, "DONHANG"), where("TrangThai", "==", "Cancel")
        ,where('MaND', '==', firebase.auth().currentUser.uid));
    
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const promises = [];
            const promisesDatHang = [];
    
            querySnapshot.forEach((documentSnapshot) => {
                const promise = getUsers(documentSnapshot.data().MaND);
                const datHang = getDatHang(documentSnapshot.data().MaDH);
    
                promises.push(promise);
                promisesDatHang.push(datHang);
            });
    
            try {
                const dataUser = await Promise.all(promises);
                const dataDatHang = await Promise.all(promisesDatHang);
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
                            SanPham: dataSanPham[i][index]
                        };
                    });
                });
    
                const data = dataUser.map((user, index) => {
                    const documentSnapshot = querySnapshot.docs[index];
                    return {
                        ...documentSnapshot.data(),
                        ...user,
                        DatHang: dataDatHang[index]
                    };
                });
    
                setDonHangCancel(data);
            } catch (error) {
                console.log("Error getting data: ", error);
            }
        });
    
        return unsubscribe;
        // Để ngừng lắng nghe thay đổi trong thời gian thực, gọi hàm unsubscribe:
        // unsubscribe();
    };
    
          

      const getDonHangConfirm = () => {
        const q = query(collection(Firestore, "DONHANG"), where("TrangThai", "==", "Confirm")
        ,where('MaND', '==', firebase.auth().currentUser.uid));
    
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const promises = [];
            const promisesDatHang = [];
    
            querySnapshot.forEach((documentSnapshot) => {
                const promise = getUsers(documentSnapshot.data().MaND);
                const datHang = getDatHang(documentSnapshot.data().MaDH);
    
                promises.push(promise);
                promisesDatHang.push(datHang);
            });
    
            try {
                const dataUser = await Promise.all(promises);
                const dataDatHang = await Promise.all(promisesDatHang);
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
                            SanPham: dataSanPham[i][index]
                        };
                    });
                });
    
                const data = dataUser.map((user, index) => {
                    const documentSnapshot = querySnapshot.docs[index];
                    return {
                        ...documentSnapshot.data(),
                        ...user,
                        DatHang: dataDatHang[index]
                    };
                });
    
                setDonHangConfirm(data);
            } catch (error) {
                console.log("Error getting data: ", error);
            }
        });
    
        return unsubscribe;
        // Để ngừng lắng nghe thay đổi trong thời gian thực, gọi hàm unsubscribe:
        // unsubscribe();
    };
    
      
      
    

    const getDonHangOnWait = () => {
        const q = query(collection(Firestore, "DONHANG"), where("TrangThai", "==", "OnWait")
        ,where('MaND', '==', firebase.auth().currentUser.uid));
    
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const promises = [];
            const promisesDatHang = [];
    
            querySnapshot.forEach((documentSnapshot) => {
                const promise = getUsers(documentSnapshot.data().MaND);
                const datHang = getDatHang(documentSnapshot.data().MaDH);
    
                promises.push(promise);
                promisesDatHang.push(datHang);
            });
    
            try {
                const dataUser = await Promise.all(promises);
                const dataDatHang = await Promise.all(promisesDatHang);
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
                            SanPham: dataSanPham[i][index]
                        };
                    });
                });
    
                const data = dataUser.map((user, index) => {
                    const documentSnapshot = querySnapshot.docs[index];
                    return {
                        ...documentSnapshot.data(),
                        ...user,
                        DatHang: dataDatHang[index]
                    };
                });
    
                setDonHangOnWait(data);
            } catch (error) {
                console.log("Error getting data: ", error);
            }
        });
    
        return unsubscribe;
        // Để ngừng lắng nghe thay đổi trong thời gian thực, gọi hàm unsubscribe:
        // unsubscribe();
    };
      
    

    const getDonHangDelivered = () => {
        const q = query(collection(Firestore, "DONHANG"), where("TrangThai", "==", "Delivered")
        ,where('MaND', '==', firebase.auth().currentUser.uid));
    
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const promises = [];
            const promisesDatHang = [];
    
            querySnapshot.forEach((documentSnapshot) => {
                const promise = getUsers(documentSnapshot.data().MaND);
                const datHang = getDatHang(documentSnapshot.data().MaDH);
    
                promises.push(promise);
                promisesDatHang.push(datHang);
            });
            try {
                const dataUser = await Promise.all(promises);
                const dataDatHang = await Promise.all(promisesDatHang);
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
                            SanPham: dataSanPham[i][index]
                        };
                    });
                });
    
                const data = dataUser.map((user, index) => {
                    const documentSnapshot = querySnapshot.docs[index];
                    return {
                        ...documentSnapshot.data(),
                        ...user,
                        DatHang: dataDatHang[index]
                    };
                });
    
                setDonHangDelivered(data);
            } catch (error) {
                console.log("Error getting data: ", error);
            }
        });
    
        return unsubscribe;
        // Để ngừng lắng nghe thay đổi trong thời gian thực, gọi hàm unsubscribe:
        // unsubscribe();
    };
    
    const getDonHangDelivering = () => {
        const q = query(collection(Firestore, "DONHANG"), where("TrangThai", "==", "Delivering")
        ,where('MaND', '==', firebase.auth().currentUser.uid));
    
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const promises = [];
            const promisesDatHang = [];
    
            querySnapshot.forEach((documentSnapshot) => {
                const promise = getUsers(documentSnapshot.data().MaND);
                const datHang = getDatHang(documentSnapshot.data().MaDH);
    
                promises.push(promise);
                promisesDatHang.push(datHang);
            });
    
            try {
                const dataUser = await Promise.all(promises);
                const dataDatHang = await Promise.all(promisesDatHang);
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
                            SanPham: dataSanPham[i][index]
                        };
                    });
                });
    
                const data = dataUser.map((user, index) => {
                    const documentSnapshot = querySnapshot.docs[index];
                    return {
                        ...documentSnapshot.data(),
                        ...user,
                        DatHang: dataDatHang[index]
                    };
                });
    
                setDonHangDelivering(data);
            } catch (error) {
                console.log("Error getting data: ", error);
            }
        });
    
        return unsubscribe;
        // Để ngừng lắng nghe thay đổi trong thời gian thực, gọi hàm unsubscribe:
        // unsubscribe();
    };
    
      




    useEffect(() => {
        getDonHangConfirm()
        getDonHangOnWait()
        getDonHangDelivering()
        getDonHangDelivered()
        getDonHangCancel()
    }, [donHangConfirm.length, donHangOnWait.length, donHangDelivering.length, donHangDelivered.length, donHangCancel.length])


    if (confirm == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 5 }}>
                    <BackTo
                        onPress={() => navigation.goBack()}
                        Info='My Order'
                    ></BackTo>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <Status
                        title='Confirm'
                        Color={CUSTOM_COLOR.DarkOrange}
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        countProduct={donHangConfirm.length}
                    ></Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setOnWait(true), setConfirm(false) }}
                        title='On Wait'
                        countProduct={donHangOnWait.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivering(true), setConfirm(false) }}
                        title='Delivering'
                        countProduct={donHangDelivering.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivered(true), setConfirm(false) }}
                        title='Delivered'
                        countProduct={donHangDelivered.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setCancel(true), setConfirm(false) }}
                        title='Cancel'
                        countProduct={donHangCancel.length}>
                    </Status>
                </View>
                <View style={{ width: '100%', height: 10, backgroundColor: CUSTOM_COLOR.LightGray }}></View>
                <View style={{
                    height: '85%'
                }}>
                    <GestureHandlerRootView>
                    <FlatList
                        data={donHangConfirm}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        renderItem={({ item }) => {
                            //console.log(item)
                            return (
                                <View>
                                    <PerSon
                                        avartar={item.Avatar}
                                        name={item.TenND}
                                    />
                                    <FlatList
                                        data={item.DatHang}

                                        renderItem={({ item }) => {

                                            console.log(item)
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
                                                        onPress={() => {  }}
                                                        PressConfirm={() => { }}
                                                    ></OneOrder>
                                                </View>

                                            )
                                        }}
                                    ></FlatList>

                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('DetailsDelivery', { item })}}
                                        style={{
                                            backgroundColor: CUSTOM_COLOR.DarkOrange, width: 100, marginLeft: 160,
                                            marginTop: 10, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10
                                        }}
                                    >
                                        <Text style={{ color: CUSTOM_COLOR.White }}>Details</Text>
                                    </TouchableOpacity>

                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginLeft: 35 ,fontWeight: 'bold'}}>Item Code</Text>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginRight: 35 }}>#{item.MaDH}</Text>
                                    </View>
                                    <View style={{ width: '100%', height: 30, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                CancelDonHang(item)
                                            }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: CUSTOM_COLOR.DarkOrange,
                                                paddingHorizontal: 20,
                                                alignSelf: 'center',

                                            }}
                                        >
                                            <Text style={{ color: CUSTOM_COLOR.White }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        }}
                    /></GestureHandlerRootView>


                </View>
            </SafeAreaView>
        )
    }
    if (onWait == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 5 }}>
                    <BackTo
                        onPress={() => navigation.goBack()}
                        Info='My Order'
                    ></BackTo>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <Status
                        title='Confirm'
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setConfirm(true), setOnWait(false) }}
                        countProduct={donHangConfirm.length}
                    ></Status>
                    <Status
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        Color={CUSTOM_COLOR.DarkOrange}
                        title='On Wait'
                        countProduct={donHangOnWait.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivering(true), setOnWait(false) }}
                        title='Delivering'
                        countProduct={donHangDelivering.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivered(true), setOnWait(false) }}
                        title='Delivered'
                        countProduct={donHangDelivered.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setCancel(true), setOnWait(false) }}
                        title='Cancel'
                        countProduct={donHangCancel.length}>
                    </Status>
                </View>
                <View style={{ width: '100%', height: 10, backgroundColor: CUSTOM_COLOR.LightGray }}></View>
                <View>
                    <GestureHandlerRootView>
                    <FlatList
                        data={donHangOnWait}
                        renderItem={({ item }) => {
                            //console.log(item)
                            return (
                                <View>
                                    <PerSon
                                        avartar={item.Avatar}
                                        name={item.TenND}
                                    />
                                    <FlatList
                                        data={item.DatHang}
                                        renderItem={({ item }) => {

                                            console.log(item)
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
                                                         onPress={() => {  }}
                                                         PressConfirm={() => { }}
                                                    ></OneOrder>
                                                </View>

                                            )
                                        }}
                                    ></FlatList>
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('DetailsDelivery', { item })}}
                                        
                                        style={{
                                            backgroundColor: CUSTOM_COLOR.DarkOrange, width: 100, marginLeft: 160,
                                            marginTop: 10, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10
                                        }}
                                    >
                                        <Text style={{ color: CUSTOM_COLOR.White }}>Details</Text>
                                    </TouchableOpacity>

                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginLeft: 35,fontWeight: 'bold' }}>Item Code</Text>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginRight: 35 }}>#{item.MaDH}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    /></GestureHandlerRootView>


                </View>

            </SafeAreaView>
        )
    }
    if (delivering == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 5 }}>
                    <BackTo
                        onPress={() => navigation.goBack()}
                        Info='My Order'
                    ></BackTo>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                <Status
                        title='Confirm'
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setConfirm(true), setDelivering(false) }}
                        countProduct={donHangConfirm.length}
                    ></Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setOnWait(true), setDelivering(false) }}
                        title='On Wait'
                        countProduct={donHangOnWait.length}
                    >
                    </Status>
                    <Status
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        Color={CUSTOM_COLOR.DarkOrange}
                        title='Delivering'
                        countProduct={donHangDelivering.length}
                    >
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivered(true), setDelivering(false) }}
                        title='Delivered'
                        countProduct={donHangDelivered.length}
                    >
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setCancel(true), setDelivering(false) }}
                        title='Cancel'
                        countProduct={donHangCancel.length}>
                    </Status>
                </View>
                <View style={{ width: '100%', height: 10, backgroundColor: CUSTOM_COLOR.LightGray }}></View>
                <View style={{
                    height: '85%'
                }}>
                    <GestureHandlerRootView>
                    <FlatList
                        data={donHangDelivering}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        renderItem={({ item }) => {
                            //console.log(item)
                            return (
                                <View>
                                    <PerSon
                                        avartar={item.Avatar}
                                        name={item.TenND}
                                    />
                                    <FlatList
                                        data={item.DatHang}

                                        renderItem={({ item }) => {

                                            console.log(item)
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
                                                        onPress={() => {  }}
                                                        PressConfirm={() => { }}
                                                    ></OneOrder>
                                                </View>

                                            )
                                        }}
                                    ></FlatList>

                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('DetailsDelivery', { item })}}
                                        style={{
                                            backgroundColor: CUSTOM_COLOR.DarkOrange, width: 100, marginLeft: 160,
                                            marginTop: 10, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10
                                        }}
                                    >
                                        <Text style={{ color: CUSTOM_COLOR.White }}>Details</Text>
                                    </TouchableOpacity>

                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginLeft: 35 ,fontWeight: 'bold'}}>Item Code</Text>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginRight: 35 }}>#{item.MaDH}</Text>
                                    </View>

                                </View>
                            )
                        }}
                    /></GestureHandlerRootView>


                </View>
            </SafeAreaView>
        )
    }
    if (delivered == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 5 }}>
                    <BackTo
                        onPress={() => navigation.goBack()}
                        Info='My Order'
                    ></BackTo>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <Status
                        title='Confirm'
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setConfirm(true), setDelivered(false) }}
                        countProduct={donHangConfirm.length}
                    ></Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setOnWait(true), setDelivered(false) }}
                        title='On Wait'
                        countProduct={donHangOnWait.length}
                    >
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivering(true), setDelivered(false) }}
                        title='Delivering'
                        countProduct={donHangDelivering.length}
                    >
                    </Status>
                    <Status
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        Color={CUSTOM_COLOR.DarkOrange}
                        title='Delivered'
                        countProduct={donHangDelivered.length}
                    >
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setCancel(true), setDelivered(false) }}
                        title='Cancel'
                        countProduct={donHangCancel.length}>
                    </Status>
                </View>
                <View style={{ width: '100%', height: 10, backgroundColor: CUSTOM_COLOR.LightGray }}></View>
                <View>
                    <GestureHandlerRootView>
                    <FlatList
                        data={donHangDelivered}
                        renderItem={({ item }) => {
                            //console.log(item)
                            return (
                                <View>
                                    <PerSon
                                        avartar={item.Avatar}
                                        name={item.TenND}
                                    />
                                    <FlatList
                                        data={item.DatHang}
                                        renderItem={({ item }) => {
                                            console.log(item)
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
                                                         onPress={() => {  }}
                                                         PressConfirm={() => { }}
                                                    ></OneOrder>

                                                </View>
                                            )
                                        }}
                                        keyExtractor={() => item.MaSP}
                                    ></FlatList>
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('DetailsDelivery', { item })}}
                                        style={{
                                            backgroundColor: CUSTOM_COLOR.DarkOrange, width: 100, marginLeft: 160,
                                            marginTop: 10, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10
                                        }}
                                    >
                                        <Text style={{ color: CUSTOM_COLOR.White }}>Details</Text>
                                    </TouchableOpacity>

                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{color: CUSTOM_COLOR.Black,fontWeight: 'bold', marginLeft: 35 }}>Item Code</Text>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginRight: 35 }}>#{item.MaDH}</Text>
                                    </View>

                                </View>
                            )
                        }}
                    /></GestureHandlerRootView>


                </View>
            </SafeAreaView>
        )
    }
    if(cancel == true){
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 5 }}>
                    <BackTo
                        onPress={() => navigation.goBack()}
                        Info='My Order'
                    ></BackTo>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setConfirm(true), setCancel(false) }}
                        title='Confirm'
                        countProduct={donHangConfirm.length}
                    ></Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setOnWait(true), setCancel(false) }}
                        title='On Wait'
                        countProduct={donHangOnWait.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivering(true), setCancel(false) }}
                        title='Delivering'
                        countProduct={donHangDelivering.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivered(true), setCancel(false) }}
                        title='Delivered'
                        countProduct={donHangDelivered.length}>
                    </Status>
                    <Status
                        title='Cancel'
                        Color={CUSTOM_COLOR.DarkOrange}
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        countProduct={donHangCancel.length}
                    >
                    </Status>
                </View>
                <View style={{ width: '100%', height: 10, backgroundColor: CUSTOM_COLOR.LightGray }}></View>
                <View style={{
                    height: '85%'
                }}>
                    <GestureHandlerRootView>
                    <FlatList
                        data={donHangCancel}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        renderItem={({ item }) => {
                            //console.log(item)
                            return (
                                <View>
                                    <PerSon
                                        avartar={item.Avatar}
                                        name={item.TenND}
                                    />
                                    <FlatList
                                        data={item.DatHang}

                                        renderItem={({ item }) => {

                                            console.log(item)
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
                                                         onPress={() => {  }}
                                                         PressConfirm={() => { }}
                                                    ></OneOrder>
                                                </View>

                                            )
                                        }}
                                    ></FlatList>

                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('DetailsDelivery', { item })}}
                                        style={{
                                            backgroundColor: CUSTOM_COLOR.DarkOrange, width: 100, marginLeft: 160,
                                            marginTop: 10, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10
                                        }}
                                    >
                                        <Text style={{ color: CUSTOM_COLOR.White }}>Details</Text>
                                    </TouchableOpacity>

                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{color: CUSTOM_COLOR.Black,fontWeight: 'bold', marginLeft: 35 }}>Item Code</Text>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginRight: 35 }}>#{item.MaDH}</Text>
                                    </View>
                                    <View style={{ width: '100%', height: 30, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                ConfirmDonHang(item)
                                            }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: CUSTOM_COLOR.DarkOrange,
                                                paddingHorizontal: 20,
                                                alignSelf: 'center',

                                            }}
                                        >
                                            <Text style={{ color: CUSTOM_COLOR.White }}>ReOrder</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        }}
                    /></GestureHandlerRootView>


                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({})