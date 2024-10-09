import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';

const DatePickerComponent = ({ date, setDate, placeholder }) => {
  return (
    <View style={styles.datePickerContainer}>
      <Text style={styles.placeholderText}>{!date ? placeholder : ''}</Text>
      <DatePicker
        style={styles.datePicker}
        date={date} 
        mode="date" 
        format="YYYY-MM-DD" 
        minDate="2020-01-01" 
        maxDate="2030-12-31" 
        confirmBtnText="Confirm" 
        cancelBtnText="Cancel" 
        onDateChange={(selectedDate) => setDate(selectedDate)} 
      />
    </View>
  );
};

// Prop Types for validation
DatePickerComponent.propTypes = {
  date: PropTypes.string.isRequired, // Expecting a string in YYYY-MM-DD format
  setDate: PropTypes.func.isRequired, // Function to set the date
  placeholder: PropTypes.string.isRequired, // Placeholder text
};

const styles = StyleSheet.create({
  datePickerContainer: {
    width: '48%', 
  },
  datePicker: {
    width: '100%', 
  },
  placeholderText: {
    color: '#999', // Light gray color for placeholder
    marginBottom: 5, // Space between placeholder and date picker
    fontSize: 16,
  },
});

export default DatePickerComponent;
