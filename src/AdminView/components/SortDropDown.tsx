import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SortDropdownProps {
  onSelectSort: (sortOption: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSelectSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (sortOption: string) => {
    setIsOpen(false);
    onSelectSort(sortOption);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text style={styles.dropdownButtonText}>Sort by: </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownContent}>
          <TouchableOpacity onPress={() => handleSelect("a-z")} style={styles.dropdownItem}>
            <Text style={styles.dropdownItemText}>A-Z</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelect("z-a")} style={styles.dropdownItem}>
            <Text style={styles.dropdownItemText}>Z-A</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelect("low-to-high")} style={styles.dropdownItem}>
            <Text style={styles.dropdownItemText}>Thấp đến cao</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelect("high-to-low")} style={styles.dropdownItem}>
            <Text style={styles.dropdownItemText}>Cao đến thấp</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
  },
  dropdownButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  dropdownButtonText: {
    color: "#000",
    fontSize: 16,
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownItemText: {
    fontSize: 16,
  },
});

export default SortDropdown;
