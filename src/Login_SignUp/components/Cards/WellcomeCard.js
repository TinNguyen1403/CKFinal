import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
} from 'react-native';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';
import CustomButton from '../Buttons/CustomButton.js';

const WellcomeCard = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={props.image}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.botContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleStyle}>{props.title}</Text>

            <Text style={styles.contentStyle}>{props.content}</Text>
          </View>

          <View style={styles.chooseContainer}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={props.image1}
                style={{width: '60%', height: '60%', resizeMode: 'contain'}}
              />
            </View>

            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={props.image2}
                style={{width: '60%', height: '60%', resizeMode: 'contain'}}
              />
            </View>

            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={props.image3}
                style={{width: '60%', height: '60%', resizeMode: 'contain'}}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              type="primary"
              text={props.text}
              onPress={props.onPress}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  botContainer: {
    backgroundColor: CUSTOM_COLOR.White,
    width: '90%',
    height: '35%',
    marginHorizontal: '5%',
    borderRadius: 25,
    bottom: '-22%',
  },
  textContainer: {
    width: '90%',
    height: '35%',
    marginHorizontal: '5%',
    top: '8%',
  },
  titleStyle: {
    fontSize: 25,
    fontFamily: FONT_FAMILY.Semibold,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
  contentStyle: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.Light,
    color: CUSTOM_COLOR.Black,
    top: '10%',
  },
  chooseContainer: {
    width: '30%',
    height: '12%',
    marginHorizontal: '35%',
    top: '6%',
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '180%',
    height: '25%',
    top: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-40%',
  },
});
export default WellcomeCard;
