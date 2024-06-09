import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Firestore} from '../../../Firebase/firebase';
import {IC_Back, IC_ShoppingCart} from '../assets/icons';
import ProductView from '../components/ProductView';
import SearchInput from '../components/SearchInput';
import SortDropdown from '../components/SortDropDown';
import CUSTOM_COLOR from '../constants/colors';
import {Badge} from 'react-native-elements';
import {firebase} from '../../../Firebase/firebase';

function TrendingScreen({navigation}) {
  const [trending, setTrending] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortType, setSortType] = useState('');
  const [badgeCart, setBadgeCart] = useState(0);
  const [idUser, setIdUser] = useState();

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

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
  };
  const handleSort = type => {
    setSortType(type);
  };

  const getDataTrending = async () => {
    //const querySnapshot = await getDocs(collection(Firestore, "MATHANG"));

    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('Trending', '==', true),
    );

    const querySnapshot = await getDocs(q);

    const items = [];

    querySnapshot.forEach(documentSnapshot => {
      items.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      });
    });
    let sortedItems = items;

    if (sortType === 'a-z') {
      sortedItems = items.sort((a, b) => a.TenSP.localeCompare(b.TenSP));
    } else if (sortType === 'z-a') {
      sortedItems = items.sort((a, b) => b.TenSP.localeCompare(a.TenSP));
    } else if (sortType === 'low-to-high') {
      sortedItems = items.sort((a, b) => a.GiaSP - b.GiaSP);
    } else if (sortType === 'high-to-low') {
      sortedItems = items.sort((a, b) => b.GiaSP - a.GiaSP);
    }

    let filteredItems = items;
    if (searchTerm != null) {
      filteredItems = items.filter(item =>
        item.TenSP.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else {
      setTrending(items);
    }
    setTrending(filteredItems);
  };

  useEffect(() => {
    getDataTrending();
    getBadgeCart();
    setIdUser(firebase.auth().currentUser.uid);

    // const interval = setInterval(() => getData(), 5000); // Lặp lại phương thức lấy dữ liệu sau mỗi 5 giây
    // return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, [searchTerm, sortType]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 65,
          justifyContent: 'center',
          alignItems: 'center',
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
              margin: 20,
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <View style={{width: '70%', height: '75%'}}>
          <SearchInput onSearch={handleSearch} />
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

      <View>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: 30,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Trending now
        </Text>
      </View>
      <SortDropdown onSelectSort={handleSort} />
      <View
        style={{
          height: '80%',
        }}>
        <FlatList
          data={trending}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  //justifyContent: 'space-around'
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

export default TrendingScreen;
