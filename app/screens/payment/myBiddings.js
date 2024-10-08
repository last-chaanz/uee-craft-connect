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
  const [filterState, setFilterState] = useState('all'); // Add filter state

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

  useEffect(() => {
    loadToken();
  }, []);

  const fetchProductState = async (name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/getProductByName/${name}`);
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

  const updateBidState = async (bidId, newState) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/updateBidState/${bidId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newState }),
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
        if (bid.state === 'paid') {
          return bid;
        }

        const productState = await fetchProductState(bid.productName);
        const highestBid = await fetchHighestBid(bid.productName);

        let newState = bid.state;

        if (productState === 'started') {
          newState = 'requested';
        } else if (productState === 'cancelled') {
          if (highestBid !== null && bid.bidamount === highestBid) {
            newState = 'accepted';
          } else {
            newState = 'rejected';
          }
        }

        if (newState !== bid.state) {
          const updatedBid = await updateBidState(bid._id, newState);
          return updatedBid ? updatedBid : bid;
        }

        return bid;
      }));

      setBids(updatedBids);
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
    setBids(updatedBids);

    try {
      const response = await fetch(`${API_BASE_URL}/api/updateBidState/${bidId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newState: 'paid' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating bid on server:', errorData);
        throw new Error(`Error updating bid: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating bid on server:', error);
    }

    fetchBids();
    navigation.navigate("PaymentScreen", { amount });
  };

  useEffect(() => {
    if (userid) {
      fetchBids();
    }
  }, [userid]);

  // Function to filter bids based on the filter state
  const filteredBids = bids.filter((bid) => {
    if (filterState === 'all') return true;
    if (filterState === 'accepted') {
      return bid.state === 'accepted' || bid.state === 'paid'; // Include both 'accepted' and 'paid'
    }
    return bid.state === filterState;
  });

  const renderItem = ({ item }) => (
    <View style={styles.bidItem}>
      <Icon name="pricetag-outline" size={24} color="#FF7622" style={styles.bidIcon} />
      <View style={styles.bidDetails}>
        <Text style={styles.bidAmount}>Bid Amount: ${item.bidamount}</Text>
        <Text style={styles.bidUserId}>Product Name: {item.productName}</Text>
        {item.state === 'rejected' && (
          <Text style={styles.bidUserId}>Lost and got {item.state}</Text>
        )}
        {item.state === 'accepted' && (
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={() => handlePlaceOrder(item.bidamount, item._id)}
          >
            <Text style={styles.placeOrderButtonText}>Buy Product</Text>
          </TouchableOpacity>
        )}
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

      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        {['all', 'requested', 'accepted', 'rejected'].map((state) => (
          <TouchableOpacity
            key={state}
            style={[
              styles.filterButton,
              filterState === state && styles.activeFilterButton,
            ]}
            onPress={() => setFilterState(state)}
          >
            <Text style={filterState === state ? styles.activeFilterText : styles.filterText}>
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF7622" />
      ) : (
        <FlatList
          data={filteredBids}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    marginLeft: 10,
  },
  bidAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bidUserId: {
    fontSize: 14,
    color: '#555',
  },
  bidIcon: {
    marginRight: 10,
  },
  placeOrderButton: {
    backgroundColor: '#FF7622',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  purchasedMessage: {
    color: '#00A676',
    fontWeight: 'bold',
    marginTop: 10,
  },
  separator: {
    height: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  activeFilterButton: {
    backgroundColor: '#FF7622',
  },
  filterText: {
    color: '#555',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default BiddingScreen;
