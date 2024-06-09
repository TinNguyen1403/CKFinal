import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IC_Add, IC_Back, IC_Cancle, IC_Review, } from "../assets/icons";
import { IM_AnhGiay1, IM_AnhGiay2 } from "../assets/images";
import Button from "../components/Button";
import Review from "../components/Review";
import StarRating from "../components/StarRating";


import CUSTOM_COLOR from "../constants/colors";

const data = [
  {
    id: '1',
    avatar: IM_AnhGiay1,
    name: 'Trung Tín',
    time: '10 April, 2024',
    rating: 3,
    content: 'Sản phẩm rất tuyệt vời, tối sẽ tiếp tục ủng hộ của hàng của bạn. Thả 1 ngàn trái tim ạ!',
    image: 'https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fproduct%2FAnhGiay2.png?alt=media&token=f6365b0e-7c3a-4201-ba70-e5485e8cf4f9'
  },
  {
    id: '2',
    avatar: IM_AnhGiay1,
    name: 'Trung Tín',
    time: '10 April, 2024',
    rating: 4,
    content: 'Sản phẩm rất tuyệt vời, tối sẽ tiếp tục ủng hộ của hàng của bạn. Thả 1 ngàn trái tim ạ!',
    image: null
  },
  {
    id: '3',
    avatar: IM_AnhGiay1,
    name: 'Trung Tín',
    time: '10 April, 2024',
    rating: 1,
    content: 'Sản phẩm rất tuyệt vời, tối sẽ tiếp tục ủng hộ của hàng của bạn. Thả 1 ngàn trái tim ạ!',
    image: 'https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fproduct%2FAnhGiay2.png?alt=media&token=f6365b0e-7c3a-4201-ba70-e5485e8cf4f9'
  },
  {
    id: '4',
    avatar: IM_AnhGiay1,
    name: 'Thạch Sang',
    time: '10 April, 2023',
    rating: 5,
    content: 'Sản phẩm rất tuyệt vời, tối sẽ tiếp tục ủng hộ của hàng của bạn. Thả 1 ngàn trái tim ạ!',
    image: 'https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fproduct%2FAnhGiay2.png?alt=media&token=f6365b0e-7c3a-4201-ba70-e5485e8cf4f9'
  },
  {
    id: '5',
    avatar: IM_AnhGiay1,
    name: 'Trung Tín',
    time: '10 April, 2024',
    rating: 2,
    content: 'Sản phẩm rất tuyệt vời, tối sẽ tiếp tục ủng hộ của hàng của bạn. Thả 1 ngàn trái tim ạ!',
    image: 'https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fproduct%2FAnhGiay2.png?alt=media&token=f6365b0e-7c3a-4201-ba70-e5485e8cf4f9'
  },


]


function ReviewScreen({ navigation }) {

  const [addReview, setAddReview] = useState(false)


  return (
    <View style={{
      flex: 1,
      backgroundColor: CUSTOM_COLOR.White
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',

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
        }}>Review</Text>
      </View>

      <View style={{
        flexDirection: 'row',
        marginHorizontal: '5%',
        justifyContent: 'space-between'
      }}>
        <View>
          <Text style={{
            fontSize: 17,
            color: CUSTOM_COLOR.Black
          }}>23 Reviews</Text>
          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={{
              fontSize: 17,
              color: CUSTOM_COLOR.Black,
              marginRight: '5%'
            }}>4</Text>
            <StarRating
              nums={5}
              fill={4}
            />
          </View>
        </View>


        <View>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: CUSTOM_COLOR.FlushOrange,
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 8
          }}
            onPress={() => setAddReview(true)}
          >
            <Image source={IC_Review} />
            <Text style={{
              fontSize: 15,
              marginLeft: 10,
              fontWeight: 'bold',
              color: CUSTOM_COLOR.White
            }}>Add Review</Text>
          </TouchableOpacity>

        </View>

      </View>

      <ScrollView>
        {data.map((review, index) => (

          <View style={{
            marginVertical: '3%',
            borderBottomWidth: 1,
            borderBottomColor: CUSTOM_COLOR.Alto,
            paddingBottom: '2%'
          }}>
            <Review
              key={review.id}
              avatar={review.avatar}
              name={review.name}
              time={review.time}
              rating={review.rating}
              content={review.content}
              image={review.image}
            />

          </View>
        ))}
      </ScrollView>

      {addReview ?

        <View style={{
          position: 'absolute',
          width: '80%',
          height: 350,
          backgroundColor: CUSTOM_COLOR.White,
          borderWidth: 1,
          borderRadius: 20,
          alignSelf: 'center',
          top: '25%'
        }}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginHorizontal: '3%',
            marginTop: '2%'
          }}>
            <TouchableOpacity
              onPress={() => setAddReview(false)}
            >
              <Image source={IC_Cancle}
                style={{
                  width: 20,
                  height: 20
                }}
              />

            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: '5%'
          }}>
            <Image source={IM_AnhGiay1}
              style={{
                width: 45,
                height: 45,
                borderRadius: 30,

              }}
            />
            <Text style={{
              fontSize: 17,
              marginHorizontal: '3%',
              fontWeight: 'bold',
              color: CUSTOM_COLOR.Black
            }}>Sang Thach</Text>
          </View>

          <View style={{
            ...styles.flexRow,
            marginHorizontal: '5%',
            marginVertical: '3%'
          }}>
            <Text style={{
              fontSize: 17,
              marginRight: '5%'
            }}>Rating</Text>
            <StarRating
              nums={5}
              fill={4}
            />
          </View>

          <View style={{
            width: '90%',
            height: '30%',
            backgroundColor: CUSTOM_COLOR.Gallery,
            alignSelf: 'center',
            borderRadius: 20
          }}>
            <TextInput
              placeholder='Write something...'
              multiline
              numberOfLines={1}
              style={{
                paddingHorizontal: 10
              }}

            />
          </View>

          <View style={{
            ...styles.flexRow,
            marginVertical: 10,
            marginHorizontal: 10
          }}>
            <TouchableOpacity>
              <Image source={IC_Add}
                style={{
                  width: 45,
                  height: 45,
                  marginRight: 10
                }}
              />

            </TouchableOpacity>

            <Text>Upload your image or video</Text>

          </View>

          <View style={{
            ...styles.flexRow,
            justifyContent: 'center'
          }}>
            <Button
              title='Add Review'
              color={CUSTOM_COLOR.FlushOrange}
              style={{
                width: '40%'
              }}
            />
          </View>

        </View> : null}

    </View>

  )
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default ReviewScreen