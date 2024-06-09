import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddProduct from '../screens/AddProduct';
import AddPromotion from '../screens/AddPromotion';
import Chat from '../screens/Chat';
import ChatScreenStaff from '../screens/ChatScreenStaff';
import DeTailDelivery from '../screens/DeTailDelivery';
import DeTailsChat from '../screens/DeTailsChat';
import EditProduct from '../screens/EditProduct';
import ImportProduct from '../screens/ImportProduct';
import MyProduct from '../screens/MyProduct';
import Notification from '../screens/Notification';
import Order from '../screens/Order';
import Promotion from '../screens/Promotion';
import ReviewScreen from '../screens/ReView';
import SearchSrc from '../screens/Search';
import Setting from '../screens/Setting';
import ViewShop1 from '../screens/ViewShop1';
import ViewShop2 from '../screens/ViewShop2';
import ChangeProfile from '../screens/ChangeProfile';
import ChangePassword from '../screens/ChangePassword';
import EditPromotion from '../screens/EditPromotion';
import Categories from '../screens/Categories';
import DetailCategory from '../screens/DetailsCategory';
import AddNewCategory from '../screens/AddNewCategory';
import ViewDetailsinList from '../screens/ViewDetailsinList';
import StaffOverView from '../screens/StaffOverView';
import Report from '../screens/Report';

const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="StaffOverView"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="AddPromotion" component={AddPromotion} />
      <Stack.Screen name="StaffOverView" component={StaffOverView} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatScreenStaff" component={ChatScreenStaff} />
      <Stack.Screen name="DeTailsDelivery" component={DeTailDelivery} />
      <Stack.Screen name="DeTailsChat" component={DeTailsChat} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="ImportProduct" component={ImportProduct} />
      <Stack.Screen name="MyProduct" component={MyProduct} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Promotion" component={Promotion} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="Search" component={SearchSrc} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="ViewShop1" component={ViewShop1} />
      <Stack.Screen name="ViewShop2" component={ViewShop2} />
      <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditPromotion" component={EditPromotion} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="DetailsCategory" component={DetailCategory} />
      <Stack.Screen name="AddNewCategory" component={AddNewCategory} />
      <Stack.Screen name="ViewDetailsinList" component={ViewDetailsinList} />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
}

const StaffNavigationContainer = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default StaffNavigationContainer;
