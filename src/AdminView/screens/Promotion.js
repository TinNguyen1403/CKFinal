import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors';
import CustomHeader from '../components/CustomHeader';
import PromotionButton from '../components/PromotionButton';
import PromotionCard from '../components/PromotionCard';
import { IC_Back, IC_Momo } from '../../CustomerView/assets/icons';
import { IM_MauAo } from '../assets/images';
import { Firestore, Storage } from '../../../Firebase/firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import dayjs from 'dayjs';

const Promotion = props => {
  const { navigation } = props;
  const [dataPromotion, setDataPromotion] = useState([]);

  const getDataPromotion = async () => {
    const q = query(collection(Firestore, 'KHUYENMAI'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      setDataPromotion(data);
    });
  };

  useEffect(() => {
    getDataPromotion();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', height: 10 }} />

      <>
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
            Promotions
          </Text>
        </View>
      </>

      <View style={{ width: '100%', height: 5 }} />

      <>
        <View style={styles.listViewContainer}>
          <FlatList
            data={dataPromotion}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const timestampBD = item.NgayBatDau.toDate();
              const dateBD = dayjs(timestampBD);

              const dayBD = dateBD.date();
              const monthBD = dateBD.month();
              const yearBD = dateBD.year();

              const timestampKT = item.NgayKetThuc.toDate();
              const dateKT = dayjs(timestampKT);

              const dayKT = dateKT.date();
              const monthKT = dateKT.month();
              const yearKT = dateKT.year();

              console.log(item);
              return (
                <PromotionCard
                  source={item.HinhAnhKM}
                  name={item.TenKM}
                  discount={item.TiLe * 100}
                  minimum={item.DonToiThieu}
                  start={`${dayBD}/${monthBD}/${yearBD}`}
                  end={`${dayKT}/${monthKT}/${yearKT}`}
                  type={item.Loai}
                  onPress={() => navigation.navigate('EditPromotion', { item })}
                />
              );
            }}
          />
        </View>
      </>

      <View style={{ width: '100%', height: 10 }} />

      <>
        <View style={styles.buttonContainer}>
          <PromotionButton
            type="secondary"
            text="Add new"
            onPress={() => {
              navigation.navigate('AddPromotion');
            }}
          />
        </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  headerContainer: {
    width: '90%',
    height: 60,
    marginHorizontal: '5%',
  },
  listViewContainer: {
    width: '100%',
    height: '75%',
  },
  buttonContainer: {
    width: '90%',
    height: 55,
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Promotion;
