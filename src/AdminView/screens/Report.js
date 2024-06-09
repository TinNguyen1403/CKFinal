import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from '@firebase/firestore';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import {TextInput, TouchableOpacity,GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Firestore} from '../../../Firebase/firebase';
import {SearchIcon} from '../../CustomerView/assets/icons';
import BackTo from '../components/BackTo';
import CUSTOM_COLOR from '../constants/colors';

const Report = ({navigation}) => {
  const [total, setTotal] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [error, setError] = useState('');
  const [hasInput, setHasInput] = useState(false);

  const isValidDay = day => {
    return day > 0 && day <= 31;
  };

  // Hàm kiểm tra tính hợp lệ của tháng
  const isValidMonth = month => {
    return month > 0 && month <= 12;
  };

  // Hàm kiểm tra tính hợp lệ của năm
  const isValidYear = year => {
    return year > 2020;
  };
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        let q = query(
          collection(Firestore, 'DONHANG'),
          where('TrangThai', '==', 'Delivered'),
        );

        const querySnapshot = await getDocs(q);

        let total = 0;
        let count = 0;

        querySnapshot.forEach(doc => {
          const {TongTien} = doc.data();
          total += TongTien;
          count += 1;
        });

        setTotalRevenue(total);
        setTotal(count);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchFinancialData();
  }, []);

  const handleSearchDateTime = async () => {
    const parsedYear = parseInt(selectedYear);
    const parsedMonth = parseInt(selectedMonth);
    const parsedDate = parseInt(selectedDate);

    if (!selectedDate && !selectedMonth && !selectedYear) {
      // Không có trường nào được nhập
      try {
        let q = query(
          collection(Firestore, 'DONHANG'),
          where('TrangThai', '==', 'Delivered'),
        );

        const querySnapshot = await getDocs(q);

        let total = 0;
        let count = 0;

        querySnapshot.forEach(doc => {
          const {TongTien} = doc.data();
          total += TongTien;
          count += 1;
        });

        setTotalRevenue(total);
        setTotal(count);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
      setHasInput(false);
      setError('');
      return;
    }

    setHasInput(true);

    if (isNaN(parsedMonth) && isNaN(parsedDate)) {
      // Người dùng chỉ nhập năm
      if (isValidYear(parsedYear)) {
        setError('');
        const startOfYear = new Date(parsedYear, 0, 1);
        const endOfYear = new Date(parsedYear + 1, 0, 1);

        const q = query(
          collection(Firestore, 'DONHANG'),
          where('TrangThai', '==', 'Delivered'),
          where('NgayDatHang', '>=', Timestamp.fromDate(startOfYear)),
          where('NgayDatHang', '<', Timestamp.fromDate(endOfYear)),
        );

        const querySnapshot = await getDocs(q);

        let total = 0;
        let count = 0;

        querySnapshot.forEach(doc => {
          const {TongTien} = doc.data();
          total += TongTien;
          count += 1;
        });

        setTotalRevenue(total);
        setTotal(count);
      } else {
        setError('Năm không hợp lệ (Năm phải lớn hơn 2020)');
        setTotalRevenue(0);
        setTotal(0);
      }
    } else if (!isNaN(parsedMonth) && isNaN(parsedDate)) {
      // Người dùng đã nhập năm và tháng
      if (isValidYear(parsedYear) && isValidMonth(parsedMonth)) {
        setError('');
        const startOfMonth = new Date(parsedYear, parsedMonth - 1, 1);
        const endOfMonth = new Date(parsedYear, parsedMonth, 1);

        const q = query(
          collection(Firestore, 'DONHANG'),
          where('TrangThai', '==', 'Delivered'),
          where('NgayDatHang', '>=', Timestamp.fromDate(startOfMonth)),
          where('NgayDatHang', '<', Timestamp.fromDate(endOfMonth)),
        );

        const querySnapshot = await getDocs(q);

        let total = 0;
        let count = 0;

        querySnapshot.forEach(doc => {
          const {TongTien} = doc.data();
          total += TongTien;
          count += 1;
        });

        setTotalRevenue(total);
        setTotal(count);
      } else {
        setError('Tháng hoặc năm không hợp lệ');
        setTotalRevenue(0);
        setTotal(0);
      }
    } else if (!isNaN(parsedMonth) && !isNaN(parsedDate)) {
      // Người dùng đã nhập đầy đủ ngày, tháng và năm
      if (
        isValidYear(parsedYear) &&
        isValidMonth(parsedMonth) &&
        isValidDay(parsedDate)
      ) {
        setError('');
        const selectedDay = new Date(parsedYear, parsedMonth - 1, parsedDate);
        const nextDay = new Date(parsedYear, parsedMonth - 1, parsedDate + 1);

        const q = query(
          collection(Firestore, 'DONHANG'),
          where('TrangThai', '==', 'Delivered'),
          where('NgayDatHang', '>=', Timestamp.fromDate(selectedDay)),
          where('NgayDatHang', '<', Timestamp.fromDate(nextDay)),
        );

        const querySnapshot = await getDocs(q);

        let total = 0;
        let count = 0;

        querySnapshot.forEach(doc => {
          const {TongTien} = doc.data();
          total += TongTien;
          count += 1;
        });

        setTotalRevenue(total);
        setTotal(count);
      } else {
        setError('Ngày, tháng hoặc năm không hợp lệ (Năm phải lớn hơn 2020)');
        setTotalRevenue(0);
        setTotal(0);
      }
    } else {
      setError('Vui lòng nhập ngày, tháng hoặc năm');
      setTotalRevenue(0);
      setTotal(0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackTo onPress={() => navigation.goBack()} Info="Financial Report" />
      </View>
      <View style={styles.content}>
        <View style={styles.backgroundHeader}>
          <Text style={styles.Heading}>Quá trình hoạt động</Text>
          <View style={styles.buttonGroup}>
            <GestureHandlerRootView>
            <TextInput
              placeholder="Chọn ngày"
              style={styles.textinput}
              onChangeText={text => setSelectedDate(text)}
            />
            <TextInput
              placeholder="Chọn tháng"
              style={styles.textinput}
              onChangeText={text => setSelectedMonth(text)}
            />
            <TextInput
              placeholder="Chọn năm"
              style={styles.textinput}
              onChangeText={text => setSelectedYear(text)}
            />
            <TouchableOpacity
              onPress={handleSearchDateTime}
              style={styles.button}>
              <Image
                source={SearchIcon}
                onPress={handleSearchDateTime}
                style={styles.icon}
              />
            </TouchableOpacity>
            </GestureHandlerRootView>
          </View>
        </View>
        {error ? (
          <>
            <Text style={styles.errorText}>{error}</Text>
            <View>
              <View style={styles.title}>
                <Text style={styles.tieude}>BÁO CÁO DOANH THU</Text>
                <Text style={styles.minibutton}>Tổng</Text>
                <Text style={styles.report}>
                  {totalRevenue.toLocaleString()} VNĐ
                </Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.tieude}>SỐ ĐƠN HÀNG ĐÃ BÁN</Text>
                <Text style={styles.minibutton}>Tổng</Text>
                <Text style={styles.report}>{total}</Text>
              </View>
            </View>
          </>
        ) : (
          <View>
            <View style={styles.title}>
              <Text style={styles.tieude}>BÁO CÁO DOANH THU</Text>
              <Text style={styles.minibutton}>Tổng</Text>
              <Text style={styles.report}>
                {totalRevenue.toLocaleString()} VNĐ
              </Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.tieude}>SỐ ĐƠN HÀNG ĐÃ BÁN</Text>
              <Text style={styles.minibutton}>Tổng</Text>
              <Text style={styles.report}>{total}</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  backgroundHeader: {
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    marginTop: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 130,
    alignContent: 'center',
  },
  header: {
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  Heading: {
    color: CUSTOM_COLOR.White,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: CUSTOM_COLOR.Black,
    backgroundColor: CUSTOM_COLOR.White,
    borderRadius: 10,
    padding: 10,
    shadowColor: CUSTOM_COLOR.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tieude: {
    fontSize: 30,
    fontStyle: 'normal',
    color: CUSTOM_COLOR.Black,
  },
  textinput: {
    textAlign: 'center',
    color: CUSTOM_COLOR.Black,
    backgroundColor: CUSTOM_COLOR.White,
    borderRadius: 10,
    width: 80,
    height: 40,
    marginRight: 10,
  },
  button: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: CUSTOM_COLOR.White,
  },
  icon: {
    width: 20,
    height: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 18,
  },
  minibutton: {
    marginBottom: 10,
    marginTop: 10,
    color: CUSTOM_COLOR.White,
    backgroundColor: CUSTOM_COLOR.Purple,
    padding: 8,
    width: 60,
    height: 40,
    borderRadius: 10,
    fontSize: 18,
    textAlign: 'left',
  },
  report: {
    color: CUSTOM_COLOR.Black,
    fontSize: 32,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Report;
