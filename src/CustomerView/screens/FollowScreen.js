import { query } from 'firebase/database';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  where,
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
import { Firestore, firebase } from '../../../Firebase/firebase';
import { IC_Chat, IC_Heart3X, IC_ShoppingCart } from '../assets/icons';
import Button from '../components/Button';
import ProductView from '../components/ProductView';
import SearchInput from '../components/SearchInput';
import CUSTOM_COLOR from '../constants/colors';
function FollowScreen({navigation}) {
  //
  const [chatUser, setChatUser] = useState();
  const [loadingChatUser, setLoadingChatUser] = useState(false);
  const [idUser, setIdUser] = useState();
  const [badgeCart, setBadgeCart] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  //
  const [data, setdata] = useState([]);
  const [sanpham, setSanPham] = useState([]);
  //

  const [filteredItems, setFilteredItems] = useState([]);
  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
    const filteredItems = data.filter(item =>
      item.TenSP.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filteredItems);
  };
  
  const getDataYeuThich = async () => {
    const q = query(
      collection(Firestore, 'YEUTHICH'),
      where('MaND', '==', firebase.auth().currentUser.uid),
    );
    const querySnapshot = onSnapshot(q, async snapshot => {
      const items = [];

      snapshot.forEach(documentSnapshot => {
        items.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      let datatest = [];

      for (let i = 0; i < items.length; i++) {
        const q = query(
          collection(Firestore, 'SANPHAM'),
          where('MaSP', '==', items[i].MaSP),
        );
        const querySnapshot = await getDocs(q);
        console.log(items[i].MaSP);
        const teap = [];

        querySnapshot.forEach(documentSnapshot => {
          teap.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        datatest = datatest.concat(teap);
      }
      setdata(datatest);
    });
    // Trả về querySnapshot để sử dụng trong hàm useEffect được nếu cần thiết
  };

  useEffect(() => {
    getDataYeuThich();
    getDataChatUser();
    getBadgeCart();
    setIdUser(firebase.auth().currentUser.uid);
  }, []);

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
  //
  const getDataChatUser = async () => {
    const q = query(
      collection(Firestore, 'CHAT'),
      where('MaND', '==', firebase.auth().currentUser.uid),
    );

    const unsubscribe = onSnapshot(q, async querySnapshot => {
      if (querySnapshot.size == 0) {
        const currentTime = new Date();
        const docRef = await addDoc(collection(Firestore, 'CHAT'), {
          MaND: firebase.auth().currentUser.uid,
          ThoiGian: Timestamp.fromDate(currentTime),
        });

        const updateRef = doc(Firestore, 'CHAT', docRef.id);
        await updateDoc(updateRef, {
          MaChat: docRef.id,
        });

        setLoadingChatUser(true);
      }
      querySnapshot.forEach(doc => {
        setChatUser(doc.data());
      });
    });
  };

  const setSoLuongChuaDocCuaCustomer = async () => {
    const chatUpdateRef = doc(Firestore, 'CHAT', chatUser.MaChat);

    await updateDoc(chatUpdateRef, {
      SoLuongChuaDocCuaCustomer: 0,
    });
  };
  //
  if (data.length == 0) {
    return (
      <View style={styles.container}>
        <Image
          source={IC_Heart3X}
          style={{
            width: 100,
            height: 100,
          }}
        />

        <Text
          style={{
            fontSize: 17,
            marginVertical: 10,
          }}>
          Your Love is empty
        </Text>
        <Button
          color={CUSTOM_COLOR.FlushOrange}
          title="SHOP NOW"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <View
          style={{
            width: '100%',
            height: 70,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{width: '5%', height: '100%'}} />

          <View style={{width: '65%', height: 45}}>
            <SearchInput
              placeholder="Search product"
              style={{
                width: '70%',
                margin: 10,
              }}
              onPressIn={() => {
                navigation.navigate('Searching');
              }}
              onSearch={handleSearch}
            />
          </View>

          <View style={{width: 10, height: '100%'}} />

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
              navigation.navigate('Chat', {chatUser});
            }}>
            {chatUser && chatUser.SoLuongChuaDocCuaCustomer != 0 ? (
              <Badge
                value={chatUser.SoLuongChuaDocCuaCustomer}
                status="error"
                containerStyle={{position: 'absolute', top: -5, right: -5}}
              />
            ) : null}

            <Image source={IC_Chat} />
          </TouchableOpacity>

          <View style={{width: 10, height: '100%'}} />
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
              navigation.navigate('ShoppingCard', {idUser});
            }}>
            {badgeCart != 0 ? (
              <Badge
                value={badgeCart}
                status="error"
                containerStyle={{position: 'absolute', top: -5, right: -5}}
              />
            ) : null}
            <Image source={IC_ShoppingCart} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            marginLeft: 20,
            marginTop: 15,
            fontSize: 20,
            color: CUSTOM_COLOR.Black,
            fontWeight: 'bold',
          }}>
          Product Liked
        </Text>
        <View style={{marginTop: 20}}>
          <FlatList
            data={searchTerm ? filteredItems : data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                  onPress={() => {
                    navigation.navigate('DetailProduct', {item});
                  }}>
                  <ProductView
                    source={item.HinhAnhSP[0]}
                    title={item.TenSP}
                    price={item.GiaSP}
                  />
                </TouchableOpacity>
              );
            }}
            numColumns={2}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.White,
  },
});

export default FollowScreen;
