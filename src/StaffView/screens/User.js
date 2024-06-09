import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CUSTOM_COLOR from '../constants/colors'
import FONT_FAMILY from '../constants/fonts'
//Acount la du lieu mau ve tai khoan
import { Acount } from './OverView'
import { settingicon } from '../assets/icons'
import Search from '../components/Search'
import Button from '../components/Button'
import ButtonDetail from '../components/ButtonDetail'
import OneStaff from '../components/OneStaff'
import { IM_AnhGiay1 } from '../../CustomerView/assets/images'
export default function User() {
  return (
    <View style = {{width: "100%", backgroundColor: CUSTOM_COLOR.White}}>
      <View style={{ width: '100%', height: 110, flexDirection: 'row', borderBottomWidth: 0.5 }}>
        <Image
          source={IM_AnhGiay1}
          style={{ width: 75, aspectRatio: 1, borderRadius: 55, marginTop: 20, marginLeft: 20 }}
          resizeMode="cover"
        >
        </Image>
        <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 30 }}>
          <Text style={{ fontFamily: FONT_FAMILY.Semibold, color: CUSTOM_COLOR.Black, fontWeight: 'bold' }}>{Acount.name}</Text>
          <Text style={{ marginTop: 5, fontFamily: FONT_FAMILY.Semibold, color: CUSTOM_COLOR.Black, fontWeight: 'bold' }}>ID:{Acount.id}</Text>
        </View>
      </View>
      <View style = {{height: 100, width: "100%", flexDirection: 'row'}}>
        <Search
          placeholder = 'Search'
          style = {{width: 200, height: 35, backgroundColor: CUSTOM_COLOR.White}}
        >
        </Search>
        <ButtonDetail
            title='Add new staff'
            style={{ width: 160, height: 35, marginTop: 10 }}
            //onPress={() => { navigation.....}
            color={CUSTOM_COLOR.FlushOrange}
          ></ButtonDetail>
          
      </View>
      <View>
            <OneStaff
              Name= 'Nguyen Trung Tinh'
              Status= 'Working'
              //onPress = {()=>{navigation....}}
              
            ></OneStaff>
            {/* <FlatList>

            </FlatList> */}
          </View>
    </View>
  )
}

const styles = StyleSheet.create({})