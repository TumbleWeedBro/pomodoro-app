import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';



const TaskGroupDropdown = () => {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // Static data
  const countryData = [
    { value: 'NG', label: 'Nigeria' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
  ];

  const stateData = [
    { value: 'LA', label: 'Lagos' },
    { value: 'AB', label: 'Abuja' },
    { value: 'RI', label: 'Rivers' },
  ];

  const cityData = [
    { value: 'IK', label: 'Ikoyi' },
    { value: 'VI', label: 'Victoria Island' },
    { value: 'AL', label: 'Alimosho' },
  ];

  return (
    <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={countryData}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select country' : '...'}
            value={country}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCountry(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.priorityContainer}>
            <Ionicons name="flag-outline" size={30} color={Colors.primary} />
            <Ionicons name="flag-outline" size={30} color={Colors.yellow} />
            <Ionicons name="flag-outline" size={30} color={Colors.green} />
        </View>
    </View>
  );
};

export default TaskGroupDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: Colors.surface,
    
  },
  dropdownContainer: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 0,
  },

  priorityContainer: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 15,
    marginHorizontal:10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.black,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,

  },
  placeholderStyle: { fontSize: 16 },
  selectedTextStyle: { fontSize: 16 },
  inputSearchStyle: { height: 40, fontSize: 16 },
  iconStyle: { width: 20, height: 20 },

});
