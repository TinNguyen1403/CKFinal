import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { IC_Back, IC_ShoppingCart, IC_Delete } from "../assets/icons";
import { IM_AnhGiay1, IM_AnhGiay2, IM_AnhGiay3, IM_AnhGiay4 } from "../assets/images";
import Button from "../components/Button";
import ProductCheckOut from "../components/ProductCheckOut";
import ProductView from "../components/ProductView";
import SearchInput from "../components/SearchInput";
import CUSTOM_COLOR from "../constants/colors";
import { collection, doc, setDoc, getDocs, query, where, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { Firestore } from "../../../Firebase/firebase";
import { product } from "../../StaffView/assets/icons";
import { async } from "@firebase/util";
import LoadingComponent from "../components/Loading";


function ShoppingCartScreen({ navigation, route }) {

    const { idUser } = route.params

    const [items, setItems] = useState([])
    const [checkChooseAll, setCheckChooseAll] = useState(false)
    const [totalMoney, setTotalMoney] = useState(0)
    const [itemsCheckout, setItemsCheckout] = useState([])

    const getDataCart = () => {
        const q = query(collection(Firestore, "GIOHANG"), where("MaND", "==", idUser));
        const data = [];
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), checkSelect: false });
            });
        });


        setItems(data)


    }
    const updateCheck = (item) => {

        const updateItem = items.map((product) => {
            if (product.MaGH === item.MaGH) {
                product.checkSelect = !item.checkSelect;
            }
            if (product.checkSelect == false) setCheckChooseAll(false)
            return product
        })

        const chooseSelectFull = items.filter((product) => (product.checkSelect == true))
        if (chooseSelectFull.length == items.length) setCheckChooseAll(true)

        const sum = items.reduce((total, product) => {
            if (product.checkSelect) return total + product.GiaTien
            else return total
        }, 0)

        setTotalMoney(sum)

        setItems(updateItem)

        LoadItemsCheckout()
    }

    const ChooseAll = () => {

        const updateItem = items.map((product) => {
            if (checkChooseAll) {
                product.checkSelect = false
                setTotalMoney(0)
            }
            else {
                product.checkSelect = true
                const sum = items.reduce((total, product) => {
                    return total + product.GiaTien
                }, 0)

                setTotalMoney(sum)
            }


            return product
        })

        setCheckChooseAll(!checkChooseAll)


        setItems(updateItem)

        LoadItemsCheckout()
    }

    const resetTotalMoney = () => {
        const sum = items.reduce((total, product) => {
            if (product.checkSelect) return total + product.GiaTien
            else return total
        }, 0)

        setTotalMoney(sum)
    }


    const GoToProduct = (sanPham) => {
        const unsub = onSnapshot(doc(Firestore, "SANPHAM", sanPham.MaSP), (doc) => {
            const item = doc.data();
            console.log("Current data: ", doc.data());
            navigation.navigate('DetailProduct', { item })
        });
    }

    const updateNumber = async (item) => {

        const updateRef = doc(Firestore, "GIOHANG", item.MaGH);
        await updateDoc(updateRef, {
            SoLuong: item.SoLuong,
            GiaTien: item.GiaTien
        });
    }


    const UpNumber = (item) => {

        const updateItem = items.map((product) => {
            if (item.MaGH === product.MaGH) {
                product.SoLuong += 1
                product.GiaTien = product.SoLuong * product.GiaSP
                updateNumber(item)
            }

            return product
        })

        setItems(updateItem)
        resetTotalMoney()
    }

    const DownNumber = (item) => {
        const updateItem = items.map((product) => {
            if (item.MaGH === product.MaGH && item.SoLuong > 1) {
                product.SoLuong -= 1
                product.GiaTien = product.SoLuong * product.GiaSP
                updateNumber(item)
            }

            return product
        })

        setItems(updateItem)
        resetTotalMoney()
    }

    const DeleteProduct = async (item) => {
        await deleteDoc(doc(Firestore, "GIOHANG", item.MaGH));
        getDataCart()
    }

    const LoadItemsCheckout = () => {
        const data = items.filter((product) => product.checkSelect == true)

        setItemsCheckout(data)


    }


    useEffect(() => {

        getDataCart()

        //console.log(items.checkSelect)
    }, [])




    return (
        <View style={{
            flex: 1, backgroundColor: CUSTOM_COLOR.White,
        }}>
            <View style={{width: '100%', height: 10}}/>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image
                        source={IC_Back}
                        style={{
                            width: 10,
                            height: 20,
                            marginHorizontal: 20,
                            marginVertical: 15
                        }}
                        resizeMode='stretch'
                    />
                </TouchableOpacity>


                <Text style={{
                    fontSize: 20,
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold'
                }}>Shopping Cart</Text>
            </View>

            <View style={{width:'100%', height: 20}}/>

            <FlatList
                style={{
                    height: 470,
                    flexGrow: 0
                }}
                data={items}
                renderItem={({ item }) => {

                    return (

                        <ProductCheckOut
                            style={{
                                marginVertical: 10
                            }}
                            source={item.HinhAnhSP[0]}
                            title={item.TenSP}
                            color={item.MauSac}
                            size={item.Size}
                            price={item.GiaTien}
                            number={item.SoLuong}
                            show={true}
                            onPress={() => updateCheck(item)}
                            checkSelect={item.checkSelect}
                            onPressUp={() => UpNumber(item)}
                            onPressDown={() => DownNumber(item)}
                            onPressDelete={() => DeleteProduct(item)}
                            onPressProduct={() => { GoToProduct(item) }}
                        />


                    )
                }}
            />

            <View style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 2,
                justifyContent: 'space-between',
                marginHorizontal: 15
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={{
                        width: 23,
                        height: 23,
                        borderWidth: 1,
                        borderRadius: 20,
                        marginRight: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => {
                            ChooseAll()
                        }}
                    >
                        {checkChooseAll ?
                            <View style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10,
                                backgroundColor: CUSTOM_COLOR.Black
                            }}>

                            </View> : null}
                    </TouchableOpacity>

                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold'
                    }}>Choose all</Text>
                </View>


                <Text style={{
                    marginHorizontal: 20,
                    fontSize: 17,
                    fontWeight: 'bold'
                }}>Total</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginHorizontal: 20,

            }}>
                <Text style={{
                    fontSize: 17, marginHorizontal: 15
                }}>{totalMoney} đ</Text>
            </View>

            <View style={{
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: '2%',
            }}>
                <Button
                style={{width: '90%', height: '85%'}}
                    title='CHECK OUT'
                    color={CUSTOM_COLOR.FlushOrange}
                    onPress={() => {

                        if (itemsCheckout.length > 0)
                            navigation.navigate('Checkout', { itemsCheckout, totalMoney })


                    }}
                />
            </View>

        </View>

    )
}

export default ShoppingCartScreen