import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatScreen from '../screens/ChatScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import DeliveryAddressScreen from '../screens/DeliveryAddressScreen';
import DetailProduct from '../screens/DetailProduct';
import HomeScreenCustomer from '../screens/HomeScreenCustomer';
import PaymentCardScreen from '../screens/PaymentCardScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import SearchingScreen from '../screens/SearchingScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import TrendingScreen from '../screens/TrendingScreen';
import ReviewScreen from '../screens/ReviewScreen';
import DetailCategoryScreen from '../screens/DetailCategoryScreen';
import PromotionScreen from '../screens/PromotionScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import ChangePassword from '../screens/ChangePassword';
import ChangeProfile from '../screens/ChangeProfile';
import Order from '../screens/MyOrder';
import DeTailDelivery from '../screens/DetailDelivery';
const Stack = createNativeStackNavigator();

function StackHome() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="HomeScreen" component={HomeScreenCustomer} />
      <Stack.Screen name="DetailProduct" component={DetailProduct} />
      <Stack.Screen name="Trending" component={TrendingScreen} />
      <Stack.Screen name="Searching" component={SearchingScreen} />
      <Stack.Screen name="ShoppingCard" component={ShoppingCartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="DeliveryAddress" component={DeliveryAddressScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="PaymentCard" component={PaymentCardScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="DetailCategory" component={DetailCategoryScreen} />
      <Stack.Screen name="Promotion" component={PromotionScreen} />
      <Stack.Screen name="Delivery" component={DeliveryScreen} />
      <Stack.Screen name="MyOrder" component={Order} />
      <Stack.Screen name="DetailsDelivery" component={DeTailDelivery} />
    </Stack.Navigator>
  );
}

export default StackHome;
