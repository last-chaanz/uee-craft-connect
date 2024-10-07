import React from 'react';
import { View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

const DatePickerComponent = ({ date, setDate, placeholder }) => {
  return (
    <View style={styles.datePickerContainer}>
      <DatePicker
        style={styles.datePicker}
        date={date} // Current selected date
        mode="date" // Mode for date selection
        placeholder={placeholder} // Placeholder text when no date is selected
        format="YYYY-MM-DD" // Date format
        minDate="2020-01-01" // Minimum selectable date
        maxDate="2030-12-31" // Maximum selectable date
        confirmBtnText="Confirm" // Text for confirm button
        cancelBtnText="Cancel" // Text for cancel button
        onDateChange={(selectedDate) => setDate(selectedDate)} // Update date state on change
      />
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    width: '48%', // Width of the date picker container
  },
  datePicker: {
    width: '100%', // Full width of the date picker
  },
});

export default DatePickerComponent;
