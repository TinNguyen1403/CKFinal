import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { IC_Search } from '../assets/icons';
import CUSTOM_COLOR from '../constants/colors';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchInputProps> = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Nhập từ khóa..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Image
            source={IC_Search}
            style={{width: '50%', height: '100%'}}
            resizeMode="center"
          />
          <View style={{width: 5, height: '100%'}}/>
          {/* <Text style={styles.buttonText}>Tìm kiếm</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderColor: CUSTOM_COLOR.Black,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: CUSTOM_COLOR.White,
  },
  inputContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 10,
    padding: 8,
    fontSize: 13,
    width: '75%',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
});

export default Search;
