import React from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";

import CUSTOM_COLOR from "../constants/colors";
import CustomerBottomTab from "../navigation/CustomerBottomTab";


const Delivery = (props: any) => {

    return (
        <View style={{
            //paddingHorizontal: 10,
            paddingVertical: 10,
            //marginVertical: 10,
            flexDirection: 'row',
            //marginHorizontal: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: CUSTOM_COLOR.Alto,
            borderRadius: 10,
            ...props.style
        }}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {props.show ?

                    <TouchableOpacity style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 2
                    }}
                        onPress={props.onPressChoose}
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

                <View style={{
                    marginHorizontal: 10,
                    width: props.show ? '80%' : "95%"
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 3
                    }}>

                        <Text style={{
                            color: CUSTOM_COLOR.Black,
                            fontSize: 16,
                            marginRight: 5
                        }}>{props.name}</Text>
                        <Text style={{
                            fontSize: 16,
                            marginRight: 5
                        }}>|</Text>
                        <Text style={{
                            fontSize: 16,
                            marginRight: 5
                        }}>{props.phoneNumber}</Text>

                    </View>

                    <Text>{props.address}</Text>
                    <Text>{props.ward} Ward, {props.district} District, {props.city} City</Text>
                </View>

                {props.show ?

                    <TouchableOpacity
                        onPress={props.onPressEdit}
                    >
                        <Text style={{
                            fontSize: 17,
                            color: CUSTOM_COLOR.FlushOrange,
                            fontStyle: 'italic'
                        }}>Edit</Text>

                    </TouchableOpacity>

                    : null}
            </View>


        </View>
    )

};

export default Delivery