import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import { IC_Attachment, IC_Back, IC_Camera, IC_Emo, IC_Send } from "../../CustomerView/assets/icons";
import { IM_AnhGiay2 } from "../assets/images";
import Message from "../components/Message";
import CUSTOM_COLOR from "../constants/colors";
import { collection, query, where, onSnapshot, Timestamp, addDoc, updateDoc, orderBy, doc, getDoc } from "firebase/firestore";
import { Firestore } from "../../../Firebase/firebase";
import { async } from "@firebase/util";
import { set } from "firebase/database";


function ChatScreenStaff({ navigation, route }) {

    const { item } = route.params;

    const [message, setMessage] = useState([])
    const [chat, setChat] = useState('')


    const getDataMessage = async () => {
        const q = query(collection(Firestore, "CHITIETCHAT"), orderBy("ThoiGian", "asc"), where("MaChat", "==", item.MaChat));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            console.log(data);
            setMessage(data)
        });
    }

    const getSoLuongChuaDocCuaCustomer = async () => {
        const chatDocRef = doc(Firestore, "CHAT", item.MaChat);

        const docSnapshot = await getDoc(chatDocRef);

        if (docSnapshot.exists()) {
            console.log("Current data: ", docSnapshot.data().SoLuongChuaDocCuaCustomer);
            return docSnapshot.data().SoLuongChuaDocCuaCustomer;
        }

        // Trả về giá trị mặc định của hàm, nếu không có dữ liệu trả về từ getDoc()
        return 0;
    }

    const SendMessage = async () => {
        console.log(1)
        const currentTime = new Date();
        const docRef = await addDoc(collection(Firestore, "CHITIETCHAT"), {
            NoiDung: chat,
            LaNguoiMua: false,
            ThoiGian: Timestamp.fromDate(currentTime),
            MaChat: item.MaChat
        });
        console.log("Document written with ID: ", docRef.id);

        const updateId = await updateDoc(docRef, {
            MaCTChat: docRef.id
        })

        const chatDocRef = doc(Firestore, "CHAT", item.MaChat);

        const soLuongChuaDocCuaCustomer = await getSoLuongChuaDocCuaCustomer();

        const updateChat = await updateDoc(chatDocRef, {
            SoLuongChuaDocCuaCustomer: soLuongChuaDocCuaCustomer + 1,
            ThoiGian: Timestamp.fromDate(currentTime)
        })


        setChat('')
    }

    useEffect(() => {
        getDataMessage();
    }, [])

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: CUSTOM_COLOR.White,
                paddingVertical: '1%'
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

                <Image
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 30,

                    }}

                    source={{ uri: item.Avatar }}
                />

                <Text style={{
                    marginHorizontal: '5%',
                    fontSize: 17,
                    fontWeight: 'bold'
                }}>{item.TenND}</Text>

            </View>

            <ScrollView style={{
                backgroundColor: CUSTOM_COLOR.Gallery
            }}>
                {message.map((message, index) => {
                    const hour = message.ThoiGian.toDate().getHours();
                    const minute = message.ThoiGian.toDate().getMinutes();

                    return (
                        <Message
                            key={index}
                            content={message.NoiDung}
                            time={`${hour}:${minute}`}
                            isRight={!message.LaNguoiMua}
                        />
                    )
                })}

            </ScrollView>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',

                backgroundColor: CUSTOM_COLOR.Gallery

            }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: CUSTOM_COLOR.White,
                    paddingHorizontal: '2%',
                    borderRadius: 25,
                    marginHorizontal: '3%',
                    marginVertical: '2%',
                    width: '80%'
                }}>

                    <Image
                        style={{
                            width: 20,
                            height: 20,
                            marginHorizontal: '2%'
                        }}
                        source={IC_Emo}
                    />

                    <TextInput
                        placeholder='Hello, I have a problem'
                        style={{
                            width: '70%'
                        }}

                        onChangeText={(text) => setChat(text)}
                        value={chat}
                    />

                    <Image
                        style={{
                            width: 10,
                            height: 20,
                            marginHorizontal: '2%'
                        }}
                        resizeMode='stretch'
                        source={IC_Attachment}
                    />
                    <Image
                        style={{
                            width: 22,
                            height: 20,
                            marginLeft: '2%',

                        }}
                        source={IC_Camera}
                    />
                </View>

                <TouchableOpacity style={{
                    height: 45,
                    width: 45,
                    borderRadius: 30,
                    backgroundColor: CUSTOM_COLOR.ChathamsBlue,
                    alignItems: "center",
                    justifyContent: 'center'
                }}
                    onPress={() => {
                        SendMessage()
                    }}
                >
                    <Image
                        source={IC_Send}

                    />

                </TouchableOpacity>
            </View>



        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: CUSTOM_COLOR.White

    },



})

export default ChatScreenStaff