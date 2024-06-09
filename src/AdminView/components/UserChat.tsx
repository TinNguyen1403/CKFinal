import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CUSTOM_COLOR from '../constants/colors'
import { Acount } from '../screens/OverView'
const UserChat = (props: any) => {
  return (
    <TouchableOpacity style={{
      marginTop: 13,
      flexDirection: 'row',
      width: '100%',
      height: 70,
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
      onPress={props.onPress}>

      <View style={{
        flexDirection: 'row'
      }}>


        <Image
          resizeMode='contain'
          source={{ uri: props.source }}
          style={{ height: 65, marginLeft: 20, aspectRatio: 1, borderRadius: 55 }}
        ></Image>
        <View style={{ flexDirection: 'column', marginTop: 7, marginLeft: 10 }}>
          <Text style={{ color: CUSTOM_COLOR.Black, fontWeight: 'bold', fontSize: 20 }}>{props.name}</Text>
          <Text style={{
            marginTop: 5,
            fontStyle: 'italic',
            fontWeight: props.notification == 0 && !props.justCreate ? 'normal' : "bold",
            color: props.notification == 0 && !props.justCreate ? CUSTOM_COLOR.SilverChalice : CUSTOM_COLOR.Black

          }}>{props.message} - {props.time}</Text>
        </View>

      </View>

      {props.justCreate || props.notification != 0 ?

        <View style={{
          width: 20,
          height: 20,
          backgroundColor: CUSTOM_COLOR.Red,
          borderRadius: 20,
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

          <Text style={{

            color: CUSTOM_COLOR.White
          }}>{props.justCreate ? "N" : props.notification}</Text>

        </View> : null}

    </TouchableOpacity>
  )
}

export default UserChat

const styles = StyleSheet.create({})