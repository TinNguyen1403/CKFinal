import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import ButtonDetail from './ButtonDetail';
import { WareHouse, Love, Sold, ViewPerSon, IC_Add } from '../assets/icons';
import CUSTOM_COLOR from '../constants/colors';
import { ic_add } from '../assets/images';
const MyProduct1 = (props: any) => {
  return (
    <View
      style={{
        // marginTop: 15,
        width: '100%',
        // height: 230,
        borderBottomWidth: 0.5,
        flexDirection: 'column',
      }}>
      <View style={{ width: '100%', height: 20 }} />
      <View
        style={{
          width: '100%',
          height: 100,
          borderBottomWidth: 0.5,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Image
          source={{ uri: props.source }}
          style={{ width: 80, height: 80, marginLeft: 15 }}
          resizeMode="cover"
        />
        <View style={{ flexDirection: 'column', marginLeft: 10, width: 230 }}>
          <Text style={{ fontSize: 20, color: CUSTOM_COLOR.Black, fontWeight: 'bold' }}>{props.title}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.price} VND</Text>
        </View>

        <TouchableOpacity style={{

        }}
          onPress={props.AddAmount}
        >
          <Image source={IC_Add}
            style={{
              width: 30,
              height: 30,
              tintColor: CUSTOM_COLOR.DarkOrange
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          height: 70,
          borderBottomWidth: 0.5,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '50%',
            height: 70,
            marginLeft: '10%',
            justifyContent: 'space-around',
            flexDirection: 'column',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={WareHouse}
              style={{ width: 20, height: 20 }}
              resizeMode="stretch"
            />
            <Text style={{ marginLeft: 10 }}>WareHouse: </Text>
            <Text>{props.soluongtonkho}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={Love}
              style={{ width: 20, height: 20 }}
              resizeMode="stretch"
            />
            <Text style={{ marginLeft: 10 }}>Love: </Text>
            <Text>{props.soluonglove}</Text>
          </View>
        </View>
        <View
          style={{
            width: '50%',
            height: 70,
            justifyContent: 'space-around',
            flexDirection: 'column',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={Sold}
              style={{ width: 20, height: 20 }}
              resizeMode="stretch"
            />
            <Text style={{ marginLeft: 10 }}>Sold Out: </Text>
            <Text>{props.soluongban}</Text>
          </View>

        </View>
      </View>

      {props.type === 'Hidden' ? (
        <View
          style={{
            width: '100%',
            height: 55,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <ButtonDetail
            title="Show"
            color={CUSTOM_COLOR.DarkOrange}
            onPress={props.show}
            style={styles.button}
          />

        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: 55,
            // marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ButtonDetail
            title="Hide"
            color={CUSTOM_COLOR.DarkOrange}
            onPress={props.hide}
            style={styles.button}
          />
          <ButtonDetail
            title="Edit"
            color={CUSTOM_COLOR.DarkOrange}
            onPress={props.edit}
            style={styles.button}
          />
        </View>
      )}
      <View
        style={{
          width: '100%',
          height: 10,
          backgroundColor: CUSTOM_COLOR.LightGray,
        }}
      />
      <View
        style={{
          width: '100%',
          height: 10,
          backgroundColor: CUSTOM_COLOR.White,
        }}
      />
    </View>
  );
};

export default MyProduct1;

const styles = StyleSheet.create({
  button: {
    width: '35%',
    height: '80%',
    marginHorizontal: 20,
  },
});
