import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import CUSTOM_COLOR from '../constants/colors';

const LoadingComponent = ({text}) => (
  <View style={styles.container}>
    <ActivityIndicator
      style={styles.loadingContainer}
      size="large"
      color={CUSTOM_COLOR.DarkBlue}
    />
    {text && <Text style={styles.text}>{text}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
  },
});

export default LoadingComponent;
