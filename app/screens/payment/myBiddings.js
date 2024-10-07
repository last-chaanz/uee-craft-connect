import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_BASE_URL } from "@env"; // Adjust the import if necessary
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode';  // Import jwt-decode

const BiddingScreen = ({ route, navigation }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [userid, setUserid] = useState('');

  // Function to load the token and fetch user data
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserid(decodedToken.userId);
      }
    } catch (error) {
      console.error("Error decoding token: ", error);
    }
  };

  // Use effect to load the token when the component mounts
  useEffect(() => {
    loadToken();
  }, []);

  // Fetch product by name to get the state
  const fetchProductState = async (name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/getProductByName/${(name)}`);
      if (!response.ok) {
        throw new Error(`Error fetching product state: ${response.status}`);
      }
      const productData = await response.json();
      return productData.state;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Fetch highest bid for a product by name
  const fetchHighestBid = async (productName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/highest-bid/${productName}`);
      if (!response.ok) {
        throw new Error(`Error fetching highest bid: ${response.status}`);
      }
      const highestBidData = await response.json();
      return highestBidData.highestBidAmount;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Function to update bid state in the backend
const updateBidState = async (bidId, newState) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/updateBidState/${bidId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newState }), // Send the new state in the body
      });
  
      if (!response.ok) {
        throw new Error(`Error updating bid state: ${response.status}`);
      }
  
      const updatedBid = await response.json();
      return updatedBid;
    } catch (error) {
      console.error('Error updating bid state: ', error);
      return null;
    }
  };
  
  const fetchBids = async () => {
    if (!userid) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/getBidsByuserid/${userid}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const updatedBids = await Promise.all(data.map(async (bid) => {
        // Skip updating if the bid is already paid
        if (bid.state === 'paid') {
          return bid;
        }
  
        // Extract productName from each bid
        const productState = await fetchProductState(bid.productName);
        const highestBid = await fetchHighestBid(bid.productName);
  
        let newState = bid.state;
  
        // Update state based on product state and highest bid logic
        if (productState === 'started') {
          newState = 'requested';
        } else if (productState === 'cancelled') {
          if (highestBid !== null && bid.bidamount === highestBid) {
            newState = 'accepted';
          } else {
            newState = 'rejected';
          }
        }
  
        // If state changes, update bid
        if (newState !== bid.state) {
          const updatedBid = await updateBidState(bid._id, newState);
          return updatedBid ? updatedBid : bid;
        }
  
        return bid;
      }));
  
      setBids(updatedBids); // Set the bids with updated states
    } catch (error) {
      console.error('Error fetching bids: ', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handlePlaceOrder = async (amount, bidId) => {
    const updatedBids = bids.map(bid => 
      bid._id === bidId ? { ...bid, state: 'paid' } : bid
    );
    setBids(updatedBids); // Update the local state
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/updateBidState/${bidId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newState: 'paid' }), // Change 'state' to 'newState'
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating bid on server:', errorData);
        throw new Error(`Error updating bid: ${response.status}`);
      }
  
      // Optionally, you could also get the response data and update bids if needed
      // const updatedBid = await response.json(); // If you want to get the updated bid
  
    } catch (error) {
      console.error('Error updating bid on server:', error);
    }
  
    // Refetch bids to ensure the latest state
    fetchBids(); // Call this to update the bids after placing the order
  
    // Navigate to PaymentScreen (if applicable)
    navigation.navigate("PaymentScreen", { amount });
  };
  
    

  // Use effect to fetch bids when userid changes
  useEffect(() => {
    if (userid) {
      fetchBids();
    }
  }, [userid]); // Run only when userid is set

  const renderItem = ({ item }) => (
    <View style={styles.bidItem}>
      <Icon name="pricetag-outline" size={24} color="#FF7622" style={styles.bidIcon} />
      <View style={styles.bidDetails}>
        <Text style={styles.bidAmount}>Bid Amount: ${item.bidamount}</Text>
        <Text style={styles.bidUserId}>Product Name: {item.productName}</Text>
        {item.state === 'rejected' && ( 
        <Text style={styles.bidUserId}>Lost and got {item.state}</Text>
        )}

        {item.state === 'accepted' && ( // Show button if state is 'accepted'
          <TouchableOpacity 
            style={styles.placeOrderButton} 
            onPress={() => handlePlaceOrder(item.bidamount, item._id)}  // Pass a function reference
          >
            <Text style={styles.placeOrderButtonText}>Buy Product</Text>
          </TouchableOpacity>
        )}
        
        {/* Display message if the state is 'paid' */}
        {item.state === 'paid' && (
          <Text style={styles.purchasedMessage}>You won the bid and bought this product!</Text>
        )}
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Made Bids</Text>
        <Icon name="pricetag" size={40} color="#FFFFFF" />
      </View>
      
      {loading ? ( // Show loading indicator while fetching data
        <ActivityIndicator size="large" color="#FF7622" />
      ) : (
        <FlatList
          data={bids}
          renderItem={renderItem}
          keyExtractor={item => item._id} // Assuming each bid has a unique _id
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />} // Add separators
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7622',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 100,
  },
  bidItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidDetails: {
    flex: 1,
    marginLeft: 10, // Add some space between the icon and the details
  },
  bidIcon: {
    marginRight: 10,
  },
  bidAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7622',
  },
  bidUserId: {
    fontSize: 16,
    color: 'grey',
  },
  separator: {
    height: 10,
  },
  highestBidContainer: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#FFFFE0',
    borderRadius: 10,
  },
  highestBidText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7622',
  },
  placeOrderButton: {
    backgroundColor: "#FF9500",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  placeOrderButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  purchasedMessage:{
    color: "red",
  }
});

export default BiddingScreen;
