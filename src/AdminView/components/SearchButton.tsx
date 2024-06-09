import React, { useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const SearchButton: React.FC<SearchInputProps> = ({onSearch}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const opacity = new Animated.Value(0);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSearchText('');
    });
  };

  const handlePress = () => {
    openModal();
  };

  const handleSearchTextChange = (text: string) => {
    onSearch(text);
    setSearchText(text);
  };

  const handleSearchTextSubmit = () => {
    // Save the search value and perform search here
    onSearch(searchText);
    console.log('Search keyword:', searchText);
    closeModal();
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('../assets/icons/SearchIcon.png')}
          style={{width: 20, height: 20}}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearchTextSubmit}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 55,
    borderColor: CUSTOM_COLOR.DarkBlue,
    backgroundColor: CUSTOM_COLOR.White,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default SearchButton;
