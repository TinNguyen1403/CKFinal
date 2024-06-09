import { View, Text ,TouchableOpacity, Image} from 'react-native'
import React from 'react'
import CUSTOM_COLOR from '../../StaffView/constants/colors.js';
const Button = (props:any) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
        <Image 
        source={props.source}
        style= {{width: '50%',
        height: '70%',
        marginLeft: '31%',
        }}
        resizeMode='contain'
        ></Image>
        </TouchableOpacity>

  )
}

export default Button