import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from "react-native";
import { Firestore, firebase } from "../../../Firebase/firebase";
import { IC_Back, IC_Location, IC_MyLocation } from "../assets/icons";
import Button from "../components/Button";
import InputData from "../components/InputData";
import CUSTOM_COLOR from "../constants/colors";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";

function DeliveryAddressScreen({ navigation, route }) {

    const { itemsCheckout, totalMoney, choosePayment, promotion } = route.params

    const [diaChi, setDiaChi] = useState('')
    const [phuongXa, setPhuongXa] = useState('')
    const [quanHuyen, setQuanHuyen] = useState('')
    const [tinhTP, setTinhTP] = useState('')
    const [numberPhone, setNumberPhone] = useState('')
    const [name, setName] = useState('')


    const addDataAddress = async () => {
        const docRef = await addDoc(collection(Firestore, "DIACHI"), {
            DiaChi: diaChi,
            PhuongXa: phuongXa,
            QuanHuyen: quanHuyen,
            TinhThanhPho: tinhTP,
            SDT: numberPhone,
            TenNguoiMua: name,
            MaND: firebase.auth().currentUser.uid
        });
        const updateRef = doc(Firestore, "DIACHI", docRef.id);

        await updateDoc(updateRef, {
            MaDC: docRef.id
        });

        const loadRef = doc(Firestore, "DIACHI", docRef.id);
        const docSnap = await getDoc(loadRef);

        navigation.navigate('Delivery', { itemsCheckout, totalMoney, choosePayment, promotion })


        return docSnap.data()

    }




    return (
        <View style={styles.container}>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: CUSTOM_COLOR.White,
                height: 40
            }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image
                        source={IC_Back}
                        style={{
                            width: '20%',
                            height: '40%',
                            marginHorizontal: 20,
                            marginVertical: '20%'
                        }}
                        resizeMode='stretch'
                    />
                </TouchableOpacity>


                <Text style={{
                    fontSize: 20,
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold'
                }}>Delivery Address</Text>
            </View>

            <View style={{
                alignItems: 'center'
            }}>
                <InputData
                    title='Tên'
                    width='85%'
                    placeholder='Điền tên'
                    onChangeText={(text) => setName(text)}
                />

                <InputData
                    title='Địa chỉ'
                    width='85%'
                    placeholder='Đền địa chỉ'
                    onChangeText={(text) => setDiaChi(text)}
                />

                <InputData
                    title='Phường'
                    width='85%'
                    placeholder='Phú Hòa'
                    onChangeText={(text) => setPhuongXa(text)}
                />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <InputData

                    title='Thị xã'
                    width='40%'
                    placeholder='Thủ Dầu Một'
                    onChangeText={(text) => setQuanHuyen(text)}
                />
                <InputData

                    title='Tỉnh'
                    width='40%'
                    placeholder='Bình Dương'
                    onChangeText={(text) => setTinhTP(text)}
                />
            </View>

            <View style={{
                alignItems: 'center'
            }}>
                <InputData
                    title='Số điện thoại'
                    width='85%'
                    placeholder='0785213414'
                    onChangeText={(text) => setNumberPhone(text)}
                />
            </View>



            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 20
            }}>
                <Button
                    title='Lưu'
                    color={CUSTOM_COLOR.FlushOrange}
                    onPress={() => addDataAddress()}


                />
            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White
    }

})

export default DeliveryAddressScreen