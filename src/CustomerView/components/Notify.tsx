import React from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";


const Notify = (props: any) => {

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>

      <Image source={{ uri: props.source }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 30,
          margin: 10,

        }}
      />

      <View style={{
        width: '75%'
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          <Text style={{
            fontSize: 17,
            fontWeight: 'bold'
          }}>{props.title}</Text>
          <Text style={{


          }}>{props.time}</Text>
        </View>

        <Text>{props.content}</Text>
      </View>

    </View>
  )

};

export default Notify