
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import { TouchableWithoutFeedback, GestureHandlerRootView } from "react-native-gesture-handler";
import { AirbnbRating, Rating } from "react-native-ratings";
import { CurvedTransition } from "react-native-reanimated";
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";
import { IC_Back, IC_Cancle, IC_Down, IC_Heart, IC_Heart_Red, IC_ShoppingCart, IC_StartCorner, IC_StartFull } from "../assets/icons";
import { IM_MauAo } from "../assets/images";
import Button from "../components/Button";
import StarRating from "../components/StarRatingChoose";
import CUSTOM_COLOR from "../constants/colors";
import { collection, addDoc, doc, updateDoc, onSnapshot, query, deleteDoc, where, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import { Firestore, firebase } from "../../../Firebase/firebase";
import Swiper from 'react-native-swiper'
import { set } from "date-fns";
import { da } from "date-fns/locale";
import { Badge } from 'react-native-elements';
function DetailProduct({ navigation, route }) {
    //
    const [love, setlove] = useState(false)
    //
    const [tong, settong] = useState()
    const [tb, settb] = useState()
    const { item } = route.params
    console.log(item);
    const [badgeCart, setBadgeCart] = useState(0);
    const [dataSanPham, setDataSanPham] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [chooseStyle, setChooseStyle] = useState(false)
    const [numProduct, setNumProduct] = useState(1)
    const [idUser, setIdUser] = useState()
    const [chooseColor, setChooseColor] = useState()
    const [chooseSize, setChooseSize] = useState()
    const [itemsCheckout, setItemsCheckout] = useState([])
    const [totalMoney, setTotalMoney] = useState()
    const [seeDetails, setSeeDetails] = useState(false)
    const getItemdata = () => {
        try {
            const q = query(collection(Firestore, "SANPHAM"), where("MaSP", "==", item.MaSP));
            const querySnapshot = onSnapshot(q, async (snapshot) => {
                const items = [];
                snapshot.forEach(documentSnapshot => {
                    items.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                await setDataSanPham(items)
                setIsLoading(true)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getBadgeCart = () => {
        const q = query(
            collection(Firestore, 'GIOHANG'),
            where('MaND', '==', firebase.auth().currentUser.uid),
        );
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const data = [];
            querySnapshot.forEach(doc => {
                data.push(doc.data());
            });
            setBadgeCart(data.length);
        });
    };
    const setDataGioHang = async () => {
        const docRef = await addDoc(collection(Firestore, "GIOHANG"), {
            MaND: firebase.auth().currentUser.uid,
            MaSP: dataSanPham[0].MaSP,
            SoLuong: numProduct,
            GiaTien: dataSanPham[0].GiaSP * numProduct,
            MauSac: chooseColor,
            Size: chooseSize,
            HinhAnhSP: dataSanPham[0].HinhAnhSP,
            TenSP: dataSanPham[0].TenSP,
            GiaSP: dataSanPham[0].GiaSP

        });

        const updateRef = doc(Firestore, "GIOHANG", docRef.id);
        await updateDoc(updateRef, {
            MaGH: docRef.id
        });

        Alert.alert(
            'Notification',
            'Add to cart successfully',
            [
                {
                    text: 'Cancel',
                    onPress: () => navigation.navigate('HomeScreen'),
                    style: 'cancel',
                },
            ],
        );

    }
    const setBuyNow = async () => {
        const docRef = await addDoc(collection(Firestore, "GIOHANG"), {
            MaND: firebase.auth().currentUser.uid,
            MaSP: dataSanPham[0].MaSP,
            SoLuong: numProduct,
            GiaTien: dataSanPham[0].GiaSP * numProduct,
            MauSac: chooseColor,
            Size: chooseSize,
            HinhAnhSP: dataSanPham[0].HinhAnhSP,
            TenSP: dataSanPham[0].TenSP,
            GiaSP: dataSanPham[0].GiaSP

        });

        const updateRef = doc(Firestore, "GIOHANG", docRef.id);
        await updateDoc(updateRef, {
            MaGH: docRef.id
        });

        const unsub = onSnapshot(doc(Firestore, "GIOHANG", docRef.id), (doc) => {
            const data = []
            data.push(doc.data())
            setItemsCheckout(data)
            setTotalMoney(dataSanPham[0].GiaSP * numProduct)

        });
    }

    { itemsCheckout && totalMoney ? navigation.navigate('Checkout', { itemsCheckout, totalMoney }) : null }

    //
    const addYeuThich = async () => {
        try {
            const docRef = await addDoc(collection(Firestore, "YEUTHICH"), {
                MaND: firebase.auth().currentUser.uid,
                MaSP: item.MaSP
            });
            const updateRef = doc(Firestore, "SANPHAM", item.MaSP);
            await updateDoc(updateRef, {
                SoLuotYeuThich: dataSanPham[0].SoLuotYeuThich + 1,
            });
        } catch (error) {
            console.log(error)
        }
    }
    const deleteYeuThich = async () => {
        try {
            const collectionRef = collection(Firestore, 'YEUTHICH');
            const q = query(collectionRef
                , where('MaND', '==', firebase.auth().currentUser.uid)
                , where('MaSP', '==', item.MaSP));
            const querySnapshot = await getDocs(q);
            // console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref).then(() => {
                    console.log('Xóa tài liệu thành công');
                }).catch((error) => {
                    console.error('Lỗi khi xóa tài liệu:', error);
                });
            });
            const updateRef = doc(Firestore, "SANPHAM", item.MaSP);
            await updateDoc(updateRef, {
                SoLuotYeuThich: dataSanPham[0].SoLuotYeuThich - 1,
            });
        } catch (error) {
            console.log(error);
        }
    }
    const getdataReview = () => {
        try {
            const q = query(collection(Firestore, "DANHGIA"), where("MaSP", "==", item.MaSP));
            const querySnapshot = onSnapshot(q, async (snapshot) => {
                const items = [];
                snapshot.forEach(documentSnapshot => {
                    items.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                let sum = 0;
                if (items.length != 0) {
                    for (let i = 0; i < items.length; i++) {
                        sum += items[i].Rating;
                    }
                    settong(items.length);
                    console.log(tong);
                    settb((Math.round(sum / items.length * 100) / 100).toFixed(1));
                    console.log(tb);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    const SetLove = async () => {

        setlove(!love);
    }
    const setDataYeuThich = async () => {
        await SetLove();
        let check = love;
        if (check == false) {
            addYeuThich()
        }
        else {
            deleteYeuThich()
        }
    }
    const getstatusYeuThich = async () => {
        const q = query(collection(Firestore, "YEUTHICH"), where("MaND", "==", firebase.auth().currentUser.uid));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach(documentSnapshot => {
            items.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });
        for (let i = 0; i < items.length; i++) {
            if (items[i].MaSP == item.MaSP) {
                setlove(true);
            }
        }
    }
    useEffect(() => {
        setIdUser(firebase.auth().currentUser.uid);
        getItemdata();
        getstatusYeuThich();
        getdataReview();
        getBadgeCart();
    }, [])
    if (isLoading == true) {
        return (
            <View style={{
                ...styles.container,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack();
                        }}>
                            <Image
                                source={IC_Back}
                                style={{
                                    width: 10,
                                    height: 20,
                                    margin: 20,
                                }}
                                resizeMode='stretch'
                            />
                        </TouchableOpacity>

                        <Text style={{ height: 40, padding: 7, fontSize: 18, fontWeight: 'bold', color: CUSTOM_COLOR.Black }}>Product</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: 'center', marginRight: 10 }} >
                        <TouchableOpacity onPress={() => {
                            setDataYeuThich();
                        }}
                        >
                            {love ? (<Image
                                source={IC_Heart_Red}
                                style={{
                                    margin: 10,
                                    width: 33,
                                    height: 33,

                                }}
                                resizeMode='contain'
                            />) :
                                (<Image
                                    source={IC_Heart}
                                    style={{
                                        margin: 10,
                                        width: 28,
                                        height: 28,
                                    }}
                                    resizeMode='contain'
                                />)
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 45,
                                height: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // marginVertical: 10,
                                // padding: 8,
                                borderRadius: 10,
                            }}
                            onPress={() => {
                                navigation.navigate('ShoppingCard', { idUser });
                            }}>
                            {badgeCart != 0 ? (
                                <Badge
                                    value={badgeCart}
                                    status="error"
                                    containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                                />
                            ) : null}
                            <Image source={IC_ShoppingCart} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center' }}>

                    <Swiper
                        loop
                        autoplay
                    >
                        {dataSanPham[0].HinhAnhSP.map((image, index) => (

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}
                                key={index}
                            >
                                <Image
                                    source={{ uri: image }}
                                    style={{
                                        width: 300,
                                        height: 300, borderRadius: 20
                                    }}
                                />

                            </View>
                        ))}

                    </Swiper>

                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text
                        style={{
                            margin: 10,
                            color: CUSTOM_COLOR.Black,
                            fontWeight: 'bold',
                            fontSize: 20,
                            marginLeft: 40,
                            width: '50%'

                        }}>{dataSanPham[0].TenSP}</Text>

                    <Text
                        style={{
                            marginHorizontal: 10,
                            fontSize: 20,
                            color: CUSTOM_COLOR.Sunglow,
                            fontWeight: 'bold',
                            width: '30%'

                        }}
                    >{dataSanPham[0].GiaSP * numProduct} đ</Text>

                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 20,
                    marginHorizontal: 40,
                    alignItems: 'center'
                }}>
                    <Text style={{ marginRight: 10 }}>{tb}</Text>
                    <StarRating
                        nums={5}
                        fill={tb}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Review', { item })}
                    >
                        <Text style={{
                            marginHorizontal: 40,
                            fontStyle: 'italic'
                        }}>
                            See reviews
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >


                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: '1%'

                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>

                        <Text style={{
                            marginLeft: 35,
                            marginRight: 20,
                            ...styles.textLarge

                        }}>Color</Text>



                        {dataSanPham[0].MauSac.filter(color => color.checked == true).map(color => (
                            <View style={{
                                ...styles.colorCicle,
                                backgroundColor: color.MaMau,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                key={color.MaMS}
                            >
                                {chooseColor === color.TenMau ?
                                    <View style={{
                                        ...styles.colorCicle,
                                        width: 10,
                                        height: 10,
                                        backgroundColor: CUSTOM_COLOR.White,
                                        borderWidth: 0
                                    }}>

                                    </View> : null}

                            </View>
                        ))}






                    </View>


                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >

                        <TouchableOpacity style={{
                            ...styles.btnCount
                        }}
                            onPress={() => numProduct > 1 ? setNumProduct(numProduct - 1) : null}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>-</Text>

                        </TouchableOpacity>

                        <Text>{numProduct}</Text>

                        <TouchableOpacity style={{
                            ...styles.btnCount
                        }}
                            onPress={() => setNumProduct(numProduct + 1)}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>+</Text>

                        </TouchableOpacity>
                    </View>

                </View>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginTop: 10,
                    marginVertical: '1%'
                }}>
                    <Text style={{
                        ...styles.textLarge,
                        marginLeft: 35

                    }}>Size</Text>

                    <View style={{
                        flexDirection: 'row',

                    }}>
                        {dataSanPham[0].Size.filter(size => size.checked == true).map((size, index) => (
                            <GestureHandlerRootView>
                            <TouchableWithoutFeedback style={{
                                ...styles.sizeCircle,
                                width: 45,
                                marginHorizontal: 5,
                                borderWidth: chooseSize === size.title ? 1 : 0
                            }}
                                key={index}
                            >
                                <Text>{size.title}</Text>
                            </TouchableWithoutFeedback>
                            </GestureHandlerRootView>
                        ))}








                    </View>


                </View>

                <TouchableOpacity
                    onPress={() => setChooseStyle(true)}
                    style={{ alignSelf: 'flex-end', marginHorizontal: 20 }}
                >
                    <Text style={{
                        fontStyle: 'italic'
                    }}>How can I choose my size?</Text>
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between', marginVertical: 10,
                        marginHorizontal: 35
                    }}
                >
                    <Text style={{
                        color: CUSTOM_COLOR.Black
                    }}>
                        See product details
                    </Text>

                    <TouchableOpacity styles={{

                    }}
                        onPress={() => setSeeDetails(!seeDetails)}
                    >
                        <Image source={IC_Down} />
                    </TouchableOpacity>
                </View>
                {seeDetails ?
                    <View>
                        <Text style={{
                            marginHorizontal: 35
                        }}>{dataSanPham[0].MoTaSP}</Text>
                    </View>
                    :
                    null}
                <View style={{
                    flexDirection: 'row', justifyContent: 'center',
                    marginVertical: '3%'
                }}>
                    <Button
                        color={CUSTOM_COLOR.Carnation}
                        title='ADD TO CARD'
                        style={{
                            paddingVertical: '3%'
                        }}
                        onPress={() => setDataGioHang()}
                    />

                    <Button
                        color={CUSTOM_COLOR.Sunshade}
                        title='BUY NOW'
                        onPress={() => setBuyNow()}
                    />
                </View>



                {chooseStyle ?

                    <View style={{
                        position: 'absolute',
                        width: '80%',
                        height: '40%',
                        backgroundColor: CUSTOM_COLOR.White,
                        alignSelf: 'center',
                        top: '30%',
                        borderRadius: 30,
                        borderWidth: 1
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginHorizontal: '5%',
                            marginVertical: '2%'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: CUSTOM_COLOR.Black
                            }}>Choose your style</Text>

                            <TouchableOpacity
                                onPress={() => setChooseStyle(false)}
                            >
                                <Image style={{
                                    width: 15,
                                    height: 15
                                }}
                                    source={IC_Cancle}
                                />

                            </TouchableOpacity>
                        </View>

                        <View style={{
                            ...styles.flexRow,
                            marginHorizontal: '10%',
                            marginVertical: '3%'
                        }}>
                            <Text style={{ ...styles.textLarge, fontWeight: 'normal' }}>Color</Text>

                            <View>

                                <FlatList
                                    data={dataSanPham[0].MauSac}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item }) => {
                                        return item.checked == true ? (
                                            <View style={{
                                                ...styles.flexRow,
                                                marginHorizontal: '5%',
                                                marginVertical: 3

                                            }}>
                                                <TouchableOpacity style={{
                                                    ...styles.colorCicle,
                                                    backgroundColor: item.MaMau,
                                                    borderWidth: 1,

                                                    justifyContent: 'center',
                                                    alignItems: 'center'

                                                }}
                                                    onPress={() => setChooseColor(item.TenMau)}
                                                >
                                                    {chooseColor === item.TenMau ?
                                                        <View style={{
                                                            ...styles.colorCicle,
                                                            width: 10,
                                                            height: 10,
                                                            backgroundColor: CUSTOM_COLOR.White,
                                                            borderWidth: 0
                                                        }}>

                                                        </View> : null}

                                                </TouchableOpacity>
                                                <Text style={{ ...styles.textSmall }}>{item.TenMau}</Text>

                                            </View>
                                        ) :
                                            <View></View>
                                    }
                                    }
                                    numColumns={2}
                                />




                            </View>


                        </View>

                        <View style={{ ...styles.flexRow }}>
                            <Text style={{
                                ...styles.textLarge,
                                fontWeight: 'normal',
                                marginHorizontal: '10%',
                                marginVertical: '3%'
                            }}>Size</Text>

                            <View>
                                <FlatList

                                    data={dataSanPham[0].Size}
                                    numColumns={3}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item }) => {
                                        return item.checked == true ?
                                            <TouchableOpacity style={{
                                                ...styles.sizeCircle,
                                                width: 45,
                                                marginVertical: 5,

                                                borderWidth: chooseSize === item.title ? 1 : 0

                                            }}
                                                onPress={() => setChooseSize(item.title)}
                                            >
                                                <Text>{item.title}</Text>
                                            </TouchableOpacity>
                                            : <View></View>
                                    }}

                                />

                            </View>


                        </View>

                        <View style={{
                            ...styles.flexRow,
                            justifyContent: 'center',
                            marginVertical: '6%'
                        }}>
                            <Button
                                title='DONE'
                                color={CUSTOM_COLOR.Carnation}
                                onPress={() => setChooseStyle(false)}
                            />

                        </View>

                    </View> : null}

            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White
    },
    textLarge: {
        fontSize: 20,
        fontWeight: 'bold',
        color: CUSTOM_COLOR.Black
    },
    colorCicle: {
        height: 20,
        width: 20,
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 5,
    },
    textSmall: {
        color: CUSTOM_COLOR.Black,
        marginHorizontal: '2%'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sizeCircle: {
        width: 25,
        height: 25,
        backgroundColor: CUSTOM_COLOR.Alto,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },
    btnCount: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CUSTOM_COLOR.Alto,
        marginHorizontal: 15
    },
    btnSize: {
        width: 25,
        height: 25,
        backgroundColor: CUSTOM_COLOR.Alto,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    }

})

export default DetailProduct