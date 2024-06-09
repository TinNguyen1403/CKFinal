import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import HeaderWithBack from '../components/Header/HeaderWithBack.js';

const Policy = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Policy;
