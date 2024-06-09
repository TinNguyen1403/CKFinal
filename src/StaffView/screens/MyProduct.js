import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackTo from '../components/BackTo'
import { SearchIcon } from '../../CustomerView/assets/icons'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import CUSTOM_COLOR from '../constants/colors'
import ButtonDetail from '../components/ButtonDetail'
import Status from '../components/Status'
import { IM_MauAo } from '../assets/images'
import MyProduct1 from '../components/MyProductOne'

import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { Firestore, Storage } from '../../../Firebase/firebase'
import { async } from '@firebase/util'





export default function MyProduct({ navigation }) {
    const [inventory, setinventory] = useState(true)
    const [Out, setOut] = useState(false)
    const [Wait, setWait] = useState(false)


    const [dataOnWait, setDataOnWait] = useState([])
    const [dataOutOfStock, setDataOutOfStock] = useState([])
    const [dataInventory, setDataInventory] = useState([])

    const ConfirmProduct = (item) => {
        const confirmRef = doc(Firestore, "SANPHAM", item.MaSP)

        updateDoc(confirmRef, {
            TrangThai: "Inventory"
        })

        getDadaOnWait();
    }

    const getDadaOnWait = async () => {
        const q = query(collection(Firestore, "SANPHAM"), where("TrangThai", "==", "OnWait"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            setDataOnWait(data)
        });


    }

    const getDadaOutOfStock = async () => {
        const q = query(collection(Firestore, "SANPHAM"), where("TrangThai", "==", "OutOfStock"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            setDataOutOfStock(data)
        });

    }

    const getDadaInventory = async () => {
        const q = query(collection(Firestore, "SANPHAM"), where("TrangThai", "==", "Inventory"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            setDataOutOfStock(data)
        });

    }




    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            console.log('Screen A is focused');

            getDadaOnWait()
            getDadaOutOfStock()
            getDadaInventory()


        });

        getDadaOnWait()
        getDadaOutOfStock()
        getDadaInventory()

        //const interval = setInterval(() => getDadaOnWait(), 5000); // Lặp lại phương thức lấy dữ liệu sau mỗi 5 giây
        // return () => clearInterval(interval); // Xóa interval khi component bị unmount

    }, [dataOnWait.length, dataInventory.length, dataOutOfStock.length])


    if (inventory == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 15 }}>
                    <BackTo
                        onPress={() => navigation.navigate('OverView')}
                        Info='My Product'
                    ></BackTo>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Search')}
                    >
                        <Image
                            source={SearchIcon}
                            style={{ width: 20, height: 20, marginLeft: '70%', marginTop: 10 }}
                            resizeMode='contain'
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <Status
                        title='My inventory'
                        Color={CUSTOM_COLOR.DarkOrange}
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        countProduct={dataInventory.length}
                    ></Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setOut(true), setinventory(false) }}
                        title='Out of Stock'
                        countProduct={dataOutOfStock.length}
                    >

                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setWait(true), setinventory(false) }}
                        title='Hidden'
                        countProduct={dataOnWait.length}
                    >
                    </Status>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', height: '85%', marginTop: 10 }}>
                    <View>
                        <GestureHandlerRootView>
                        <FlatList
                            horizontal='true'
                            data={dataInventory}
                            renderItem={({ item }) => {
                                return (
                                    <MyProduct1
                                        source={item.HinhAnhSP[0]}
                                        title={item.TenSP}
                                        price={item.GiaSP}
                                        soluongtonkho={item.SoLuongSP}
                                        soluonglove={item.SoLuotYeuThich}
                                        soluongview={item.SoLuotXem}
                                        soluongban={item.SoLuongDaBan}
                                        edit={() => navigation.navigate('EditProduct', { item })}
                                    ></MyProduct1>
                                )
                            }
                            }
                        ></FlatList></GestureHandlerRootView>
                        <View style={{ height: 90 }}></View>
                    </View>

                </View>


                <View style={{ width: '100%', position: 'absolute', bottom: 0, backgroundColor: CUSTOM_COLOR.White, paddingBottom: 20 }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonDetail
                            style={{ width: 250 }}
                            color={CUSTOM_COLOR.DarkOrange}
                            title='ADD A NEW PRODUCT'
                            onPress={() => navigation.navigate('AddProduct')}
                        ></ButtonDetail>
                    </View>
                </View>

            </SafeAreaView>
        )
    }
    if (Out == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 15 }}>
                    <BackTo
                        onPress={() => navigation.navigate('OverView')}
                        Info='My Product'
                    ></BackTo>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Search')}
                    >
                        <Image
                            source={SearchIcon}
                            style={{ width: 20, height: 20, marginLeft: '70%', marginTop: 10 }}
                            resizeMode='contain'
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <Status
                        title='My invantory'
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setOut(false), setinventory(true) }}
                        countProduct={dataInventory.length}
                    ></Status>
                    <Status
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        Color={CUSTOM_COLOR.DarkOrange}
                        title='Out of Stock'
                        countProduct={dataOutOfStock.length}>

                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setWait(true), setOut(false) }}
                        title='Hidden'
                        countProduct={dataOnWait.length}>
                    </Status>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', height: '85%', marginTop: 10 }}>
                    <View>
                    <GestureHandlerRootView>
                        <FlatList
                            horizontal='true'
                            data={dataOutOfStock}
                            renderItem={({ item }) => {
                                return (
                                    <MyProduct1
                                        source={item.HinhAnhSP[0]}
                                        title={item.TenSP}
                                        price={item.GiaSP}
                                        soluongtonkho={item.SoLuongSP}
                                        soluonglove={item.SoLuotYeuThich}
                                        soluongview={item.SoLuotXem}
                                        soluongban={item.SoLuongDaBan}
                                        edit={() => navigation.navigate('EditProduct')}
                                    ></MyProduct1>
                                )
                            }
                            }
                        ></FlatList></GestureHandlerRootView>
                        <View style={{ height: 90 }}></View>
                    </View>
                </View>

                <View style={{ width: '100%', position: 'absolute', bottom: 0, backgroundColor: CUSTOM_COLOR.White, paddingBottom: 20 }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonDetail
                            style={{ width: 250 }}
                            color={CUSTOM_COLOR.DarkOrange}
                            title='ADD A NEW PRODUCT'
                            onPress={() => navigation.navigate('AddProduct')}
                        ></ButtonDetail>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    if (Wait == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 15 }}>
                    <BackTo
                        onPress={() => navigation.navigate('OverView')}
                        Info='My Product'
                    ></BackTo>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Search')}
                    >
                        <Image
                            source={SearchIcon}
                            style={{ width: 20, height: 20, marginLeft: '70%', marginTop: 10 }}
                            resizeMode='contain'
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <Status
                        title='My invantory'
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setWait(false), setinventory(true) }}
                        countProduct={dataInventory.length}
                    ></Status>
                    <Status
                        onPress={() => { setWait(false), setOut(true) }}
                        Color={CUSTOM_COLOR.Black}
                        title='Out of Stock'
                        countProduct={dataOutOfStock.length}
                    >
                    </Status>
                    <Status
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        Color={CUSTOM_COLOR.DarkOrange}
                        title='Hidden'
                        countProduct={dataOnWait.length}>
                    </Status>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', height: '85%', marginTop: 10 }}>
                    <View>
                    <GestureHandlerRootView>
                        <FlatList
                            horizontal='true'
                            data={dataOnWait}
                            renderItem={({ item }) => {
                                return (
                                    <MyProduct1
                                        source={item.HinhAnhSP[0]}
                                        title={item.TenSP}
                                        price={item.GiaSP}
                                        soluongtonkho={item.SoLuongSP}
                                        soluonglove={item.SoLuotYeuThich}
                                        soluongview={item.SoLuotXem}
                                        soluongban={item.SoLuongDaBan}
                                        type='OnWait'
                                        edit={() => navigation.navigate('EditProduct')}
                                        confirm={() => ConfirmProduct(item)}
                                    ></MyProduct1>
                                )
                            }
                            }
                        ></FlatList></GestureHandlerRootView>
                        <View style={{ height: 90 }}></View>
                    </View>
                </View>

                <View style={{ width: '100%', position: 'absolute', bottom: 0, backgroundColor: CUSTOM_COLOR.White, paddingBottom: 20 }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonDetail
                            style={{ width: 250 }}
                            color={CUSTOM_COLOR.DarkOrange}
                            title='ADD A NEW PRODUCT'
                            onPress={() => navigation.navigate('AddProduct')}
                        ></ButtonDetail>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({})