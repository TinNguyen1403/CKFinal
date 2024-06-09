import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatList,GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Firestore} from '../../../Firebase/firebase';
import {SearchIcon} from '../../CustomerView/assets/icons';
import BackTo from '../components/BackTo';
import ButtonDetail from '../components/ButtonDetail';
import MyProduct1 from '../components/MyProductOne';
import SearchButton from '../components/SearchButton';
import Status from '../components/Status';
import CUSTOM_COLOR from '../constants/colors';

export default function MyProduct({navigation}) {
  const [inventory, setinventory] = useState(true);
  const [Out, setOut] = useState(false);
  const [Wait, setWait] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataOnWait, setDataOnWait] = useState([]);
  const [dataOutOfStock, setDataOutOfStock] = useState([]);
  const [dataInventory, setDataInventory] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (searchTerm, data) => {
    setSearchTerm(searchTerm);
    const filteredItems = data.filter(item =>
      item.TenSP.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredItems(filteredItems);
  };
  const ConfirmProduct = item => {
    const confirmRef = doc(Firestore, 'SANPHAM', item.MaSP);

    updateDoc(confirmRef, {
      TrangThai: 'Inventory',
    });

    getDadaOnWait();
  };

  const HideSanPham = item => {
    const confirmRef = doc(Firestore, 'SANPHAM', item.MaSP);
    updateDoc(confirmRef, {
      TrangThai: 'Hidden',
    });
  };
  const ShowSanPham = item => {
    const confirmRef = doc(Firestore, 'SANPHAM', item.MaSP);
    updateDoc(confirmRef, {
      TrangThai: 'Inventory',
    });
  };

  const getDadaOnWait = async () => {
    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('TrangThai', '==', 'Hidden'),
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      setDataOnWait(data);
    });
  };

  const getDadaOutOfStock = async () => {
    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('TrangThai', '==', 'OutOfStock'),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      setDataOutOfStock(data);
    });
  };

  const getDadaInventory = async () => {
    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('TrangThai', '==', 'Inventory'),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      setDataInventory(data);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen A is focused');
      getDadaOnWait();
      getDadaOutOfStock();
      getDadaInventory();
    });
    getDadaOnWait();
    getDadaOutOfStock();
    getDadaInventory();
    //const interval = setInterval(() => getDadaOnWait(), 5000); // Lặp lại phương thức lấy dữ liệu sau mỗi 5 giây
    // return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, [dataOnWait.length, dataInventory.length, dataOutOfStock.length]);
  useEffect(() => {
    getDadaInventory();
  }, [searchTerm]);
  if (inventory == true) {
    return (
      <GestureHandlerRootView>
      <SafeAreaView style={{flex: 1, backgroundColor: CUSTOM_COLOR.White}}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Product" />
          <View
            style={{width: 20, height: 20, marginLeft: '55%', marginTop: 10}}>
            <SearchButton
              onSearch={searchTerm => handleSearch(searchTerm, dataInventory)}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="My inventory"
            Color={CUSTOM_COLOR.DarkOrange}
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            countProduct={dataInventory.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOut(true), setinventory(false);
            }}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(true), setinventory(false);
            }}
            title="Hidden"
            countProduct={dataOnWait.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <FlatList
            horizontal="true"
            data={searchTerm ? filteredItems : dataInventory}
            renderItem={({item}) => {
              return (
                <MyProduct1
                  source={item.HinhAnhSP[0]}
                  title={item.TenSP}
                  price={item.GiaSP}
                  soluongtonkho={item.SoLuongSP}
                  soluonglove={item.SoLuotYeuThich}
                  soluongview={item.SoLuotXem}
                  soluongban={item.SoLuongDaBan}
                  edit={() => navigation.navigate('EditProduct', {item})}
                  hide={() => HideSanPham(item)}
                  AddAmount={() => navigation.navigate('ImportProduct', {item})}
                />
              );
            }}
          />
        </View>

        <View style={{width: '100%', height: 10}} />
        <>
          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: CUSTOM_COLOR.White,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: 55,
                flexDirection: 'row',
                marginHorizontal: '5%',
                backgroundColor: CUSTOM_COLOR.White,
              }}>
              <ButtonDetail
                style={{width: '100%', height: '90%'}}
                color={CUSTOM_COLOR.DarkOrange}
                title="ADD A NEW PRODUCT"
                onPress={() => navigation.navigate('AddProduct')}
              />
            </View>
          </View>
        </>
      </SafeAreaView>
      </GestureHandlerRootView>
    );
  }
  if (Out == true) {
    return (
      <GestureHandlerRootView>
      <SafeAreaView style={{backgroundColor: CUSTOM_COLOR.White, flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Product" />
          <View
            style={{width: 20, height: 20, marginLeft: '55%', marginTop: 10}}>
            <SearchButton
              onSearch={searchTerm => handleSearch(searchTerm, dataOutOfStock)}
            />
          </View>

          {/* <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={SearchIcon}
              style={{width: 20, height: 20, marginLeft: '70%', marginTop: 10}}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="My invantory"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOut(false), setinventory(true);
            }}
            countProduct={dataInventory.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(true), setOut(false);
            }}
            title="Hidden"
            countProduct={dataOnWait.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <FlatList
            horizontal="true"
            data={searchTerm ? filteredItems : dataOutOfStock}
            renderItem={({item}) => {
              return (
                <MyProduct1
                  source={item.HinhAnhSP[0]}
                  title={item.TenSP}
                  price={item.GiaSP}
                  soluongtonkho={item.SoLuongSP}
                  soluonglove={item.SoLuotYeuThich}
                  soluongview={item.SoLuotXem}
                  soluongban={item.SoLuongDaBan}
                  edit={() => navigation.navigate('EditProduct')}
                />
              );
            }}
          />
        </View>

        <View style={{width: '100%', height: 10}} />
        <>
          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: CUSTOM_COLOR.White,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: 55,
                flexDirection: 'row',
                marginHorizontal: '5%',
                backgroundColor: CUSTOM_COLOR.White,
              }}>
              <ButtonDetail
                style={{width: '100%', height: '90%'}}
                color={CUSTOM_COLOR.DarkOrange}
                title="ADD A NEW PRODUCT"
                onPress={() => navigation.navigate('AddProduct')}
              />
            </View>
          </View>
        </>
      </SafeAreaView>
      </GestureHandlerRootView>
    );
  }
  if (Wait == true) {
    return (
      <GestureHandlerRootView>
      <SafeAreaView style={{flex: 1, backgroundColor: CUSTOM_COLOR.White}}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Product" />
          <View
            style={{width: 20, height: 20, marginLeft: '55%', marginTop: 10}}>
            <SearchButton
              onSearch={searchTerm => handleSearch(searchTerm, dataOnWait)}
            />
          </View>

          {/* <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={SearchIcon}
              style={{width: 20, height: 20, marginLeft: '70%', marginTop: 10}}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="My invantory"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(false), setinventory(true);
            }}
            countProduct={dataInventory.length}
          />
          <Status
            onPress={() => {
              setWait(false), setOut(true);
            }}
            Color={CUSTOM_COLOR.Black}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="Hidđen"
            countProduct={dataOnWait.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <GestureHandlerRootView>
          <FlatList
            horizontal="true"
            data={searchTerm ? filteredItems : dataOnWait}
            renderItem={({item}) => {
              return (
                <MyProduct1
                  source={item.HinhAnhSP[0]}
                  title={item.TenSP}
                  price={item.GiaSP}
                  soluongtonkho={item.SoLuongSP}
                  soluonglove={item.SoLuotYeuThich}
                  soluongview={item.SoLuotXem}
                  soluongban={item.SoLuongDaBan}
                  type="Hidden"
                  show={() => ShowSanPham(item)}
                />
              );
            }}
          /></GestureHandlerRootView>
        </View>

        <View style={{width: '100%', height: 10}} />
        <>
          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: CUSTOM_COLOR.White,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: 55,
                flexDirection: 'row',
                marginHorizontal: '5%',
                backgroundColor: CUSTOM_COLOR.White,
              }}>
              <ButtonDetail
                style={{width: '100%', height: '90%'}}
                color={CUSTOM_COLOR.DarkOrange}
                title="ADD A NEW PRODUCT"
                onPress={() => navigation.navigate('AddProduct')}
              />
            </View>
          </View>
        </>
      </SafeAreaView>
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({});
