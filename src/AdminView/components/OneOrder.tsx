import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CUSTOM_COLOR from '../constants/colors';

const OneOrder = (props: any) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        marginTop: 10,
        marginVertical: 10,
      }}>
      <View
        style={{width: '100%', borderBottomWidth: 0.5, flexDirection: 'row'}}>
        <Image
          source={{uri: props.source}}
          style={{width: 100, height: 100, marginLeft: 35}}
          resizeMode="cover"
        />
        <View style={{flexDirection: 'column', marginLeft: 10, width: 250}}>
          <Text>{props.title}</Text>
          <Text style={{fontWeight: 'bold'}}>{props.price} VND</Text>
          <Text>x{props.number}</Text>
          <Text>Màu sắc: {props.color}</Text>
          <Text>Size: {props.size}</Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold'}}>Total</Text>
            <Text style={{fontWeight: 'bold', marginRight: 20}}>
              {props.totalPrice} VND
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OneOrder;

const styles = StyleSheet.create({});
