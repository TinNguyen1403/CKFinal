import { StyleSheet, Text, View, Image, ImageProps } from 'react-native'
import React from 'react'
import FONT_FAMILY from '../constants/fonts'
import CUSTOM_COLOR from '../constants/colors'
import { IC_Chat } from '../../CustomerView/assets/icons'
interface PersonProps {
  avartar: string;
  name: string;
  id: String;
}

const Person = (props: PersonProps) => {
  return (
    <View style={{ marginTop: 10, width: '100%', height: 60, borderBottomWidth: 0.5, flexDirection: 'row' }}>
      <Image
        source = {props.avartar ? { uri: props.avartar } : IC_Chat}
        style={{ width: 40, aspectRatio: 1, borderRadius: 55, marginTop: 15, marginLeft: 15 }}
        resizeMode="cover"
      >
      </Image>
      <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 13 }}>
        <Text style={{ color: CUSTOM_COLOR.Black, fontWeight: 'bold' }}>{props.name}</Text>
        <Text style={{ marginTop: 1, fontWeight: 'bold', fontStyle: 'italic' }}>Customer</Text>
      </View>
    </View>
  )
}

export default Person;

const styles = StyleSheet.create({})