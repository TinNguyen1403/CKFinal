import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {IMG_PexelsPhotobyRAULREYNOSO} from '../assets/images/index.js';
import {IC_Ellipse1, IC_Ellipse2} from '../assets/icons/index.js';
import WellcomeCard from '../components/Cards/WellcomeCard.js';

const WellcomeUser2 = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <WellcomeCard
        image={IMG_PexelsPhotobyRAULREYNOSO}
        title="Change your mind"
        content="Thay đổi suy nghĩ của bạn"
        image1={IC_Ellipse2}
        image2={IC_Ellipse1}
        image3={IC_Ellipse2}
        text="Tiếp theo"
        onPress={() => navigation.navigate('WellcomeUser3')}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default WellcomeUser2;
