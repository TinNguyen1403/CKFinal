import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { IC_Back } from "../assets/icons";
import { IM_AnhGiay1, IM_AnhGiay2, IM_AnhGiay3, IM_AnhGiay4 } from "../assets/images";
import Message from "../components/Message";
import Notify from "../components/Notify";
import CUSTOM_COLOR from "../constants/colors";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { Firestore, firebase } from "../../../Firebase/firebase";


const datasGeneral = [
  {
    id: '1',
    source: IM_AnhGiay1,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },
  {
    id: '2',
    source: IM_AnhGiay1,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },
  {
    id: '3',
    source: IM_AnhGiay1,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },
  {
    id: '4',
    source: IM_AnhGiay1,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },
  {
    id: '5',
    source: IM_AnhGiay1,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },

]

const dataRecomanded = [
  {
    id: '1',
    source: IM_AnhGiay2,
    title: "Thông báo giảm giá",
    content: "Khuyến mãi siêu ưu đãi giảm giá cực sốc",
    time: '11:30 AM'
  },
  {
    id: '2',
    source: IM_AnhGiay2,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },
  {
    id: '3',
    source: IM_AnhGiay4,
    title: "Thông báo giảm giá",
    content: "Khuyến mãi siêu ưu đãi giảm giá cực sốc",
    time: '11:30 AM'
  },
  {
    id: '4',
    source: IM_AnhGiay2,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi giảm giá cực sốc",
    time: '11:30 AM'
  },
  {
    id: '5',
    source: IM_AnhGiay3,
    title: "Thông báo giảm giá",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },

]

function NotificationScreen({ navigation }) {
  const [isGeneral, setIsCeneral] = useState(1)

  const [notificationPromotion, setNotificationPromotion] = useState([])

  const getDataNotificationPromotion = () => {
    const q = query(collection(Firestore, "KHUYENMAI"), orderBy("ThoiGianTao", 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setNotificationPromotion(data)
    });
  }

  useEffect(() => {
    getDataNotificationPromotion()
  }, [])


  return (
    <View style={{
      flex: 1,
      backgroundColor: CUSTOM_COLOR.White
    }}>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: CUSTOM_COLOR.White
      }}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Image
            source={IC_Back}
            style={{
              width: 10,
              height: 20,
              marginHorizontal: 20,
              marginVertical: 15
            }}
            resizeMode='stretch'
          />
        </TouchableOpacity>


        <Text style={{
          fontSize: 20,
          color: CUSTOM_COLOR.Black,
          fontWeight: 'bold'
        }}>Notification</Text>
      </View>
      <View style={{width: '100%', height: 10}}/>
        <FlatList
          data={notificationPromotion}
          renderItem={({ item }) => {

            const hour = item.ThoiGianTao.toDate().getHours();
            const minute = item.ThoiGianTao.toDate().getMinutes();

            const day = item.ThoiGianTao.toDate().getDate();
            const month = item.ThoiGianTao.toDate().getMonth();
            const year = item.ThoiGianTao.toDate().getFullYear();



            return (
              <TouchableOpacity>

                <Notify
                  source={item.HinhAnhKM}
                  title={item.TenKM}
                  content={item.ChiTietKM}
                  time={`${day}-${month}-${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
                />

              </TouchableOpacity>
            )
          }}
        />


    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

})

export default NotificationScreen