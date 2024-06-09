import React from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";

import CUSTOM_COLOR from "../constants/colors";
import CustomerBottomTab from "../navigation/CustomerBottomTab";


const Promotion = (props: any) => {

    return (
        <View style={{
            paddingHorizontal: 10,
            //marginVertical: 10,
            flexDirection: 'row',
            //marginHorizontal: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: CUSTOM_COLOR.Alto,
            borderRadius: 10,
            paddingVertical: 10,
            width: props.show ? null : '90%',
            ...props.style
        }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <Image
                    source={{ uri: props.source }}
                    style={{
                        width: 80,
                        height: 80,
                        marginHorizontal: 10
                    }}
                />

                <View style={{
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: CUSTOM_COLOR.Black,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>{props.title}</Text>
                    <Text style={{
                        color: CUSTOM_COLOR.Black
                    }}>Đơn tối thiểu {props.minimum} đ</Text>
                    <Text>{props.expiry}</Text>
                </View>

            </View>

            {props.show ?

                <TouchableOpacity style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10
                }}
                    onPress={props.onPress}
                >
                    {props.checkSelect ?
                        <View style={{
                            width: 10,
                            height: 10,
                            borderRadius: 10,
                            backgroundColor: CUSTOM_COLOR.Black
                        }}>

                        </View> : null}


                </TouchableOpacity>

                : null}
        </View>
    )

};

export default Promotion