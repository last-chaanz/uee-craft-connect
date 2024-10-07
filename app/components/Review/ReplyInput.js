import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ReplyInput = ({ replyText, setReplyText, handleReplySubmit, customer }) => {
  return (
    <View style={styles.replySection}>
      <Text style={styles.replyTitle}>Reply to {customer}'s review:</Text>
      <TextInput
        style={styles.replyInput}
        placeholder="Type your reply here..." // Placeholder text for the input field
        value={replyText} // Current value of the reply text
        onChangeText={setReplyText} // Function to update the reply text
      />
      <TouchableOpacity style={styles.submitReplyButton} onPress={handleReplySubmit}>
        <Text style={styles.submitReplyButtonText}>Submit Reply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  replySection: {
    backgroundColor: '#FFF', // Background color for the reply section
    padding: 15, // Padding inside the reply section
    borderRadius: 10, // Rounded corners for the section
    marginBottom: 10, // Space below the section
    elevation: 5, // Shadow effect for depth
  },
  replyTitle: {
    fontSize: 16, // Font size for the title
    fontWeight: 'bold', // Bold text for emphasis
    marginBottom: 10, // Space below the title
  },
  replyInput: {
    backgroundColor: '#f1f1f1', // Background color for the input field
    padding: 10, // Padding inside the input field
    borderRadius: 5, // Rounded corners for the input field
    marginBottom: 10, // Space below the input field
    fontSize: 16, // Font size for the input text
  },
  submitReplyButton: {
    backgroundColor: '#FF6F00', // Background color for the submit button
    padding: 10, // Padding inside the button
    borderRadius: 5, // Rounded corners for the button
    alignItems: 'center', // Center text within the button
  },
  submitReplyButtonText: {
    color: '#FFF', // Text color for the button
    fontWeight: 'bold', // Bold text for emphasis
  },
});

export default ReplyInput;
