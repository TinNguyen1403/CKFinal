import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import { TouchableWithoutFeedback,GestureHandlerRootView } from "react-native-gesture-handler";
import { AirbnbRating, Rating } from "react-native-ratings";
import { CurvedTransition } from "react-native-reanimated";
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";
import { backto, IC_Cancle, IC_Down, IC_Heart, IC_ShoppingCart } from "../assets/icons";
import { IM_MauAo } from "../assets/images";
import ButtonDetail from "../../StaffView/components/ButtonDetail";
import StarRating from "../../StaffView/components/StartRating";
import CUSTOM_COLOR from "../constants/colors";
import { collection, addDoc, doc, updateDoc, onSnapshot, query, deleteDoc, where, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import { Firestore, firebase } from "../../../Firebase/firebase";
import Swiper from 'react-native-swiper'
import { da } from "date-fns/locale";
import Button from "../../CustomerView/components/Button";
import { IC_Back } from "../../CustomerView/assets/icons";
function ViewShop2({ navigation, route }) {
    // const item = {"GiaSP": 139000, 
    // "HinhAnhSP": ["https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fproducts%2Fimage-1687527148817?alt=media&token=0467f3f5-a25e-470a-a5cb-d5bb8b4e2df2", "https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fproducts%2Fimage-1687527149745?alt=media&token=ae9f0bac-3b0b-4aba-ab0a-4582e6135f2d"], "MaDM": "lV95kTTz3PIxItriF4rU", "MaSP": "NtRoJWsfk1tH7niUcYu9",
    //  "MauSac": [{"MaMS": "J9e6EkiNPM6zJmDc2DV8", "MaMau": "#D73C2D", "TenMau": "Đỏ", "checked": true, "key": "J9e6EkiNPM6zJmDc2DV8"}, {"MaMS": "KeDTyP7uAAfU04hzqruV", "MaMau": "#EC65CF", "TenMau": "Hồng", "checked": true, "key": "KeDTyP7uAAfU04hzqruV"}, {"MaMS": "k8SlzWonYLXHBriMadH5", "MaMau": "#2D38D7", "TenMau": "Xanh", "checked": true, "key": "k8SlzWonYLXHBriMadH5"}], "MoTaSP": "Váy nữ cực đẹp mùa hè", 
    //  "Size": [{"checked": true, "id": "sizeS", "title": "S"}, {"checked": true, "id": "sizeM", "title": "M"}, {"checked": true, "id": "sizeL", "title": "L"}, {"checked": false, "id": "sizeXL", "title": "XL"}, {"checked": false, "id": "sizeXXL", "title": "XXL"}, {"checked": false, "id": "sizeXXXL", "title": "XXXL"}], "SoLuongDaBan": 0, "SoLuongSP": 40, "SoLuotXem": 0, "SoLuotYeuThich": 0, "TenSP": "Váy nữ", "TrangThai": "Inventory",
    //   "Trending": true, "key": "NtRoJWsfk1tH7niUcYu9"}
    const setTrending = async () => {
        try {
            const confirmRef = doc(Firestore, "SANPHAM", item.MaSP)
            await updateDoc(confirmRef, {
                Trending: true
            })
            Alert.alert('Notification', 'Set trending sucessful');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }
    const { item } = route.params
    const [chooseStyle, setChooseStyle] = useState(false)
    const [tong, settong] = useState()
    const [tb, settb] = useState()
    const [numProduct, setNumProduct] = useState(1)
    const [chooseColor, setChooseColor] = useState()
    const [chooseSize, setChooseSize] = useState()
    const [itemsCheckout, setItemsCheckout] = useState([])
    const [totalMoney, setTotalMoney] = useState()
    const [seeDetails, setSeeDetails] = useState(false)
    const getdataReview = () => {
        try {
            console.log('dahsddrejjjjg');
            console.log(item.MaSP);
            const q = query(collection(Firestore, "DANHGIA"), where("MaSP", "==", item.MaSP));
            const querySnapshot = onSnapshot(q, async (snapshot) => {
                const items = [];
                snapshot.forEach(documentSnapshot => {
                    items.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                console.log(items);
                let sum = 0;
                if (items.length != 0) {
                    for (let i = 0; i < items.length; i++) {
                        sum += items[i].Rating;
                    }
                    settong(items.length);
                    console.log(tong);
                    settb((Math.round(sum / items.length * 100) / 100).toFixed(2));
                    console.log(tb);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    // const getItemTest = async () =>{
    //     const q = query(collection(Firestore, "SANPHAM"), where("MaSP", "==", 'NtRoJWsfk1tH7niUcYu9'));

    //     const querySnapshot = await getDocs(q);

    //     const data = []
    //     querySnapshot.forEach((doc) => {

    //         data.push(doc.data())
    //         //console.log(doc.id, " => ", doc.data());
    //     });
    //     console.log(data)
    //     setItem(data);

    // }
    useEffect(() => {
        getdataReview()
    }, [])
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


            </View>


            <View style={{ width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center' }}>

                <Swiper
                    loop
                    autoplay
                >
                    {item.HinhAnhSP.map((image) => (

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                            key={image}
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
                        marginLeft: 40

                    }}>{item.TenSP}</Text>

                <Text
                    style={{
                        marginHorizontal: 50,
                        fontSize: 20,
                        color: CUSTOM_COLOR.Sunglow,
                        fontWeight: 'bold'
                    }}
                >{item.GiaSP}</Text>
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
                    onPress={() => navigation.navigate('ReviewScreen', { item })}
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



                    {item.MauSac.filter(color => color.checked == true).map(color => (
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
                    {item.Size.filter(size => size.checked == true).map((size, index) => (
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

            {/* <TouchableOpacity
                onPress={() => setChooseStyle(true)}
                style={{ alignSelf: 'flex-end', marginHorizontal: 20 }}
            >
                <Text style={{
                    fontStyle: 'italic'
                }}>How can I choose my size?</Text>
            </TouchableOpacity> */}

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
                    }}>{item.MoTaSP}</Text>
                </View>
                :
                null}

            <View style={{ width: '100%', height: 10 }} />
            <View style={{
                flexDirection: 'row', justifyContent: 'center',
                marginVertical: '3%'
            }}>
                <ButtonDetail
                    color={CUSTOM_COLOR.Carnation}
                    title='EDIT NOW'
                    style={{
                        // paddingVertical: '3%',
                        width: '40%',
                        height: 55,
                        marginHorizontal: '5%',
                    }}
                    onPress={() => { navigation.navigate('EditProduct', { item }) }}
                />
                <ButtonDetail
                    color={CUSTOM_COLOR.Carnation}
                    title='TRENDING'
                    style={{
                        // paddingVertical: '3%',
                        width: '40%',
                        height: 55,
                        marginHorizontal: '5%',
                    }}
                    onPress={setTrending}
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
                                data={item.MauSac}
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

                                data={item.Size}
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


})

export default ViewShop2