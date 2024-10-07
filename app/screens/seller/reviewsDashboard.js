import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';
import Toast from 'react-native-toast-message';

const ReviewPage = () => {
  // Sample reviews data
  const allReviews = [
    {
      id: 1,
      customer: 'John Doe',
      date: '2024-09-01',
      rating: 4,
      reviewText: 'Great product! Fast delivery.',
      reply: '',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      date: '2024-09-05',
      rating: 5,
      reviewText: 'Amazing quality, very satisfied.',
      reply: '',
    },
    {
      id: 3,
      customer: 'Alex Johnson',
      date: '2024-09-10',
      rating: 3,
      reviewText: 'Product was good, but delivery was late.',
      reply: '',
    },
    // Add more sample reviews as needed
  ];

  // State variables for filtering, selecting reviews, and replies
  const [filter, setFilter] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [filteredReviews, setFilteredReviews] = useState(allReviews);

  // Handle replying to a review
  const handleReplySubmit = () => {
    if (!replyText.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Reply Error',
        text2: 'Reply text cannot be empty!',
      });
      return; // Early return if the reply text is empty
    }

    if (selectedReview) {
      const updatedReviews = filteredReviews.map((review) =>
        review.id === selectedReview.id ? { ...review, reply: replyText } : review
      );
      setFilteredReviews(updatedReviews);
      showSuccessToast(); // Show success message when reply is sent
      setReplyText(''); // Clear the reply input
      setSelectedReview(null); // Clear the selected review after submitting the reply
    }
  };

  // Function to show success toast message after replying
  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Reply Sent',
      text2: 'Your reply was sent successfully!',
    });
  };

  // Handle filtering reviews in real-time
  const handleFilterChange = (text) => {
    setFilter(text);
    if (text) {
      const filtered = allReviews.filter((review) =>
        review.customer.toLowerCase().includes(text.toLowerCase()) ||
        review.reviewText.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredReviews(filtered);
    } else {
      setFilteredReviews(allReviews);
    }
  };

  // Load more reviews
  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 2); // Load 2 more reviews
  };

  // Render each review item
  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.customerName}>{item.customer}</Text>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
      <Rating
        type="star"
        startingValue={item.rating}
        imageSize={20}
        readonly
        style={styles.rating}
      />
      <Text style={styles.reviewText}>{item.reviewText}</Text>

      {/* Reply Section */}
      {item.reply ? (
        <View style={styles.replyContainer}>
          <Text style={styles.replyText}>Reply: {item.reply}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.replyButton}
          onPress={() => setSelectedReview(item)}
        >
          <Icon name="chatbox-outline" size={20} color="#FFF" />
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Customer Reviews</Text>

      {/* Filter Input */}
      <TextInput
        style={styles.filterInput}
        placeholder="Filter by product, customer, etc."
        value={filter}
        onChangeText={handleFilterChange}
      />

      {/* Reviews List */}
      <FlatList
        data={filteredReviews.slice(0, visibleReviews)} // Show only the number of visible reviews
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReviewItem}
        ListFooterComponent={
          visibleReviews < filteredReviews.length ? (
            <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
              <Text style={styles.loadMoreButtonText}>Load More</Text>
            </TouchableOpacity>
          ) : null
        }
      />

      {/* Reply Input Section */}
      {selectedReview && (
        <View style={styles.replySection}>
          <Text style={styles.replyTitle}>Reply to {selectedReview.customer}'s review:</Text>
          <TextInput
            style={styles.replyInput}
            placeholder="Type your reply here..."
            value={replyText}
            onChangeText={setReplyText}
          />
          <TouchableOpacity style={styles.submitReplyButton} onPress={handleReplySubmit}>
            <Text style={styles.submitReplyButtonText}>Submit Reply</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toast Notification */}
      <Toast />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  filterInput: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 3,
  },
  reviewCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  customerName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  rating: {
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
  replyContainer: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#e0ffe0',
    borderRadius: 5,
  },
  replyText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  replyButtonText: {
    color: '#FFF',
    marginLeft: 5,
  },
  replySection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  replyTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  replyInput: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    elevation: 3,
  },
  submitReplyButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  submitReplyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loadMoreButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ReviewPage;
