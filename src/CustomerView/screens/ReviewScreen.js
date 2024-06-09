import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";
import { IC_Add, IC_Back, IC_Cancle, IC_Review, } from "../assets/icons";
import { IM_AnhGiay1, IM_AnhGiay2 } from "../assets/images";
import Button from "../components/Button";
import Review from "../components/Review";
import StarRating from "../components/StarRatingChoose";
import { collection, addDoc, doc, updateDoc, getDoc, onSnapshot, getDocs, where, query } from "firebase/firestore";
import { async } from "@firebase/util";
import { Firestore, firebase, Storage } from "../../../Firebase/firebase";
import CUSTOM_COLOR from "../constants/colors";
import { da } from "date-fns/locale";
import { get } from "firebase/database";
import StarRatingComponent from "../components/StarRatingChoose";
import { IC_StartFull, IC_StartCorner } from "../assets/icons";
const ImagePicker = require('react-native-image-picker');
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ref, uploadBytes, put, getDownloadURL } from "firebase/storage";
function ReviewScreen({navigation, route}) {
    const {item} = route.params
    const [image, setImage] = useState('')
    const [addReview, setAddReview] = useState(false)
    const [data, setdata] = useState([])
    const [tong, settong] = useState()
    const [tb, settb] = useState()
    const [dataUser, setdataUser] = useState([])
    const [ngayDG, setNgayDG] = useState('')
    const [ndDG, setND] = useState('')
    const [defaultRating, setDefaultRating] = useState(2);
    const [click, setClick] = useState(false);
  // To set the max number of Stars
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const getdataReview = () =>{
        try{
            const q = query(collection(Firestore, "DANHGIA"), where("MaSP", "==", item.MaSP));
            const querySnapshot = onSnapshot(q, async (snapshot) => {
            const items = [];
        
            snapshot.forEach(documentSnapshot => {
            items.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
            });
            let sum = 0;
            if(items.length != 0){
                for(let i = 0; i < items.length; i++){
                    const docRef = doc(Firestore, "NGUOIDUNG", items[i].MaND);
                    const docSnap = await getDoc(docRef);
                    const NguoiDung = {
                        ...docSnap.data()
                    }
                    console.log(NguoiDung);
                    items[i].TenND = NguoiDung.TenND
                    items[i].Avatar = NguoiDung.Avatar
                    sum += items[i].Rating;
                }
                setdata(items);
                settong(items.length);
                settb((Math.round(sum/items.length * 100) / 100).toFixed(1));
            }
            })
        }catch(error){
            console.log(error);
        }
    }
    const getUser = async () =>{
        const docRef = doc(Firestore, "NGUOIDUNG", firebase.auth().currentUser.uid);
        const docSnap = await getDoc(docRef);
        const NguoiDung = {
            ...docSnap.data()
        }
        setdataUser(NguoiDung);
    }
    const currentDay = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const date = day + '/' + month + '/' + year;
        setNgayDG(date);
    }
    const addDataReView = async ()=>{
        try{
            setAddReview(false);
            if(click == true){
                const imageUri = await UploadFile()
                const docRef = await addDoc(collection(Firestore, "DANHGIA"), {
                    MaND: firebase.auth().currentUser.uid,
                    MaSP: item.MaSP,
                    NgayDG: ngayDG,
                    Rating: defaultRating,
                    NDDG: ndDG,
                    AnhDG: imageUri,
                });
                const updateRef = doc(Firestore, "DANHGIA", docRef.id);
                await updateDoc(updateRef, {
                    MaDG: docRef.id
                });
                setImage(null);
                setClick(false);
                setND('');
            }else{
                const docRef = await addDoc(collection(Firestore, "DANHGIA"), {
                    MaND: firebase.auth().currentUser.uid,
                    MaSP: item.MaSP,
                    NgayDG: ngayDG,
                    Rating: defaultRating,
                    NDDG: ndDG,
                });
                const updateRef = doc(Firestore, "DANHGIA", docRef.id);
                await updateDoc(updateRef, {
                    MaDG: docRef.id
                });
                setImage(null);
                setClick(false);
                setND('');
            }
            Alert.alert(
                'Notification',
                'Add to Review successfully',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ],
            );
        }catch(error){
            console.log(error)
        }
    }
    const selectImage = () => {
        const options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          multiple: true,
          selectionLimit: 1,
          quality: 1,
        };
    
        launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            setImage(response.assets[0]);
            console.log(image);
            setClick(true);
          }
        });
      };
    const UploadFile = async () => {
        try {
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", image.uri, true);
            xhr.send(null);
          });
          const storageRef = ref(Storage, `images/review/image-${Date.now()}`);
          const snapshot = await uploadBytes(storageRef, blob);
          console.log("Upload successfully!");
          const url = await getDownloadURL(snapshot.ref);
          console.log("Get URL successfully");
          return url;
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        getdataReview()
        getUser()
        currentDay()
    }, [])
    return(
        <View style = {{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White
        }}>
            <View style ={{
                flexDirection: 'row', 
                alignItems: 'center',
            
            }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image
                        source={IC_Back}
                        style = {{
                            width: 10, 
                            height: 20,
                            marginHorizontal: 20,
                            marginVertical: 15
                        }}
                        resizeMode = 'stretch'
                    />  
                </TouchableOpacity>
              
                <Text style ={{
                    fontSize: 20,
                    color: CUSTOM_COLOR.Black, 
                    fontWeight: 'bold'
                }}>Review</Text>
            </View>

            <View style = {{
                flexDirection: 'row',
                marginHorizontal: '5%',
                justifyContent: 'space-between'
            }}>
                <View>
                    <Text style ={{
                        fontWeight: 'bold',
                        fontSize: 17,
                        color: CUSTOM_COLOR.Black
                    }}>{tong} Reviews</Text>
                    <View style = {{
                        flexDirection: 'row'
                    }}>
                        <Text style = {{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: CUSTOM_COLOR.Black,
                            marginRight: '5%'
                        }}>{tb}</Text>
                        <StarRating
                            nums = {5}
                            fill = {tb}
                        />
                    </View>
                </View>

                <View>
                    <TouchableOpacity style ={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: CUSTOM_COLOR.FlushOrange,
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        paddingVertical: 8
                    }}
                        onPress = {() => setAddReview(true)}
                    >
                        <Image source={IC_Review}/>
                        <Text style ={{
                            fontSize: 15,
                            marginLeft: 10,
                            fontWeight: 'bold',
                            color: CUSTOM_COLOR.White
                        }}>Add Review</Text>
                    </TouchableOpacity>

                </View>

            </View>
            <GestureHandlerRootView>
            <ScrollView>
                {data.map((review, index) =>(
                    
                    <View style = {{
                        marginVertical: '3%',
                        borderBottomWidth: 1,
                        borderBottomColor: CUSTOM_COLOR.Alto,
                        paddingBottom: '2%'
                    }}>
                        <Review
                            key = {review.id}
                            avatar = {review.Avatar}
                            name = {review.TenND}
                            time = {review.NgayDG}
                            rating = {review.Rating}
                            content = {review.NDDG}
                            image = {review.AnhDG}
                        />
                    </View>
                ))}
            </ScrollView>
            </GestureHandlerRootView>

            {addReview ? 

            <View style ={{
                position: 'absolute',
                width: '80%',
                height: 350,
                backgroundColor: CUSTOM_COLOR.White,
                borderWidth: 1,
                borderRadius: 20,
                alignSelf: 'center',
                top: '25%'
            }}>

                <View style ={{
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
                            style ={{
                                width: 20,
                                height: 20
                            }}
                        />

                    </TouchableOpacity>
                </View>

                <View style ={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: '5%'
                }}> 
                    <Image source={{ uri: dataUser.Avatar}}
                        style = {{
                            width: 45,
                            height: 45,
                            borderRadius: 30,
        
                        }}
                    />
                    <Text style= {{
                        fontSize: 17,
                        marginHorizontal: '3%',
                        fontWeight: 'bold',
                        color: CUSTOM_COLOR.Black
                    }}>{dataUser.TenND}</Text>
                </View>

                <View style ={{
                    ...styles.flexRow,
                    marginHorizontal: '5%',
                    marginVertical: '3%'
                }}>
                    <Text style ={{
                        fontSize: 17,
                        marginRight: '5%'
                    }}>Rating</Text>
                   <View style={styles.customRatingBarStyle}>
                        {maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => setDefaultRating(item)}>
                            <Image
                                style={styles.starImageStyle}
                                source={
                                item <= defaultRating
                                    ? IC_StartCorner
                                    : IC_StartFull
                                }
                            />
                            </TouchableOpacity>
                        );
                        })}
                    </View>
                </View>

                <View style = {{
                    width: '90%',
                    height: '30%',
                    backgroundColor: CUSTOM_COLOR.Gallery,
                    alignSelf: 'center',
                    borderRadius: 20
                }}>
                    <TextInput
                        placeholder= 'Write something...'
                        multiline
                        numberOfLines={1}
                        style ={{
                            paddingHorizontal: 10
                        }}
                        onChangeText={setND}
                        value={ndDG}
                    />
                </View>

                <View style = {{
                    ...styles.flexRow,
                    marginVertical: 10,
                    marginHorizontal: 10
                }}>
                    <TouchableOpacity
                        onPress={selectImage}
                    >
                        {click ? (<Image source={{uri : image.uri}}
                            style = {{
                                width: 45,
                                height: 45,
                                marginRight: 10 
                            }}
                        />):(
                            <Image source={IC_Add}
                            style = {{
                                width: 45,
                                height: 45,
                                marginRight: 10 
                            }}
                        />
                        )}
                        
                    
                    </TouchableOpacity>

                    <Text>Upload your image or video</Text>

                </View>

                <View style ={{
                    ...styles.flexRow,
                    justifyContent: 'center'
                }}> 
                    <Button
                        title = 'Add Review'
                        color = {CUSTOM_COLOR.FlushOrange}
                        style = {{
                            width: '40%'
                        }}
                        onPress = {addDataReView}
                    />
                </View>

            </View> : null }

        </View>
        
    )
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
      },
      starImageStyle: {
        width: 17,
        height: 17,
        resizeMode: 'cover',
      },
})

export default ReviewScreen