import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useState} from 'react'
import { IM_Logo } from '../assets/images'

export default function ThankScreen({navigation}) {
    const [name, setname] = useState()
  return (
    <View>
      <Image style = {{width: '100%', height: '20%'}}
      source={IM_Logo}
      ></Image>
    </View>
  )
}

const styles = StyleSheet.create({})