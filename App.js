import React, {useState, useEffect} from 'react';
import {firebase, Firestore} from './Firebase/firebase';
import MainNavigator from './src/Login_SignUp/navigation/navigation';
import CustomerBottomTab from './src/CustomerView/navigation/CustomerBottomTab';
import StackNavigator from './src/StaffView/navigation/navigation';
import AdminNavigationContainer from './src/AdminView/navigation/admin_navigation';
import StaffNavigationContainer from './src/AdminView/navigation/staff_navigation';

function App() {
  const [userType, setUserType] = useState('');
  const [user, setUser] = useState(false);

  const getPropertyValue = async uid => {
    try {
      const docRef = firebase.firestore().collection('NGUOIDUNG').doc(uid);
      const doc = await docRef.get();

      if (doc.exists) {
        const data = doc.data();
        setUserType(data.LoaiND);
        // const userType = data.userType;
        console.log('userType:', userType);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log('Error getting property value:', error.message);
    }
  };

  const checkSignInStatus = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in:', user.uid);
        setUser(true);
        // User is signed in, you can perform further actions here
      } else {
        console.log('User is not signed in');
        // User is not signed in
        setUser(false);
      }
    });
  };

  // const user = firebase.auth().currentUser;

  checkSignInStatus();

  while (!user) {
    if (!user) {
      return <MainNavigator />;
    }
    checkSignInStatus();
  }

  const uid = firebase.auth().currentUser.uid;
  getPropertyValue(uid);

  if (userType === 'customer') {
    return <CustomerBottomTab />;
  } else if (userType === 'admin') {
    return <AdminNavigationContainer />;
  } else if (userType === 'staff') {
    return <StaffNavigationContainer />;
  }

  // return <AdminNavigationContainer />;
}

export default () => {
  return <App />;
};
