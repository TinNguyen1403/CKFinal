import React from "react";
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ViewComponent } from "react-native";
import { IC_Clock } from "../assets/icons";
import CUSTOM_COLOR from "../constants/colors";
import StarRating from "./StarRating";


const Review = (props: any) => {

    return (

        <View style={{ flex: 1 }}>
            <View style={{
                ...styles.flexRow,
                justifyContent: 'space-between',
                marginHorizontal: '4%',
                ...props.style

            }}>
                <View style={{
                    ...styles.flexRow
                }}>
                    <Image source={{uri: props.avatar}}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 30,
                            marginRight: '5%'
                        }}
                    />

                    <View>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: CUSTOM_COLOR.Black
                        }}>{props.name}</Text>

                        <View style={{
                            ...styles.flexRow,
                        }}>
                            <Image source={IC_Clock}
                                style={{
                                    width: 15,
                                    height: 15,
                                    marginRight: '3%'
                                }}
                            />
                            <Text>{props.time}</Text>
                        </View>
                    </View>

                </View>

                <View>
                    <Text style={{
                        alignSelf: 'flex-end',
                        fontSize: 16,
                        color: CUSTOM_COLOR.Black
                    }}>{props.rating} rating</Text>
                    <StarRating
                        nums={5}
                        fill={props.rating}
                    />
                </View>
            </View>

            <View style={{
                marginHorizontal: '4%',
                marginVertical: '2%'
            }}>
                <Text style={{
                    fontSize: 16,

                }}>{props.content}</Text>
            </View>

            {props.image != null ?
                <View style={{
                    marginHorizontal: '4%',

                }}>
                    <Image
                        source={{ uri: props.image }}
                        style={{
                            borderRadius: 20,
                            width: 100,
                            height: 100
                        }}
                    />
                </View> : null}
        </View>

    )

};

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
export default Review