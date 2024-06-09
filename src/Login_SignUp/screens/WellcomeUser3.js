import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {IMG_PexelsPhotobyJeysTubianosa} from '../assets/images/index.js';
import {IC_Ellipse1, IC_Ellipse2} from '../assets/icons/index.js';
import WellcomeCardEnd from '../components/Cards/WellcomeCardEnd.js';

const WellcomeUser3 = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <WellcomeCardEnd
        image={IMG_PexelsPhotobyJeysTubianosa}
        title="Nâng tầm phong cách"
        content="Bạn đã sẵn sàng tạo nên sự khác biệt?"
        image1={IC_Ellipse2}
        image2={IC_Ellipse2}
        image3={IC_Ellipse1}
        text="Đăng nhập"
        onPress={() => navigation.navigate('SignIn')}
        onPress1={() => navigation.navigate('SignUp')}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default WellcomeUser3;
