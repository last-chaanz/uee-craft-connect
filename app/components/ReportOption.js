import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const ReportOption = ({ icon, title, description, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.optionCard} 
      onPress={onPress}
      activeOpacity={0.7} // Add feedback on press
      accessibilityLabel={`Select ${title}`} // Accessibility label
      accessibilityRole="button" // Accessibility role
    >
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
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000', // Optional shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Optional shadow for iOS
    shadowOpacity: 0.2, // Optional shadow for iOS
    shadowRadius: 2, // Optional shadow for iOS
  },
  optionTextContainer: {
    marginLeft: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
});

// Prop Types for validation
ReportOption.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ReportOption;
