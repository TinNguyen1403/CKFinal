import { View, Text, Image } from 'react-native'
import React from 'react'
import { IM_AnhGiay1 } from '../../CustomerView/assets/images'
import ButtonDetail from './ButtonDetail'
import CUSTOM_COLOR from '../constants/colors'


const OneStaff = (props: any) => {
  return (
    //Loan xu ly phan doi mau nha, tui set san no mau xam
    <View style = {{flexDirection: 'row', backgroundColor: CUSTOM_COLOR.LightGray, width: '100%', height: 80}}>
      <Image
        style={{ width: 64, aspectRatio: 1, borderRadius: 55, marginTop: 10, marginLeft: 20 }}
            //de soure do loan sua lai nha
        source={IM_AnhGiay1}
        resizeMode= 'contain'
      >
      </Image>
      <View style = {{flexDirection: 'column', marginTop: 12, marginLeft: 15}}>
        <Text style ={{ color: CUSTOM_COLOR.Black}}>
            {props.Name}
        </Text>
        <View style = {{flexDirection: 'row', marginTop: 15}}>
            <Text style = {{fontWeight: 'bold', color: CUSTOM_COLOR.Black}}>Status:</Text>
            <Text style = {{fontWeight: 'bold',marginLeft: 20, color: CUSTOM_COLOR.Black}}>{props.Status}</Text>
        </View>
      </View>
      <View>
      <ButtonDetail
            title='Edit'
            style={{ width: 40, height: 35, marginTop: 20, marginLeft: '30%' }}
            onPress={props.onPress}
            color={CUSTOM_COLOR.FlushOrange}
      ></ButtonDetail>
      </View>
    </View>
  )
}

export default OneStaff