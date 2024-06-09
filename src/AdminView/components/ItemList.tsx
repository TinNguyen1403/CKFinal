import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CUSTOM_COLOR from '../constants/colors'
import { back } from '../assets/icons'
const ItemList = (props: any) => {
  return (
    <TouchableOpacity style={{
      marginTop: 9, flexDirection: 'row', width: '100%', height: 70, elevation: 3,
      shadowColor: CUSTOM_COLOR.Black, backgroundColor: CUSTOM_COLOR.White, alignItems: 'center', justifyContent: 'space-between',
      marginRight: 20
    }}
      onPress={props.onPress}
    >
      <View style={{
        flexDirection: 'row', alignItems: 'center'
      }}>
        <Image
          resizeMode='cover'
          source={{ uri: props.source }}
          style={{ height: 50, width: 50, marginLeft: 20 }}
        ></Image>
        <View style={{ flexDirection: 'column', marginLeft: 30 }}>
          <Text style={{ color: CUSTOM_COLOR.Black, fontSize: 18 }}>{props.namelist}</Text>
          <Text style={{ marginTop: 5, fontStyle: 'italic' }}>{props.numberitem} Product</Text>
        </View>

      </View>
      <Image
        resizeMode='contain'
        source={back}
        style={{ marginRight: 20, width: 10, height: 10 }} />

    </TouchableOpacity>
  )
}

export default ItemList

const styles = StyleSheet.create({})