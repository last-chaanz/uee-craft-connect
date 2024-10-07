import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FormatButton = ({ icon, format, onPress }) => {
  return (
    <TouchableOpacity style={styles.formatButton} onPress={onPress}>
      <Icon name={icon} size={20} color="#FFF" />
      <Text style={styles.formatButtonText}>{format}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  formatButton: {
    flexDirection: 'row', // Align icon and text in a row
    alignItems: 'center', // Center items vertically
    backgroundColor: '#FF6F00', // Background color of the button
    padding: 10, // Padding inside the button
    borderRadius: 5, // Rounded corners
    width: '48%', // Set width of the button
    justifyContent: 'center', // Center content within the button
  },
  formatButtonText: {
    color: '#FFF', // Text color
    marginLeft: 5, // Space between icon and text
    fontSize: 16, // Font size for the button text
    fontWeight: 'bold', // Bold text
  },
});

export default FormatButton;
