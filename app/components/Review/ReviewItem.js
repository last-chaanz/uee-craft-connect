import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons';

const ReviewItem = ({ review, onReplyPress }) => {
  return (
    <View style={styles.reviewCard}>
      {/* Review Header with Customer Name and Date */}
      <View style={styles.reviewHeader}>
        <Text style={styles.customerName}>{review.customer}</Text>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      
      {/* Rating Component */}
      <Rating 
        type="star" 
        startingValue={review.rating} 
        imageSize={20} 
        readonly 
        style={styles.rating} 
      />
      
      {/* Review Text */}
      <Text style={styles.reviewText}>{review.reviewText}</Text>

      {/* Reply Section */}
      {review.reply ? (
        <View style={styles.replyContainer}>
          <Text style={styles.replyText}>Reply: {review.reply}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.replyButton} onPress={onReplyPress}>
          <Icon name="chatbox-outline" size={20} color="#FFF" />
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: '#FFF', // Background color for the review card
    padding: 15, // Padding inside the card
    borderRadius: 10, // Rounded corners for the card
    marginBottom: 10, // Space below the card
    elevation: 5, // Shadow effect for depth
  },
  reviewHeader: {
    flexDirection: 'row', // Aligns the customer name and date in a row
    justifyContent: 'space-between', // Space between name and date
    marginBottom: 5, // Space below the header
  },
  customerName: {
    fontWeight: 'bold', // Bold text for customer name
    fontSize: 16, // Font size for customer name
    color: '#000', // Color for customer name
  },
  reviewDate: {
    fontSize: 12, // Font size for review date
    color: '#666', // Color for review date
  },
  rating: {
    marginBottom: 5, // Space below the rating
  },
  reviewText: {
    fontSize: 14, // Font size for review text
    color: '#333', // Color for review text
    marginBottom: 10, // Space below the review text
  },
  replyButton: {
    flexDirection: 'row', // Aligns icon and text in a row
    alignItems: 'center', // Centers items vertically
    backgroundColor: '#FF6F00', // Background color for reply button
    padding: 10, // Padding inside the reply button
    borderRadius: 5, // Rounded corners for the reply button
  },
  replyButtonText: {
    color: '#FFF', // Text color for the reply button
    marginLeft: 5, // Space between icon and text
    fontWeight: 'bold', // Bold text for the reply button
  },
  replyContainer: {
    marginTop: 10, // Space above the reply container
    backgroundColor: '#f1f1f1', // Background color for the reply container
    padding: 10, // Padding inside the reply container
    borderRadius: 5, // Rounded corners for the reply container
  },
  replyText: {
    fontStyle: 'italic', // Italic style for reply text
    fontSize: 14, // Font size for reply text
    color: '#333', // Color for reply text
  },
});

export default ReviewItem;
