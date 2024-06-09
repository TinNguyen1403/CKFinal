import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { IC_StartCorner, IC_StartFull } from '../assets/icons';

const CustomRatingBar = () => {
    const [defaultRating, setDefaultRating] = useState(2);
  // To set the max number of Stars
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  // Filled Star. You can also give the path from local
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? IC_StartCorner
                    : IC_StartFull
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  
  export default CustomRatingBar;
  const styles = StyleSheet.create({
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
      },
      starImageStyle: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
      },
  })
  
