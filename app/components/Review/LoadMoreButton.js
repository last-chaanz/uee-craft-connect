import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LoadMoreButton = ({ onLoadMore }) => {
  return (
    <TouchableOpacity style={styles.loadMoreButton} onPress={onLoadMore}>
      <Text style={styles.loadMoreButtonText}>Load More</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loadMoreButton: {
    backgroundColor: '#FF6F00', // Background color of the button
    padding: 10, // Padding inside the button
    borderRadius: 5, // Rounded corners for the button
    alignItems: 'center', // Center text horizontally
    marginTop: 10, // Space above the button
  },
  loadMoreButtonText: {
    color: '#FFF', // Text color
    fontWeight: 'bold', // Bold text for emphasis
  },
});

export default LoadMoreButton;
