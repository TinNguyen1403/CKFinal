import React from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from "react-native";
import {getFocusedRouteNameFromRoute, NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { IC_Bell, IC_Heart, IC_Home, IC_User,} from "../assets/icons";

import CUSTOM_COLOR from "../constants/colors";
import StackHome from "./StackHome";
import NotificationScreen from "../screens/NotificationScreen";
import FollowScreen from "../screens/FollowScreen";
import AccountScreen from "../screens/AccountScreen";



const TabBottom = createBottomTabNavigator()


function CustomerBottomTab() {

    return (
      <NavigationContainer>
        <TabBottom.Navigator
          
            screenOptions={
               {
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                },
                
                tabBarShowLabel: false,
                
                headerShown: false,

                
               }

            }   

           
        
        >
            <TabBottom.Screen  name = 'StackHome' component={StackHome} options = {({route}) => ({

                tabBarLabel: 'Home',
                tabBarStyle: {display: getTabBarVisibility(route)},
                tabBarIcon: ({focused}) =>{
                    return( 
                        <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                            source={IC_Home}
                            resizeMode = 'stretch'
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? CUSTOM_COLOR.Carnation : CUSTOM_COLOR.ChathamsBlue
                            }}
                    
                        />
                        
                        </View>
                )
                
                    
                }

            })}/>

            <TabBottom.Screen name = 'Notification' component={NotificationScreen} options = {{
                tabBarLabel: 'Notification',
                tabBarIcon: ({focused}) =>{
                    return( 
                        <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                            source={IC_Bell}
                            resizeMode = 'stretch'
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? CUSTOM_COLOR.Carnation : CUSTOM_COLOR.ChathamsBlue
                            }}
                    
                        />
                            
                        </View>
                )
                   
                    
                }
            }}
            
            />

            <TabBottom.Screen name = 'FollowScreen' component={FollowScreen} 
            options = {{
                tabBarLabel: 'Follow',
                tabBarIcon: ({focused}) =>{
                    return( 
                        <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                            source={IC_Heart}
                            resizeMode = 'stretch'
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? CUSTOM_COLOR.Carnation : CUSTOM_COLOR.ChathamsBlue
                            }}
                    
                        />
                          
                        </View>
                )
                   
                    
                }
            }}
            />

            <TabBottom.Screen name = 'AccountScreen' component={AccountScreen} 
                options = {{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({focused}) =>{
                        return( 
                            <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                source={IC_User}
                                resizeMode = 'stretch'
                                style = {{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? CUSTOM_COLOR.Carnation : CUSTOM_COLOR.ChathamsBlue
                                }}
                        
                            />
                               
                            </View>
                    )           
                    }
                }}
            />

        </TabBottom.Navigator>


        

      </NavigationContainer>
      
    )
  }


const getTabBarVisibility = (route) =>{
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed'

    if (routeName == 'HomeScreen' || routeName == 'Feed'){
        return 'flex'
    } 
    return 'none'
}
  
export default CustomerBottomTab