import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import {IMG_image1, IMG_Rectangle} from '../assets/images/index.js';
import {IC_Line} from '../assets/icons/index.js';
import CustomButton from '../components/Buttons/CustomButton.js';

const Intro = props => {
  const {navigation} = props;
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); // 2 seconds delay

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <ImageBackground
          source={IMG_image1}
          resizeMode="cover"
          style={styles.image}>
          <ImageBackground
            source={IMG_Rectangle}
            resizeMode="cover"
            style={styles.image}>
            <>
              <View style={styles.containeTop}>
                <View style={styles.viewTop}>
                  <Image
                    source={IC_Line}
                    style={{width: '100%', height: '10%', top: '10%'}}
                  />
                  <Text style={styles.baseText}>THO</Text>
                </View>

                <View style={styles.viewBot}>
                  <View style={styles.flexbot}>
                    <Image
                      source={IC_Line}
                      style={{width: '100%', height: '10%'}}
                    />
                  </View>

                  <View style={styles.flexbot}>
                    <Text style={styles.botBaseText}>SHOP</Text>
                  </View>

                  <View style={styles.flexbot}>
                    <Image
                      source={IC_Line}
                      style={{width: '100%', height: '10%'}}
                    />
                  </View>
                </View>
              </View>
            </>

            <>
              <View style={styles.buttonContainer}>
                <CustomButton
                  type="primary"
                  text="Bắt Đầu"
                  onPress={() => navigation.navigate('WellcomeUser1')}
                />
              </View>

              <View style={styles.containeBottom}>
                <Text style={styles.botBaseText}>
                  Đón đầu xu hướng thời trang
                </Text>
              </View>
            </>
          </ImageBackground>
        </ImageBackground>
      </>
      {/* {isLoading ? (
      ) : (
        navigation.navigate('WellcomeUser1')
      )} */}
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
  containeTop: {
    width: '90%',
    height: '23%',
    top: '-10%',
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTop: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '65%',
  },
  baseText: {
    fontSize: 85,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.Regular,
    color: CUSTOM_COLOR.White,
  },
  viewBot: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
  },
  flexbot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botBaseText: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.Semibold,
    color: CUSTOM_COLOR.White,
  },
  buttonContainer: {
    width: '180%',
    height: '10%',
    bottom: '-25%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-40%',
  },
  containeBottom: {
    width: '90%',
    height: '15%',
    bottom: '-20%',
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
export default Intro;
