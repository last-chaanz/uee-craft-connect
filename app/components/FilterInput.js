import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const FilterInput = ({ filter, setFilter }) => {
  return (
    <TextInput
      style={styles.filterInput}
      placeholder="Filter by product, customer, etc." // Placeholder text for the input field
      value={filter} // Current value of the input field
      onChangeText={setFilter} // Function to update the filter state
    />
  );
};

const styles = StyleSheet.create({
  filterInput: {
    backgroundColor: '#FFF', // Background color for the input field
    padding: 10, // Padding inside the input field
    borderRadius: 10, // Rounded corners for the input field
    marginBottom: 15, // Space below the input field
    fontSize: 16, // Font size for the input text
    elevation: 3, // Shadow effect for depth
  },
});

export default FilterInput;
