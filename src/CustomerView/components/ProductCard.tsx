import React from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";


const ProductCard = (props: any) => {

  return (
    <View >

      <Image style={{ borderRadius: 10, borderWidth: 1, width: 100, height: 100, marginHorizontal: 10, marginTop: 10, marginBottom: 5 }}
        source={{ uri: props.source }}
      />
      <View style={{ alignItems: 'flex-start', width: 120, justifyContent: 'center', marginStart: 12 }}>
        <Text style={{
          fontSize: 15,
          fontWeight: 'bold'
        }}>{props.title}</Text>
        <Text>{props.price}</Text>
      </View>

    </View>
  )

};

export default ProductCard