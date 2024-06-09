import React, {useEffect, useState} from 'react';

import {collection, onSnapshot, query} from 'firebase/firestore';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Firestore} from '../../../Firebase/firebase';
import {IC_Back} from '../../CustomerView/assets/icons';
import ButtonDetail from '../components/ButtonDetail';
import ItemList from '../components/ItemList';
import CUSTOM_COLOR from '../constants/colors';

export default function Categories({navigation}) {
  const [dataCategories, setDataCategories] = useState([]);

  const getDataCategories = () => {
    const q = query(collection(Firestore, 'DANHMUC'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push({...doc.data()});
      });
      setDataCategories(data);
    });
  };

  useEffect(() => {
    getDataCategories();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={IC_Back}
            style={{
              width: 10,
              height: 20,
              marginHorizontal: 20,
              marginVertical: 15,
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            color: CUSTOM_COLOR.Black,
            fontWeight: 'bold',
          }}>
          Categories
        </Text>
      </View>

      <ScrollView
        style={{
          backgroundColor: CUSTOM_COLOR.Alto,
          height: '85%',
        }}>
        {dataCategories.map((category, index) => {
          return (
            <ItemList
              key={index}
              source={category.AnhDM}
              namelist={category.TenDM}
              numberitem={category.SoLuongSP}
              onPress={() => navigation.navigate('DetailsCategory', {category})}
            />
          );
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <ButtonDetail
          title={'Add new Category'}
          color={CUSTOM_COLOR.DarkOrange}
          onPress={() => navigation.navigate('AddNewCategory')}
          style={{
            width: '90%',
            height: 55,
            marginVertical: 10,
            padding: 10,
          }}
        />
      </View>
          {/* <View style={{width: '100%', height: 50}}/> */}
      {/* <ItemList
                source={'https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fproduct%2FPhuKien.jpg?alt=media&token=8d72397d-464a-4dfb-9883-05b2df136b93&_gl=1*p1305q*_ga*OTc0NTU2MzEuMTY3OTQ5NTU1MQ..*_ga_CW55HF8NVT*MTY4NTQ3MzQ3NC43MS4xLjE2ODU0NzYwODYuMC4wLjA'}
                namelist={"Áo nam"}
                numberitem={3}

            /> */}
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: CUSTOM_COLOR.White,
//     },
//     headerContainer: {
//         width: '90%',
//         height: 60,
//         marginHorizontal: '5%',
//         alignItems: 'center'
//     },
// })
