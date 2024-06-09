import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import {React, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Firestore} from '../../../Firebase/firebase';
import CUSTOM_COLOR from '../../StaffView/constants/colors.js';
import {backto} from '../assets/icons/index.js';
import ItemList from '../components/ItemList';
import ProductView from '../components/ProductView';
import Search from '../components/Search';
import SortDropdown from '../components/SortDropDown';
import scale from '../constants/responsive.js';
import {Acount} from '../../StaffView/screens/OverView';
function ViewShop1({navigation}) {
  const [detail, setdetail] = useState(false);
  const [product, setproduct] = useState(true);
  const [items, setItems] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [selectedDanhMuc, setSelectedDanhMuc] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
  };
  const handleSort = type => {
    setSortType(type);
  };
  // Lấy MaDM khi người dùng click vào danh mục
  const handleDanhMucClick = MaDM => {
    setSelectedDanhMuc(MaDM);
  };
  const getItems = async () => {
    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('TrangThai', '==', 'Inventory'),
    );
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      let sortedItems = data;

      if (sortType === 'a-z') {
        sortedItems = data.sort((a, b) => a.TenSP.localeCompare(b.TenSP));
      } else if (sortType === 'z-a') {
        sortedItems = data.sort((a, b) => b.TenSP.localeCompare(a.TenSP));
      } else if (sortType === 'low-to-high') {
        sortedItems = data.sort((a, b) => a.GiaSP - b.GiaSP);
      } else if (sortType === 'high-to-low') {
        sortedItems = data.sort((a, b) => b.GiaSP - a.GiaSP);
      }
      let filteredItems = data;
      if (searchTerm != null) {
        filteredItems = data.filter(itemData =>
          itemData.TenSP.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      } else {
        setItems(data);
      }
      setItems(filteredItems);
    });
  };
  const getDataCategory = async () => {
    const q = query(collection(Firestore, 'DANHMUC'));

    const querySnapshot = await getDocs(q);

    const items = [];

    querySnapshot.forEach(documentSnapshot => {
      items.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      });
    });
    let filteredItems = items;
    if (searchTerm != null) {
      filteredItems = items.filter(itemData =>
        itemData.TenDM.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else {
      setDataCategory(data);
    }
    setDataCategory(filteredItems);
  };
  const getDataCategories = async () => {
    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('MaDM', '==', selectedDanhMuc),
    );
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach(documentSnapshot => {
      data.push({
        ...documentSnapshot.data(),
      });
    });
    let sortedItems = data;

    if (sortType === 'a-z') {
      sortedItems = data.sort((a, b) => a.TenSP.localeCompare(b.TenSP));
    } else if (sortType === 'z-a') {
      sortedItems = data.sort((a, b) => b.TenSP.localeCompare(a.TenSP));
    } else if (sortType === 'low-to-high') {
      sortedItems = data.sort((a, b) => a.GiaSP - b.GiaSP);
    } else if (sortType === 'high-to-low') {
      sortedItems = data.sort((a, b) => b.GiaSP - a.GiaSP);
    }

    let filteredItems = data;
    if (searchTerm != null) {
      filteredItems = data.filter(itemData =>
        itemData.TenSP.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else {
      setDataCategories(data);
    }
    setDataCategories(filteredItems);
  };

  useEffect(() => {
    getItems();
    getDataCategories();
    getDataCategory();
  }, []); // Gọi lại hàm getDataCategory khi component được tạo lần đầu

  useEffect(() => {
    getItems();
    getDataCategories();
    getDataCategory();
  }, [searchTerm, sortType, selectedDanhMuc]); // Gọi lại hàm getDataCategory mỗi khi searchTerm thay đổi
  if (product == true && detail == false) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: CUSTOM_COLOR.White,
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: 180,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: CUSTOM_COLOR.LavenderBlush,
          }}>
          <View style={{width: '100%', height: 10}} />
          <View style={{width: '90%', height: 50, marginHorizontal: '5%'}}>
            <Search onSearch={handleSearch} />
          </View>
          <Image
            style={{
              width: scale(72),
              height: scale(72),
              aspectRatio: 1,
              borderRadius: 55,
              marginTop: 5,
            }}
            source={{uri: Acount.avartar}}
            resizeMode="contain"
          />
          <Text
            style={{
              color: CUSTOM_COLOR.Black,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 2,
            }}>
            FAUGET
          </Text>
        </View>
        <View style={{width: '100%', height: 40, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              width: '50%',
              height: '100%',
              borderBottomWidth: 2,
              borderColor: CUSTOM_COLOR.Red,
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginTop: 5,
                color: CUSTOM_COLOR.DarkOrange,
                fontSize: 20,
              }}>
              Product
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setproduct(false)}
            style={{
              width: '50%',
              height: '100%',
              alignItems: 'center',
              color: CUSTOM_COLOR.Black,
            }}>
            <Text style={{marginTop: 5, fontSize: 20}}>List Item</Text>
          </TouchableOpacity>
        </View>
        <SortDropdown onSelectSort={handleSort} />
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginTop: 14,
          }}
        />
        <View style={{width: '100%', height: '90%', flex: 1}}>
          <FlatList
            nestedScrollEnabled={true}
            data={items}
            numColumns={2}
            renderItem={({item}) => {
              return (
                //<TouchableOpacity
                //  onPress={() => navigation.navigate('ViewShop2')}
                //style = {{
                //flexDirection: 'row',
                //justifyContent: 'space-around'
                // }}>
                <ProductView
                  onPress={() => {
                    navigation.navigate('ViewShop2', {item});
                  }}
                  source={item.HinhAnhSP[0]}
                  title={item.TenSP}
                  price={item.GiaSP}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    if (product == false && detail == false) {
      return (
        <SafeAreaView
          style={{
            backgroundColor: CUSTOM_COLOR.White,
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              width: '100%',
              height: 180,
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: CUSTOM_COLOR.LavenderBlush,
            }}>
            <View style={{width: '100%', height: 10}} />
            <View style={{width: '90%', height: 50, marginHorizontal: '5%'}}>
              <Search onSearch={handleSearch} />
            </View>
            <Image
              style={{
                width: scale(72),
                height: scale(72),
                aspectRatio: 1,
                borderRadius: 55,
                marginTop: 5,
              }}
              source={{uri: Acount.avartar}}
              resizeMode="contain"
            />
            <Text
              style={{
                color: CUSTOM_COLOR.Black,
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 2,
              }}>
              FAUGET
            </Text>
          </View>
          <View style={{width: '100%', height: 40, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setproduct(true)}
              style={{width: '50%', height: '100%', alignItems: 'center'}}>
              <Text
                style={{marginTop: 5, fontSize: 20, color: CUSTOM_COLOR.Black}}>
                Product
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '50%',
                height: '100%',
                borderBottomWidth: 2,
                borderColor: CUSTOM_COLOR.Red,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 5,
                  color: CUSTOM_COLOR.DarkOrange,
                  fontSize: 20,
                }}>
                List Item
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', height: '65%'}}>
            <FlatList
              data={dataCategory}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      //justifyContent: 'space-around'
                    }}>
                    <ItemList
                      source={item.AnhDM}
                      namelist={item.TenDM}
                      numberitem={item.SoLuongSP}
                      onPress={() =>
                        navigation.navigate('ViewDetailsinList', {item})
                      }
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={{
            backgroundColor: CUSTOM_COLOR.White,
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              width: '100%',
              height: 180,
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: CUSTOM_COLOR.LavenderBlush,
            }}>
            <Search onSearch={handleSearch} />
            <Image
              style={{
                width: scale(72),
                height: scale(72),
                aspectRatio: 1,
                borderRadius: 55,
                marginTop: 5,
              }}
              source={{uri: imageUrl}}
              resizeMode="contain"
            />
            <Text
              style={{
                color: CUSTOM_COLOR.Black,
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 2,
              }}>
              FAUGET
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 30,
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => setdetail(false)}
              style={{width: 17, height: 17, marginLeft: 18, marginTop: 5}}>
              <Image
                resizeMode="contain"
                source={backto}
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
            <Text
              style={{color: CUSTOM_COLOR.Black, fontSize: 18, marginLeft: 10}}>
              List Item
            </Text>
          </View>
          <SortDropdown onSelectSort={handleSort} />
          <View>
            <FlatList
              horizontal={false}
              data={dataCategories}
              key={2}
              numColumns={2}
              renderItem={({item}) => {
                return (
                  <ProductView
                    onPress={() => {
                      navigation.navigate('ViewShop2', {item});
                    }}
                    source={item.HinhAnhSP[0]}
                    title={item.TenSP}
                    price={item.GiaSP}
                  />
                  //</View> </TouchableOpacity>
                );
              }}
            />
          </View>
        </SafeAreaView>
      );
    }
  }
}
export default ViewShop1;
