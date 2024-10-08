// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Rating } from 'react-native-ratings';
// import Toast from 'react-native-toast-message';

// const ReviewPage = () => {
//   // Sample reviews data
//   const allReviews = [
//     {
//       id: 1,
//       customer: 'John Doe',
//       date: '2024-09-01',
//       rating: 4,
//       reviewText: 'Great product! Fast delivery.',
//       reply: '',
//     },
//     {
//       id: 2,
//       customer: 'Jane Smith',
//       date: '2024-09-05',
//       rating: 5,
//       reviewText: 'Amazing quality, very satisfied.',
//       reply: '',
//     },
//     {
//       id: 3,
//       customer: 'Alex Johnson',
//       date: '2024-09-10',
//       rating: 3,
//       reviewText: 'Product was good, but delivery was late.',
//       reply: '',
//     },
//     {
//       id: 4,
//       customer: 'Maria Lopez',
//       date: '2024-09-15',
//       rating: 5,
//       reviewText: 'Excellent quality and fast delivery. Highly recommend!',
//       reply: '',
//     },
//     {
//       id: 5,
//       customer: 'David Kim',
//       date: '2024-09-18',
//       rating: 2,
//       reviewText: 'The product quality was not as expected. Disappointed with the purchase.',
//       reply: '',
//     },
//     {
//       id: 6,
//       customer: 'Emily Chen',
//       date: '2024-09-20',
//       rating: 4,
//       reviewText: 'Good value for the price, but packaging could be improved.',
//       reply: '',
//     },
//     {
//       id: 7,
//       customer: 'Michael Brown',
//       date: '2024-09-22',
//       rating: 1,
//       reviewText: 'The item arrived damaged, and I am still waiting for a refund.',
//       reply: '',
//     },
//     {
//       id: 8,
//       customer: 'Sophie Patel',
//       date: '2024-09-25',
//       rating: 5,
//       reviewText: 'Fantastic service and great product! Will order again.',
//       reply: '',
//     },
//     // Add more sample reviews as needed
//   ];

//   // State variables for filtering, selecting reviews, and replies
//   const [filter, setFilter] = useState('');
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [replyText, setReplyText] = useState('');
//   const [visibleReviews, setVisibleReviews] = useState(4);
//   const [filteredReviews, setFilteredReviews] = useState(allReviews);

//   // Handle replying to a review
//   const handleReplySubmit = () => {
//     if (!replyText.trim()) {
//       Toast.show({
//         type: 'error',
//         text1: 'Reply Error',
//         text2: 'Reply text cannot be empty!',
//       });
//       return; // Early return if the reply text is empty
//     }

//     if (selectedReview) {
//       const updatedReviews = filteredReviews.map((review) =>
//         review.id === selectedReview.id ? { ...review, reply: replyText } : review
//       );
//       setFilteredReviews(updatedReviews);
//       showSuccessToast(); // Show success message when reply is sent
//       setReplyText(''); // Clear the reply input
//       setSelectedReview(null); // Clear the selected review after submitting the reply
//     }
//   };

//   // Function to show success toast message after replying
//   const showSuccessToast = () => {
//     Toast.show({
//       type: 'success',
//       text1: 'Reply Sent',
//       text2: 'Your reply was sent successfully!',
//     });
//   };

//   // Handle filtering reviews in real-time
//   const handleFilterChange = (text) => {
//     setFilter(text);
//     if (text) {
//       const filtered = allReviews.filter((review) =>
//         review.customer.toLowerCase().includes(text.toLowerCase()) ||
//         review.reviewText.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredReviews(filtered);
//     } else {
//       setFilteredReviews(allReviews);
//     }
//   };

//   // Load more reviews
//   const handleLoadMore = () => {
//     setVisibleReviews((prev) => prev + 2); // Load 2 more reviews
//   };

//   // Render each review item
//   const renderReviewItem = ({ item }) => (
//     <View style={styles.reviewCard}>
//       <View style={styles.reviewHeader}>
//         <Text style={styles.customerName}>{item.customer}</Text>
//         <Text style={styles.reviewDate}>{item.date}</Text>
//       </View>
//       <Rating
//         type="star"
//         startingValue={item.rating}
//         imageSize={20}
//         readonly
//         style={styles.rating}
//       />
//       <Text style={styles.reviewText}>{item.reviewText}</Text>

//       {/* Reply Section */}
//       {item.reply ? (
//         <View style={styles.replyContainer}>
//           <Text style={styles.replyText}>Reply: {item.reply}</Text>
//         </View>
//       ) : (
//         <TouchableOpacity
//           style={styles.replyButton}
//           onPress={() => setSelectedReview(item)}
//         >
//           <Icon name="chatbox-outline" size={20} color="#FFF" />
//           <Text style={styles.replyButtonText}>Reply</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.pageTitle}>Customer Reviews</Text>

//       {/* Filter Input */}
//       <TextInput
//         style={styles.filterInput}
//         placeholder="Filter by product, customer, etc."
//         value={filter}
//         onChangeText={handleFilterChange}
//       />

//       {/* Reviews List */}
//       <FlatList
//         data={filteredReviews.slice(0, visibleReviews)} // Show only the number of visible reviews
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderReviewItem}
//         ListFooterComponent={
//           visibleReviews < filteredReviews.length ? (
//             <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
//               <Text style={styles.loadMoreButtonText}>Load More</Text>
//             </TouchableOpacity>
//           ) : null
//         }
//       />

//       {/* Reply Input Section */}
//       {selectedReview && (
//         <View style={styles.replySection}>
//           <Text style={styles.replyTitle}>Reply to {selectedReview.customer}'s review:</Text>
//           <TextInput
//             style={styles.replyInput}
//             placeholder="Type your reply here..."
//             value={replyText}
//             onChangeText={setReplyText}
//           />
//           <View style={styles.replyButtonsContainer}>
//             <TouchableOpacity style={styles.submitReplyButton} onPress={handleReplySubmit}>
//               <Text style={styles.submitReplyButtonText}>Submit Reply</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedReview(null)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* Toast Notification */}
//       <Toast />
//     </ScrollView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   pageTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   filterInput: {
//     backgroundColor: '#FFF',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     elevation: 3,
//   },
//   reviewCard: {
//     backgroundColor: '#FFF',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 5,
//   },
//   reviewHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   customerName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#000',
//   },
//   reviewDate: {
//     fontSize: 12,
//     color: '#666',
//   },
//   rating: {
//     marginBottom: 5,
//   },
//   reviewText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   replyContainer: {
//     marginTop: 10,
//     padding: 5,
//     backgroundColor: '#e0ffe0',
//     borderRadius: 5,
//   },
//   replyText: {
//     fontSize: 14,
//     fontStyle: 'italic',
//   },
//   replyButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   replyButtonText: {
//     color: '#FFF',
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   replySection: {
//     backgroundColor: '#FFF',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 15,
//     elevation: 3,
//   },
//   replyTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   replyInput: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     fontSize: 14,
//     elevation: 2,
//   },
//   replyButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   submitReplyButton: {
//     backgroundColor: '#28a745',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 5,
//   },
//   submitReplyButtonText: {
//     color: '#FFF',
//     textAlign: 'center',
//   },
//   closeButton: {
//     backgroundColor: '#dc3545',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginLeft: 5,
//   },
//   closeButtonText: {
//     color: '#FFF',
//     textAlign: 'center',
//   },
//   loadMoreButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   loadMoreButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//   },
// });

// export default ReviewPage;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Rating } from 'react-native-ratings';
// import Toast from 'react-native-toast-message';

// const ReviewPage = () => {
//   // Sample reviews data
//   const allReviews = [
//     {
//       id: 1,
//       customer: 'John Doe',
//       date: '2024-09-01',
//       rating: 4,
//       reviewText: 'Great product! Fast delivery.',
//       reply: '',
//     },
//     {
//       id: 2,
//       customer: 'Jane Smith',
//       date: '2024-09-05',
//       rating: 5,
//       reviewText: 'Amazing quality, very satisfied.',
//       reply: '',
//     },
//     {
//       id: 3,
//       customer: 'Alex Johnson',
//       date: '2024-09-10',
//       rating: 3,
//       reviewText: 'Product was good, but delivery was late.',
//       reply: '',
//     },
//     {
//       id: 4,
//       customer: 'Maria Lopez',
//       date: '2024-09-15',
//       rating: 5,
//       reviewText: 'Excellent quality and fast delivery. Highly recommend!',
//       reply: '',
//     },
//   ];

//   const [filter, setFilter] = useState('');
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [replyText, setReplyText] = useState('');
//   const [visibleReviews, setVisibleReviews] = useState(allReviews.length);

//   // Handle reply submission
//   const handleReplySubmit = () => {
//     if (!replyText.trim()) {
//       Toast.show({
//         type: 'error',
//         text1: 'Reply Error',
//         text2: 'Reply text cannot be empty!',
//       });
//       return;
//     }

//     if (selectedReview) {
//       const updatedReviews = allReviews.map((review) =>
//         review.id === selectedReview.id ? { ...review, reply: replyText } : review
//       );
//       setVisibleReviews(updatedReviews);
//       showSuccessToast();
//       setReplyText('');
//       setSelectedReview(null);
//     }
//   };

//   const showSuccessToast = () => {
//     Toast.show({
//       type: 'success',
//       text1: 'Reply Sent',
//       text2: 'Your reply was sent successfully!',
//     });
//   };

//   // Filter reviews based on input
//   const handleFilterChange = (text) => {
//     setFilter(text);
//   };

//   // Render each review item
//   const renderReviewItem = ({ item }) => (
//     <View style={styles.reviewCard}>
//       <View style={styles.reviewHeader}>
//         <Text style={styles.customerName}>{item.customer}</Text>
//         <Text style={styles.reviewDate}>{item.date}</Text>
//       </View>
//       <Rating
//         type="star"
//         startingValue={item.rating}
//         imageSize={20}
//         readonly
//         style={styles.rating}
//       />
//       <Text style={styles.reviewText}>{item.reviewText}</Text>

//       {item.reply ? (
//         <View style={styles.replyContainer}>
//           <Text style={styles.replyText}>Reply: {item.reply}</Text>
//         </View>
//       ) : (
//         <TouchableOpacity
//           style={styles.replyButton}
//           onPress={() => setSelectedReview(item)}
//         >
//           <Icon name="chatbox-outline" size={20} color="#FFF" />
//           <Text style={styles.replyButtonText}>Reply</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   // Handle replies section
//   const renderReplySection = () => (
//     selectedReview && (
//       <View style={styles.replySection}>
//         <Text style={styles.replyTitle}>Reply to {selectedReview.customer}'s review:</Text>
//         <TextInput
//           style={styles.replyInput}
//           placeholder="Type your reply here..."
//           value={replyText}
//           onChangeText={setReplyText}
//         />
//         <View style={styles.replyButtonsContainer}>
//           <TouchableOpacity style={styles.submitReplyButton} onPress={handleReplySubmit}>
//             <Text style={styles.submitReplyButtonText}>Submit Reply</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedReview(null)}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     )
//   );

//   // Combine reviews and reply section for FlatList
//   const data = [
//     ...allReviews.filter((review) => 
//       review.customer.toLowerCase().includes(filter.toLowerCase()) || 
//       review.reviewText.toLowerCase().includes(filter.toLowerCase())
//     ).slice(0, visibleReviews),
//     { isReplySection: true }, // Dummy item for rendering reply section
//   ];

//   return (
//     <FlatList
//       data={data}
//       keyExtractor={(item) => (item.id ? item.id.toString() : 'reply-section')}
//       renderItem={({ item }) => item.isReplySection ? renderReplySection() : renderReviewItem({ item })}
//       ListHeaderComponent={
//         <View>
//           <Text style={styles.pageTitle}>Customer Reviews</Text>
//           <TextInput
//             style={styles.filterInput}
//             placeholder="Filter by customer, review text, etc."
//             value={filter}
//             onChangeText={handleFilterChange}
//           />
//         </View>
//       }
//       ListFooterComponent={
//         visibleReviews < allReviews.length && (
//           <TouchableOpacity
//             style={styles.loadMoreButton}
//             onPress={() => setVisibleReviews((prev) => prev + 2)}
//           >
//             <Text style={styles.loadMoreButtonText}>Load More</Text>
//           </TouchableOpacity>
//         )
//       }
//       contentContainerStyle={styles.container}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   pageTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   filterInput: {
//     backgroundColor: '#FFF',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     elevation: 3,
//   },
//   reviewCard: {
//     backgroundColor: '#FFF',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 5,
//   },
//   reviewHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   customerName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#000',
//   },
//   reviewDate: {
//     fontSize: 12,
//     color: '#666',
//   },
//   rating: {
//     marginBottom: 5,
//   },
//   reviewText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   replyContainer: {
//     marginTop: 10,
//     padding: 5,
//     backgroundColor: '#e0ffe0',
//     borderRadius: 5,
//   },
//   replyText: {
//     fontSize: 14,
//     fontStyle: 'italic',
//   },
//   replyButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   replyButtonText: {
//     color: '#FFF',
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   replySection: {
//     backgroundColor: '#FFF',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 15,
//     elevation: 3,
//   },
//   replyTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   replyInput: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     fontSize: 14,
//   },
//   replyButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   submitReplyButton: {
//     backgroundColor: '#28a745',
//     padding: 10,
//     borderRadius: 5,
//   },
//   submitReplyButtonText: {
//     color: '#FFF',
//     fontSize: 14,
//   },
//   closeButton: {
//     backgroundColor: '#dc3545',
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: '#FFF',
//     fontSize: 14,
//   },
//   loadMoreButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   loadMoreButtonText: {
//     color: '#FFF',
//     fontSize: 14,
//   },
// });

// export default ReviewPage;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Rating } from 'react-native-ratings';
// import Toast from 'react-native-toast-message';

// const ReviewPage = () => {
//   // Sample reviews data
//   const allReviews = [
//     {
//       id: 1,
//       customer: 'John Doe',
//       date: '2024-09-01',
//       rating: 4,
//       reviewText: 'Great product! Fast delivery.',
//       reply: '',
//     },
//     {
//       id: 2,
//       customer: 'Jane Smith',
//       date: '2024-09-05',
//       rating: 5,
//       reviewText: 'Amazing quality, very satisfied.',
//       reply: '',
//     },
//     {
//       id: 3,
//       customer: 'Alex Johnson',
//       date: '2024-09-10',
//       rating: 3,
//       reviewText: 'Product was good, but delivery was late.',
//       reply: '',
//     },
//     {
//       id: 4,
//       customer: 'Maria Lopez',
//       date: '2024-09-15',
//       rating: 5,
//       reviewText: 'Excellent quality and fast delivery. Highly recommend!',
//       reply: '',
//     },
//     {
//       id: 5,
//       customer: 'David Kim',
//       date: '2024-09-18',
//       rating: 2,
//       reviewText: 'The product quality was not as expected. Disappointed with the purchase.',
//       reply: '',
//     },
//     {
//       id: 6,
//       customer: 'Emily Chen',
//       date: '2024-09-20',
//       rating: 4,
//       reviewText: 'Good value for the price, but packaging could be improved.',
//       reply: '',
//     },
//     {
//       id: 7,
//       customer: 'Michael Brown',
//       date: '2024-09-22',
//       rating: 1,
//       reviewText: 'The item arrived damaged, and I am still waiting for a refund.',
//       reply: '',
//     },
//     {
//       id: 8,
//       customer: 'Sophie Patel',
//       date: '2024-09-25',
//       rating: 5,
//       reviewText: 'Fantastic service and great product! Will order again.',
//       reply: '',
//     },
//   ];

//   // State variables for filtering, selecting reviews, and replies
//   const [filter, setFilter] = useState('');
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [replyText, setReplyText] = useState('');
//   const [visibleReviews, setVisibleReviews] = useState(4);
//   const [filteredReviews, setFilteredReviews] = useState(allReviews);

//   // Handle replying to a review
//   const handleReplySubmit = () => {
//     if (!replyText.trim()) {
//       Toast.show({
//         type: 'error',
//         text1: 'Reply Error',
//         text2: 'Reply text cannot be empty!',
//       });
//       return;
//     }

//     if (selectedReview) {
//       const updatedReviews = filteredReviews.map((review) =>
//         review.id === selectedReview.id ? { ...review, reply: replyText } : review
//       );
//       setFilteredReviews(updatedReviews);
//       showSuccessToast();
//       setReplyText('');
//       setSelectedReview(null);
//     }
//   };

//   // Function to show success toast message after replying
//   const showSuccessToast = () => {
//     Toast.show({
//       type: 'success',
//       text1: 'Reply Sent',
//       text2: 'Your reply was sent successfully!',
//     });
//   };

//   // Handle filtering reviews in real-time
//   const handleFilterChange = (text) => {
//     setFilter(text);
//     if (text) {
//       const filtered = allReviews.filter((review) =>
//         review.customer.toLowerCase().includes(text.toLowerCase()) ||
//         review.reviewText.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredReviews(filtered);
//     } else {
//       setFilteredReviews(allReviews);
//     }
//   };

//   // Load more reviews
//   const handleLoadMore = () => {
//     setVisibleReviews((prev) => prev + 2); // Load 2 more reviews
//   };

//   // Render each review item
//   const renderReviewItem = ({ item }) => (
//     <View style={styles.reviewCard}>
//       <View style={styles.reviewHeader}>
//         <Text style={styles.customerName}>{item.customer}</Text>
//         <Text style={styles.reviewDate}>{item.date}</Text>
//       </View>
//       <Rating
//         type="star"
//         startingValue={item.rating}
//         imageSize={20}
//         readonly
//         style={styles.rating}
//       />
//       <Text style={styles.reviewText}>{item.reviewText}</Text>

//       {/* Reply Section */}
//       {item.reply ? (
//         <View style={styles.replyContainer}>
//           <Text style={styles.replyText}>Reply: {item.reply}</Text>
//         </View>
//       ) : (
//         <TouchableOpacity
//           style={styles.replyButton}
//           onPress={() => setSelectedReview(item)}
//         >
//           <Icon name="chatbox-outline" size={20} color="#FFF" />
//           <Text style={styles.replyButtonText}>Reply</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.pageTitle}>Customer Reviews</Text>

//       {/* Filter Input */}
//       <TextInput
//         style={styles.filterInput}
//         placeholder="Filter by product, customer, etc."
//         value={filter}
//         onChangeText={handleFilterChange}
//       />

//       {/* Reviews List */}
//       <FlatList
//         data={filteredReviews.slice(0, visibleReviews)} // Show only the number of visible reviews
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderReviewItem}
//         ListFooterComponent={
//           visibleReviews < filteredReviews.length ? (
//             <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
//               <Text style={styles.loadMoreButtonText}>Load More</Text>
//             </TouchableOpacity>
//           ) : null
//         }
//       />

//       {/* Reply Input Section */}
//       {selectedReview && (
//         <View style={styles.replySection}>
//           <Text style={styles.replyTitle}>Reply to {selectedReview.customer}'s review:</Text>
//           <TextInput
//             style={styles.replyInput}
//             placeholder="Type your reply here..."
//             value={replyText}
//             onChangeText={setReplyText}
//           />
//           <View style={styles.replyButtonsContainer}>
//             <TouchableOpacity style={styles.submitReplyButton} onPress={handleReplySubmit}>
//               <Text style={styles.submitReplyButtonText}>Submit Reply</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedReview(null)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* Toast Notification */}
//       <Toast />
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   pageTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   filterInput: {
//     backgroundColor: '#FFF',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     elevation: 3,
//   },
//   reviewCard: {
//     backgroundColor: '#FFF',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 5,
//   },
//   reviewHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   customerName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#000',
//   },
//   reviewDate: {
//     fontSize: 12,
//     color: '#666',
//   },
//   rating: {
//     marginBottom: 5,
//   },
//   reviewText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   replyContainer: {
//     marginTop: 10,
//     padding: 5,
//     backgroundColor: '#e0ffe0',
//     borderRadius: 5,
//   },
//   replyText: {
//     fontSize: 14,
//     fontStyle: 'italic',
//   },
//   replyButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   replyButtonText: {
//     color: '#FFF',
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   replySection: {
//     backgroundColor: '#FFF',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 15,
//     elevation: 3,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   replyTitle: {
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   replyInput: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   replyButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   submitReplyButton: {
//     backgroundColor: '#28a745',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 5,
//   },
//   submitReplyButtonText: {
//     color: '#FFF',
//     textAlign: 'center',
//   },
//   closeButton: {
//     backgroundColor: '#dc3545',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginLeft: 5,
//   },
//   closeButtonText: {
//     color: '#FFF',
//     textAlign: 'center',
//   },
//   loadMoreButton: {
//     padding: 10,
//     alignItems: 'center',
//     backgroundColor: '#007BFF',
//     borderRadius: 5,
//     marginVertical: 10,
//   },
//   loadMoreButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//   },
// });

// export default ReviewPage;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';
import Toast from 'react-native-toast-message';

const ReviewPage = () => {
  // Sample reviews data
  const allReviews = [
    { id: 1, customer: 'John Doe', date: '2024-09-01', rating: 4, reviewText: 'Great product! Fast delivery.', reply: '' },
    { id: 2, customer: 'Jane Smith', date: '2024-09-05', rating: 5, reviewText: 'Amazing quality, very satisfied.', reply: '' },
    { id: 3, customer: 'Alex Johnson', date: '2024-09-10', rating: 3, reviewText: 'Product was good, but delivery was late.', reply: '' },
    { id: 4, customer: 'Maria Lopez', date: '2024-09-15', rating: 5, reviewText: 'Excellent quality and fast delivery. Highly recommend!', reply: '' },
    { id: 5, customer: 'David Kim', date: '2024-09-18', rating: 2, reviewText: 'The product quality was not as expected. Disappointed with the purchase.', reply: '' },
    { id: 6, customer: 'Emily Chen', date: '2024-09-20', rating: 4, reviewText: 'Good value for the price, but packaging could be improved.', reply: '' },
    { id: 7, customer: 'Michael Brown', date: '2024-09-22', rating: 1, reviewText: 'The item arrived damaged, and I am still waiting for a refund.', reply: '' },
    { id: 8, customer: 'Sophie Patel', date: '2024-09-25', rating: 5, reviewText: 'Fantastic service and great product! Will order again.', reply: '' },
  ];

  // State variables
  const [filter, setFilter] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [filteredReviews, setFilteredReviews] = useState(allReviews);
  const [modalVisible, setModalVisible] = useState(false);

  // Handle replying to a review
  const handleReplySubmit = () => {
    if (!replyText.trim()) {
      Toast.show({ type: 'error', text1: 'Reply Error', text2: 'Reply text cannot be empty!' });
      return;
    }

    if (selectedReview) {
      const updatedReviews = filteredReviews.map((review) =>
        review.id === selectedReview.id ? { ...review, reply: replyText } : review
      );
      setFilteredReviews(updatedReviews);
      showSuccessToast();
      setReplyText('');
      setSelectedReview(null);
      setModalVisible(false); // Close the modal after submitting the reply
    }
  };

  // Function to show success toast message after replying
  const showSuccessToast = () => {
    Toast.show({ type: 'success', text1: 'Reply Sent', text2: 'Your reply was sent successfully!' });
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
          onPress={() => {
            setSelectedReview(item);
            setModalVisible(true); // Open modal for replying
          }}
        >
          <Icon name="chatbox-outline" size={20} color="#FFF" />
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
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
        ListFooterComponent={visibleReviews < filteredReviews.length ? (
          <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
            <Text style={styles.loadMoreButtonText}>Load More</Text>
          </TouchableOpacity>
        ) : null}
      />

      {/* Reply Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.replySection}>
            <Text style={styles.replyTitle}>Reply to {selectedReview?.customer}'s review:</Text>
            <TextInput
              style={styles.replyInput}
              placeholder="Type your reply here..."
              value={replyText}
              onChangeText={setReplyText}
            />
            <View style={styles.replyButtonsContainer}>
              <TouchableOpacity style={styles.submitReplyButton} onPress={handleReplySubmit}>
                <Text style={styles.submitReplyButtonText}>Submit Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Toast Notification */}
      <Toast />
    </View>
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
  loadMoreButton: {
    padding: 10,
    alignItems: 'center',
  },
  loadMoreButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  replySection: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  replyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  replyInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  replyButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitReplyButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  submitReplyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    flex: 1,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ReviewPage;




