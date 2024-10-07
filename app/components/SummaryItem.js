import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SummaryItem = ({ icon, title, value }) => {
  return (
    <View style={styles.summaryItem}>
      <Icon name={icon} size={30} color="#FF6F00" />
      <View style={styles.summaryText}>
        <Text style={styles.summaryTitle}>{title}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryItem: {
    backgroundColor: '#FFF', // Background color for the summary item
    padding: 20, // Padding inside the summary item
    borderRadius: 10, // Rounded corners
    flexDirection: 'row', // Aligns children in a row
    alignItems: 'center', // Centers items vertically
    elevation: 5, // Shadow effect for the item
    marginHorizontal: 5, // Horizontal margin for spacing
  },
  summaryText: {
    marginLeft: 10, // Space between icon and text
  },
  summaryTitle: {
    fontSize: 16, // Font size for the title
    color: '#333', // Title color
  },
  summaryValue: {
    fontSize: 18, // Font size for the value
    fontWeight: 'bold', // Bold text for the value
    color: '#000', // Value color
  },
});

export default SummaryItem;
