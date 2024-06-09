import React from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from "react-native";
import { IC_Back, IC_Bank, IC_Banking, IC_HandMoney, IC_Location, IC_Momo, IC_MyLocation } from "../assets/icons";
import Button from "../components/Button";
import InputData from "../components/InputData";
import CUSTOM_COLOR from "../constants/colors";

function PaymentCardScreen({navigation}) {

 

    return (
      <View style = {styles.container}>

            <View style ={{
                flexDirection: 'row', 
                alignItems: 'center', 
                backgroundColor: CUSTOM_COLOR.White,
                height: 40
            }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image
                        source={IC_Back}
                        style = {{
                            width: '20%', 
                            height: '40%',
                            marginHorizontal: 20,
                            marginVertical: '20%'
                        }}
                        resizeMode = 'stretch'
                    />  
                </TouchableOpacity>
                    
              
                <Text style ={{
                    fontSize: 20,
                    color: CUSTOM_COLOR.Black, 
                    fontWeight: 'bold'
                }}>Payment</Text>
            </View>

            <View>
                <Image style ={{
                    width: 130,
                    height: 65,
                    marginVertical: '5%',
                    marginHorizontal: '10%'
                }}
                source ={IC_Bank}
                resizeMode = 'stretch'
                />
            </View>

            <View style = {{
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <InputData
                    title = 'Card Owner'
                    width = '85%'
                    placeholder  = 'Mr Sang'
                />
            </View>

            <View style = {{
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <InputData
                    title = 'Card Number'
                    width = '85%'
                    placeholder  = '5254 7634 4568 3457'
                />
            </View>
           
            <View style ={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <InputData
                    
                    title = 'EXP'
                    width = '40%'
                    placeholder = '24/24'
                />
                <InputData
                    
                    title = 'CVV'
                    width = '40%'
                    placeholder = '7763'
                />
            </View>

            <View style ={{
                position: 'absolute',
                top: '82%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style ={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <Button 
                        title = 'Add card'
                        color = {CUSTOM_COLOR.FlushOrange}
                        onPress = {() => navigation.navigate('PaymentMethod')}
                    />
                </View>
            </View>
            
      </View>
      
    )
  }


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White
  },
  radBtn: {
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: CUSTOM_COLOR.Whisper,
    borderWidth: 1, 
    marginRight: '10%'
    
  },
  viewMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '10%',
    borderBottomWidth: 1,
    borderBottomColor: CUSTOM_COLOR.Alto,
    marginVertical: '2%', 
    paddingVertical: '2%'
  },
  image:{
    width: 35,
    height: 35,
    marginHorizontal: '3%'
  },
  text:{
    fontSize: 17,
    color: CUSTOM_COLOR.Black
  }

})
  
export default PaymentCardScreen