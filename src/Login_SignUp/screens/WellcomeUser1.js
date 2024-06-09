import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {IMG_PexelsPhotobyMarleneLeppanen} from '../assets/images/index.js';
import {IC_Ellipse1, IC_Ellipse2} from '../assets/icons/index.js';
import WellcomeCard from '../components/Cards/WellcomeCard.js';

const WellcomeUser1 = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <WellcomeCard
        image={IMG_PexelsPhotobyMarleneLeppanen}
        title="Fashion for all"
        content="Thời trang cho mọi người"
        image1={IC_Ellipse1}
        image2={IC_Ellipse2}
        image3={IC_Ellipse2}
        text="Tiếp theo"
        onPress={() => navigation.navigate('WellcomeUser2')}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default WellcomeUser1;
