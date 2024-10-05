import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import jwtDecode from 'jwt-decode'; 
import { format } from 'date-fns'; // Make sure to install date-fns
import { API_BASE_URL } from "@env";

const TransactionScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserid] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  // Function to load the token and fetch user data
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.name);
        setUserid(decodedToken.userId);
        fetchTransactions(decodedToken.userId); // Fetch transactions
      }
    } catch (error) {
      console.error("Error decoding token: ", error);
    }
  };

  // Function to fetch transactions from the backend
  const fetchTransactions = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments?userid=${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTransactions(data); // Assuming data is an array of transaction objects
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Use effect to load the token when the component mounts
  useEffect(() => {
    loadToken();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Icon name="receipt-outline" size={24} color="#FF7622" style={styles.transactionIcon} /> 
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDate}>
          {format(new Date(item.dateOfPurchase), 'MMMM dd, yyyy HH:mm')} {/* Format the date */}
        </Text>
        <Text style={styles.transactionName}>Name in card: {item.name}</Text>
        <Text style={styles.transactionAmount}>Amount: ${item.amount}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>HELLO, {username.toUpperCase()}</Text>
        <Icon name="person-circle" size={40} color="#FFFFFF" />
      </View>
      <Text style={styles.title}>Transactions</Text>
      {loading ? ( // Show loading indicator while fetching data
        <ActivityIndicator size="large" color="#FF7622" />
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={item => item._id} // Use _id instead of id
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
    transactionItem: {
      backgroundColor: '#FFFFFF',
      padding: 15,
      borderRadius: 10,
      elevation: 3,
      flexDirection: 'row', // Align icon and details in a row
      alignItems: 'center',
    },
    transactionDetails: {
      flex: 1, // Take up remaining space
      marginLeft: 10, // Add some space between the icon and the details
    },
    transactionIcon: {
      marginRight: 10, // Space between icon and text
    },
    transactionDate: {
      textAlign: 'right',
      fontSize: 16,
      fontWeight: 'bold',
      color: 'grey',
    },
    transactionName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    transactionAmount: {
      fontSize: 16,
      color: '#FF7622',
      fontWeight: 'bold',
      marginTop: 5,
    },
    separator: {
      height: 10,
    },
  });  

export default TransactionScreen;
