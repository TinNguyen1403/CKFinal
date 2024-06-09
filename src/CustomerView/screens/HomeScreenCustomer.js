import dayjs from 'dayjs';
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Badge } from 'react-native-elements';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { Firestore, firebase } from '../../../Firebase/firebase';
import PromotionCard from '../../AdminView/components/PromotionCard';
import { IC_Chat, IC_ShoppingCart } from '../assets/icons';
import Categories from '../components/Categories';
import ProductView from '../components/ProductView';
import SearchInput from '../components/SearchInput';
import CUSTOM_COLOR from '../constants/colors';

//import { get } from "firebase/database";

function HomeScreenCustomer({ navigation }) {
  const [trending, setTrending] = useState([]);
  const [danhmuc, setDanhMuc] = useState([]);
  const [chatUser, setChatUser] = useState();
  const [loadingChatUser, setLoadingChatUser] = useState(false);
  const [idUser, setIdUser] = useState();
  const [badgeCart, setBadgeCart] = useState(0);
  const [dataPromotion, setDataPromotion] = useState([]);
  const [search, setSearch] = useState(true);
  const [sanpham, setSanPham] = useState([]);
  const getSanPham = async () => {
    //const querySnapshot = await getDocs(collection(Firestore, "MATHANG"));
    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('TrangThai', '==', 'Inventory'),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const items = [];
      querySnapshot.forEach(doc => {
        items.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setSanPham(items);
    });
  };


  const getDataTrending = async () => {
    //const querySnapshot = await getDocs(collection(Firestore, "MATHANG"));
    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('Trending', '==', true),
      where('TrangThai', '==', 'Inventory'),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const items = [];
      querySnapshot.forEach(doc => {
        items.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setTrending(items);
    });
  };

  const getDataDanhMuc = async () => {
    const q = query(collection(Firestore, 'DANHMUC'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const items = [];
      querySnapshot.forEach(doc => {
        items.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setDanhMuc(items);
    });
  };

  const getDataChatUser = async () => {
    const q = query(
      collection(Firestore, 'CHAT'),
      where('MaND', '==', firebase.auth().currentUser.uid),
    );

    const unsubscribe = onSnapshot(q, async querySnapshot => {
      querySnapshot.forEach(doc => {
        setChatUser(doc.data());
        console.log(doc.data());
      });
    });
  };

  const getBadgeCart = () => {
    const q = query(
      collection(Firestore, 'GIOHANG'),
      where('MaND', '==', firebase.auth().currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      setBadgeCart(data.length);
    });
  };

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
    getDataTrending();
    getDataDanhMuc();
    getDataChatUser();
    setIdUser(firebase.auth().currentUser.uid);
    getBadgeCart();
    getDataPromotion();
    getSanPham();
    console.log(chatUser);
  }, [loadingChatUser]);

  const setSoLuongChuaDocCuaCustomer = async () => {
    const chatUpdateRef = doc(Firestore, 'CHAT', chatUser.MaChat);

    await updateDoc(chatUpdateRef, {
      SoLuongChuaDocCuaCustomer: 0,
    });
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (searchTerm, data) => {
    if (searchTerm === '') {
      setSearch(true);
    }
    else {
      setSearch(false);
      setSearchTerm(searchTerm);
      const filteredItems = data.filter(item =>
        item.TenSP.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredItems(filteredItems);
    }

  };

  return (
    <View
      style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}
      nestedScrollEnabled={true}>
      <View
        style={{
          width: '100%',
          height: 70,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={{ width: '5%', height: '100%' }} />

        <View style={{ width: '65%', height: 45 }}>

          <SearchInput
            placeholder="Search product"
            style={{
              width: '70%',
              margin: 10,
            }}
            onSearch={(searchTerm) => handleSearch(searchTerm, sanpham)}

          />
        </View>
        <View style={{ width: 10, height: '100%' }} />
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            backgroundColor: CUSTOM_COLOR.Mercury,
            alignItems: 'center',
            justifyContent: 'center',
            // marginVertical: 10,
            // padding: 8,
            borderRadius: 10,
          }}
          onPress={() => {
            setSoLuongChuaDocCuaCustomer();
            navigation.navigate('Chat', { chatUser });
          }}>
          {chatUser && chatUser.SoLuongChuaDocCuaCustomer != 0 ? (
            <Badge
              value={chatUser.SoLuongChuaDocCuaCustomer}
              status="error"
              containerStyle={{ position: 'absolute', top: -5, right: -5 }}
            />
          ) : null}

          <Image source={IC_Chat} />
        </TouchableOpacity>

        <View style={{ width: 10, height: '100%' }} />

        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            backgroundColor: CUSTOM_COLOR.Mercury,
            alignItems: 'center',
            justifyContent: 'center',
            // marginVertical: 10,
            // padding: 8,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('ShoppingCard', { idUser });
          }}>
          {badgeCart != 0 ? (
            <Badge
              value={badgeCart}
              status="error"
              containerStyle={{ position: 'absolute', top: -5, right: -5 }}
            />
          ) : null}
          <Image source={IC_ShoppingCart} />
        </TouchableOpacity>
      </View>

      {search ? (
        <>
          <GestureHandlerRootView>
          <ScrollView>
            <Text style={styles.textView}>On sale</Text><View
              style={{
                height: 175,
              }}>
              <Swiper
                autoplay
                loop
                style={{
                  flexDirection: 'row',

                  height: '90%',
                }}>
                {dataPromotion
                  ? dataPromotion.map((promotion, index) => {
                    const timestampBD = promotion.NgayBatDau.toDate();
                    const dateBD = dayjs(timestampBD);

                    const dayBD = dateBD.date();
                    const monthBD = dateBD.month();
                    const yearBD = dateBD.year();

                    const timestampKT = promotion.NgayKetThuc.toDate();
                    const dateKT = dayjs(timestampKT);

                    const dayKT = dateKT.date();
                    const monthKT = dateKT.month();
                    const yearKT = dateKT.year();

                    return (
                      <PromotionCard
                        source={promotion.HinhAnhKM}
                        name={promotion.TenKM}
                        discount={promotion.TiLe * 100}
                        minimum={promotion.DonToiThieu}
                        start={`${dayBD}/${monthBD}/${yearBD}`}
                        end={`${dayKT}/${monthKT}/${yearKT}`}
                        type={promotion.Loai}
                        key={index} />
                    );
                  })
                  : null}
              </Swiper>
            </View><View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: -40,
              }}>
              <Text style={styles.textView}>Trending now</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Trending');
                }}>
                <Text style={{ margin: 20 }}>See all</Text>
              </TouchableOpacity>
            </View><View style={{}}>
              <FlatList
                windowSize={10}
                horizontal={true}
                data={trending}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: -10,
                    }}
                    onPress={() => {
                      navigation.navigate('DetailProduct', { item });
                    }}>
                    <ProductView
                      source={item.HinhAnhSP[0]}
                      title={item.TenSP}
                      price={item.GiaSP} />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.MaSP} />
            </View><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.textView}>Orther categories</Text>
              <TouchableOpacity>
                <Text style={{ margin: 20 }}>Explore now</Text>
              </TouchableOpacity>
            </View>
            {/*
          <FlatList


          data={danhmuc}

          renderItem={({ item }) =>
            <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
              onPress={() => { navigation.navigate('DetailCategory', { item }) }}
            >
              <Categories
                source={item.AnhDM}
                title={item.TenDM}
              />
            </TouchableOpacity>


          }
          keyExtractor={item => item.MaDM}
          /> */}
            {danhmuc
              ? danhmuc.map(item => (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('DetailCategory', { item });
                  }}
                  key={item.MaDM}>
                  <Categories source={item.AnhDM} title={item.TenDM} />
                </TouchableOpacity>
              ))
              : null}
          </ScrollView>
          </GestureHandlerRootView>
        </>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={searchTerm ? filteredItems : sanpham}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={{
                  flexDirection: 'row',
                  //justifyContent: 'space-around'
                }}
                  onPress={() => { navigation.navigate('DetailProduct', { item }) }}
                >
                  <ProductView
                    source={item.HinhAnhSP[0]}
                    title={item.TenSP}
                    price={item.GiaSP}
                  />
                </TouchableOpacity>
              )
            }}

            numColumns={2}
          //keyExtractor={(item) => item.MASP}
          />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  textView: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
    fontSize: 20,
  },
});

export default HomeScreenCustomer;
