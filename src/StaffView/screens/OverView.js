import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CUSTOM_COLOR from '../../StaffView/constants/colors.js';
import { createNavigationContainerRef } from '@react-navigation/native';
import {
  settingicon,
  messenger,
  notification,
  report,
  product,
  promotion,
  order,
  chat,
  user,
} from '../../StaffView/assets/icons/index.js';
import FONT_FAMILY from '../../StaffView/constants/fonts.js';
import ViewShop1 from './ViewShop1.js';
import Button from '../../StaffView/components/Button';
import ViewNow from '../../StaffView/components/ViewNow';
import { IC_logout } from '../assets/icons/index.js';
import { firebase, Firestore } from '../../../Firebase/firebase.js';
import FunctionCard from '../../AdminView/components/FunctionCard.js';
import { IC_financial, IC_messenger, IC_order, IC_product, IC_promotions, IC_User, IC_user } from '../../AdminView/assets/icons/index.js';
import MenuIcon from '../../AdminView/components/MenuIcon.js';

export const Acount = {
  name: 'Nguyen Trung Tinh',
  avartar:
    'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
  id: '21520115',
  address: 'Binh Tan, Ho Chi Minh',
  phone: '0704408389',
  sex: 'male',
  day: '16/12/2003',
  background:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9z5m7BtaVEQCqDkL5UI2QrBqr1EiCI6-YXA&usqp=CAU',
};
const Order = [
  {
    id: '1',
    number: 10,
    status: 'Wait',
  },
  {
    id: '2',
    number: 10,
    status: 'Cancel',
  },
  {
    id: '3',
    number: 10,
    status: 'Request',
  },
  {
    id: '4',
    number: 10,
    status: 'Review',
  },
];
function OverView({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      // Assume data is fetched here
      const fetchedData = 'Sample Data';
      setData(fetchedData);
      setIsLoading(false);
    }, 2000);

    fetchUserData(firebase.auth().currentUser.uid);
    fetchImageUrl(firebase.auth().currentUser.uid, 'Avatar').then(url =>
      setImageUrl(url),
    );

    console.log(userData)
    console.log(imageUrl)
  }, []);

  const fetchUserData = async userId => {
    try {
      const userRef = firebase.firestore().collection('NGUOIDUNG').doc(userId);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserData(userData);
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchImageUrl = async (documentId, fieldName) => {
    try {
      const documentSnapshot = await firebase
        .firestore()
        .collection('NGUOIDUNG')
        .doc(documentId)
        .get();
      const data = documentSnapshot.data();
      const imageUrl = data[fieldName];
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image URL:', error);
      return null;
    }

    ;
  };

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        backgroundColor: CUSTOM_COLOR.White,
        width: '100%',
        height: '100%',
      }}>

      <View style={styles.menuContainer}>
        <View style={{ width: 32, height: 37, marginHorizontal: 5 }}>
          <MenuIcon
            onPress={() => navigation.navigate('ChangeProfile')}
            source={IC_User}
          />
        </View>
        <View style={{ width: 10, height: '100%' }} />
        <View style={{ width: 30, height: 30, marginHorizontal: 5 }}>
          <MenuIcon
            onPress={() => navigation.navigate('Chat')}
            source={IC_messenger}
          />
        </View>
        {/* <View style={{width: 5, height: '100%'}} />
          <View style={{width: 35, height: 35}}>
            <MenuIcon
              onPress={() => navigation.navigate('Notification')}
              source={IC_notification}
            />
          </View> */}
        <View style={{ width: 5, height: '100%' }} />
        <View style={{ width: 32, height: 32, marginHorizontal: 5 }}>
          <MenuIcon
            onPress={() => {
              firebase.auth().signOut();
            }}
            source={IC_logout}
          />
        </View>
        <View style={{ width: 10, height: '100%' }} />
      </View>
      {/* <View style={{ width: '100%', height: '12%', flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.settingicon}
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={settingicon}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messengericon}
          onPress={() => {
            navigation.navigate('Chat');
          }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={messenger}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationicon}
          onPress={() => {
            navigation.navigate('Notification');
          }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={notification}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutContainer}
          onPress={() => {
            firebase.auth().signOut();
          }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={IC_logout}
            resizeMode="contain"
          />
        </TouchableOpacity>

      </View> */}
      <View
        style={{
          width: '100%',
          height: '2%',
          backgroundColor: CUSTOM_COLOR.SlateGray,
        }}
      />
      <View style={{ width: '100%', height: '17%', flexDirection: 'row' }}>

        {imageUrl ?
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: '21%',
              aspectRatio: 1,
              borderRadius: 55,
              marginTop: '3%',
              marginLeft: '3%',
            }}
            resizeMode="cover"
          /> :
          <Image
            source={IC_User}
            style={{
              width: '21%',
              aspectRatio: 1,
              borderRadius: 55,
              marginTop: '3%',
              marginLeft: '3%',
            }}
            resizeMode="cover"
          />
        }
        <View
          style={{ flexDirection: 'column', marginLeft: '3%', marginTop: '7%' }}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.Semibold,
              color: CUSTOM_COLOR.Black,
              fontWeight: 'bold',
            }}>
            {userData ? userData.TenND : null}
          </Text>
          <Text
            style={{
              marginTop: '3%',
              fontFamily: FONT_FAMILY.Semibold,
              color: CUSTOM_COLOR.Black,
              fontWeight: 'bold',
            }}>
            Staff
          </Text>
        </View>
        <View style={styles.viewShopContainer}>
          <TouchableOpacity style={styles.butViewShopContainer}>
            <Text
              style={{ color: CUSTOM_COLOR.Red }}
              onPress={() => navigation.navigate('ViewShop1')}>
              View Shop
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '2%',
          backgroundColor: CUSTOM_COLOR.SlateGray,
        }}
      />
      <View style={{ width: '100%', height: '20%' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              marginTop: '2%',
              marginLeft: '5%',
              fontWeight: 'bold',
              color: CUSTOM_COLOR.Black,
            }}>
            Order New
          </Text>
          <TouchableOpacity style={{ marginTop: '3%', marginLeft: '60%' }}>
            <Text
              style={{
                fontSize: 12,
                color: CUSTOM_COLOR.Black,
                fontWeight: 'bold',
              }}
              onPress={() => navigation.navigate('Order')}>
              View Now{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <FlatList
            horizontal={true}
            data={Order}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return <ViewNow number={item.number} status={item.status} />;
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '2%',
          backgroundColor: CUSTOM_COLOR.SlateGray,
        }}
      />

      <View style={styles.functionContainer}>
        <View style={styles.unitContainer}>
          <View style={styles.unitContainer}>
            <FunctionCard
              onPress={() => navigation.navigate('MyProduct')}
              source={IC_product}
              text="My Product"
            />
          </View>
          <View style={styles.unitContainer}>
            <FunctionCard
              onPress={() => navigation.navigate('Order')}
              source={IC_order}
              text="My Order"
            />
          </View>
          <View style={styles.unitContainer}>
            <FunctionCard
              onPress={() => navigation.navigate('Promotion')}
              source={IC_promotions}
              text="Promotions"
            />
          </View>
        </View>
        <View style={styles.unitContainer}>
          <View style={styles.unitContainer}>
            <FunctionCard
              onPress={() => navigation.navigate('Report')}
              source={IC_financial}
              text="Financial Report"
            />
          </View>
          <View style={styles.unitContainer}>

          </View>
          <View style={styles.unitContainer}>
            {/* <FunctionCard
                    onPress={() => navigation.navigate('ReviewScreen')}
                    source={IC_Review}
                    text="Manage Review"
                  /> */}
          </View>
        </View>
      </View>
      {/* <View style={{flexDirection: 'column', width: '100%', height: '40%'}}> */}
      {/* <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '30%',
            marginTop: '7%',
          }}>
          <Button
            source={product}
            onPress={() => navigation.navigate('MyProduct')}
          />
          <Button source={order} onPress={() => navigation.navigate('Order')} />
          <Button
            source={promotion}
            onPress={() => navigation.navigate('Promotion')}
          />
        </View> */}
      {/* <View style={{flexDirection: 'row', width: '100%', height: '10%'}}>
          <Text
            style={{
              color: CUSTOM_COLOR.Black,
              marginTop: '-3%',
              marginLeft: '8%',
            }}>
            My Product
          </Text>
          <Text
            style={{
              color: CUSTOM_COLOR.Black,
              marginTop: '-3%',
              marginLeft: '16%',
            }}>
            My Order
          </Text>
          <Text
            style={{
              color: CUSTOM_COLOR.Black,
              marginTop: '-3%',
              marginLeft: '16%',
            }}>
            Promotions
          </Text>
        </View> */}
      {/* <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '30%',
            marginTop: '3%',
          }}>
          <Button
            source={report}
            onPress={() => navigation.navigate('Report')}
          />
          <Button source={chat} onPress={() => navigation.navigate('Chat')} />
        
        </View> */}
      {/* <View style={{flexDirection: 'row', width: '100%'}}>
          <Text
            style={{
              color: CUSTOM_COLOR.Black,
              marginTop: '-3%',
              marginLeft: '6%',
            }}>
            Finances Report
          </Text>
          <Text
            style={{
              color: CUSTOM_COLOR.Black,
              marginTop: '-3%',
              marginLeft: '10%',
            }}>
            Messenger
          </Text>
       
        </View> */}
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  settingicon: {
    width: 42,
    height: 42,
    marginLeft: '57%',
    marginTop: '9%',
  },
  messengericon: {
    width: 28,
    height: 28,
    marginTop: '9%',
    marginLeft: '3%',
  },
  notificationicon: {
    marginTop: '8.8%',
    width: 32,
    height: 32,
    marginLeft: '3%',
  },
  logoutContainer: {
    width: 30,
    height: 30,
    marginTop: '9%',
    marginLeft: '3%',
  },
  viewshop: {
    alignItems: 'center',
    width: '21%',
    height: '21%',
    marginTop: '10%',
    marginLeft: '21%',
    borderColor: CUSTOM_COLOR.Red,
    borderWidth: 1,
  },
  textstyle: {
    marginTop: '5%',
  },
  functionContainer: {
    flex: 10,
    flexDirection: 'column',
  },
  unitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewShopContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginHorizontal: 20
  },
  butViewShopContainer: {
    width: 100,
    height: 40,
    borderColor: CUSTOM_COLOR.FlushOrange,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 20
  },
  menuContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default OverView;
