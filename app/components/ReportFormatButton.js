import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const FormatButton = ({ icon, format, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.formatButton} 
      onPress={onPress}
      activeOpacity={0.7} // Add feedback on press
      accessibilityLabel={`Select ${format}`} // Accessibility label
      accessibilityRole="button" // Accessibility role
    >
      <Icon name={icon} size={20} color="#FFF" />
      <Text style={styles.formatButtonText}>{format}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  formatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6F00',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    justifyContent: 'center',
    marginBottom: 10, // Added margin for better spacing
  },
  formatButtonText: {
    color: '#FFF',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Prop Types for validation
FormatButton.propTypes = {
  icon: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default FormatButton;
