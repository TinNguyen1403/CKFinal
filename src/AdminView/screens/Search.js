import { default as React } from 'react'
import { StyleSheet, View } from 'react-native'
import Search from '../components/Search'
import CUSTOM_COLOR from '../constants/colors'
import Size from '../constants/size'
export default function SearchSrc({navigation}) {
  return (
    <View
      style={{
        backgroundColor: CUSTOM_COLOR.White,
        width: '100%',
        height: Size.DeviceHeight,
      }}>
      <Search/>
    </View>
  );
}

const styles = StyleSheet.create({});
