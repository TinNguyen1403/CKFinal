import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Firestore } from "../../../Firebase/firebase";
import { IC_Back } from "../assets/icons";
import Promotion from "../components/Promotion";
import CUSTOM_COLOR from "../constants/colors";



function PromotionScreen({ navigation, route }) {

    const { itemsCheckout, totalMoney, delivery, choosePayment } = route.params

    const [promotion, setPromotion] = useState()

    const [dataKhuyenMai, setDataKhuyenMai] = useState([])

    const getDataKhuyenMai = async () => {
        const querySnapshot = await getDocs(collection(Firestore, "KHUYENMAI"));
        const data = []
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), checkSelect: false })
        });
        setDataKhuyenMai(data)
    }

    const updateCheck = (item) => {

        const updateItem = dataKhuyenMai.map((promo) => {
            if (promo.MaKM === item.MaKM) {
                promo.checkSelect = true
                setPromotion(item)
            }
            else promo.checkSelect = false
            return promo
        })
        setDataKhuyenMai(updateItem)



    }

    useEffect(() => {
        getDataKhuyenMai()
        console.log(dataKhuyenMai)
    }, [])


    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: CUSTOM_COLOR.White,
                height: 40,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

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
                    }}>Promotion</Text>

                </View>

                <TouchableOpacity style={{
                    marginHorizontal: 15
                }}
                    onPress={promotion ? () => { navigation.navigate('Checkout', { itemsCheckout, totalMoney, delivery, choosePayment, promotion }) } : null}
                >
                    <Text style={{
                        fontSize: 18,
                        color: CUSTOM_COLOR.SeaBuckthorn
                    }}>Done</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={dataKhuyenMai}
                renderItem={({ item }) => {

                    const dayBD = item.NgayBatDau.toDate().getDate();
                    const monthBD = item.NgayBatDau.toDate().getMonth();
                    const yearBD = item.NgayBatDau.toDate().getFullYear();

                    const dayKT = item.NgayKetThuc.toDate().getDate();
                    const monthKT = item.NgayKetThuc.toDate().getMonth();
                    const yearKT = item.NgayKetThuc.toDate().getFullYear();
                    return (
                        <Promotion
                            source={item.HinhAnhKM}
                            title={item.TenKM}
                            minimum={item.DonToiThieu}
                            expiry={`${dayBD}.${monthBD}.${yearBD} - ${dayKT}.${monthKT}.${yearKT}`}
                            onPress={() => updateCheck(item)}
                            checkSelect={item.checkSelect}
                            show={true}
                            style={{
                                margin: 10,

                            }}
                        />
                    )
                }}
            />

        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White

    },



})

export default PromotionScreen