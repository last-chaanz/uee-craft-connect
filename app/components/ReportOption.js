import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReportOption = ({ icon, title, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
      <Icon name={icon} size={30} color="#FF6F00" />
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionCard: {
    backgroundColor: '#FFF', // Background color for the option card
    flexDirection: 'row', // Align icon and text in a row
    padding: 15, // Padding inside the card
    borderRadius: 10, // Rounded corners for the card
    marginBottom: 10, // Space between each card
    alignItems: 'center', // Center items vertically
    elevation: 5, // Shadow effect for depth
  },
  optionTextContainer: {
    marginLeft: 10, // Space between the icon and text
  },
  optionTitle: {
    fontSize: 16, // Font size for the title
    fontWeight: 'bold', // Bold text for the title
    color: '#000', // Title color
  },
  optionDescription: {
    fontSize: 14, // Font size for the description
    color: '#666', // Description color
  },
});

export default ReportOption;
