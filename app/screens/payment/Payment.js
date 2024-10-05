import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from "@expo/vector-icons";
import { useCart } from '../../components/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage
import jwtDecode from 'jwt-decode'; // Import jwt-decode to decode the token
import { API_BASE_URL } from "@env";

const PaymentScreen = ({ route, navigation }) => {
  const { amount } = route.params; // Get the amount from the previous page
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    userid: '', // Initialize userid
    name: '',
    cardNo: '',
    expiryDate: '',
    cvn: '',
  });

  const { clearCart } = useCart(); // Access clearCart from the context

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        setCardDetails((prevDetails) => ({
          ...prevDetails,
          userid: decodedToken.userId // Make sure 'id' exists in the decoded token
        }));
      }
    } catch (error) {
      console.error("Error decoding token: ", error);
    }
  };
  

  // Use effect to load the token when the component mounts
  useEffect(() => {
    loadToken();
  }, []);

  const handleChange = (name, value) => {
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const formatCardNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
    return formatted;
  };

  const isExpiryDateValid = (expiryDate) => {
    const [month, year] = expiryDate.split('/').map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // Months are 0-based
    const currentYear = now.getFullYear() % 100; // Last two digits of the year
    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  const handlePayment = async () => {
    const { name, cardNo, expiryDate, cvn, userid } = cardDetails; // Include userid

    if (!name || !cardNo || !expiryDate || !cvn) {
      Alert.alert('Please enter all card details');
      return;
    }

    // Validate Card Number
    const cardNoRegex = /^\d{16}$/;
    if (!cardNoRegex.test(cardNo.replace(/\s/g, ''))) {
      Alert.alert('Invalid card number format.');
      return;
    }

    // Validate CVN
    const cvnRegex = /^\d{3,4}$/;
    if (!cvnRegex.test(cvn)) {
      Alert.alert('Invalid CVN format.');
      return;
    }

    // Validate Expiry Date (MM/YY)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryDateRegex.test(expiryDate) || !isExpiryDateValid(expiryDate)) {
      Alert.alert('Invalid or expired expiry date format. Please use MM/YY.');
      return;
    }

    setLoading(true);
    try {
      const payload = { amount, name, cardNo: cardNo.replace(/\s/g, ''), expiryDate, cvn, userid }; // Include userid in payload
      console.log('Payload:', payload);

      const response = await axios.post(`${API_BASE_URL}/api/payments`, payload);
      console.log('Response:', response.data);

      if (response.status === 201) {
        Alert.alert('Payment successful!');
        clearCart(); // Clear the cart after successful payment
        navigation.navigate('ViewAll');
      }
    } catch (error) {
      console.error('Error creating payment:', error.response ? error.response.data : error.message);
      Alert.alert('Payment failed', error.response ? error.response.data.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Make Your Payment</Text>
        <Icon name="payment" size={100} color="#FF7622" style={styles.icon} />
        <Text style={styles.label}>Amount: ${amount}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Cardholder Name"
          value={cardDetails.name}
          onChangeText={(value) => handleChange('name', value)}
          placeholderTextColor="#B0B0B0" // Placeholder color
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Card Number"
          value={formatCardNumber(cardDetails.cardNo)}
          onChangeText={(value) => handleChange('cardNo', formatCardNumber(value))}
          keyboardType="numeric"
          maxLength={19} // Limit to 19 characters (16 digits + 3 spaces)
          placeholderTextColor="#B0B0B0" // Placeholder color
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Expiry Date (MM/YY)"
          value={cardDetails.expiryDate}
          onChangeText={(value) => handleChange('expiryDate', value)}
          placeholderTextColor="#B0B0B0" // Placeholder color
        />

        <TextInput
          style={styles.input}
          placeholder="Enter CVN"
          value={cardDetails.cvn}
          onChangeText={(value) => handleChange('cvn', value)}
          keyboardType="numeric"
          maxLength={4} // Limit to 4 digits
          placeholderTextColor="#B0B0B0" // Placeholder color
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Make Payment</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D2B",
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "center",
  },
  icon: {
    alignSelf: 'center', // Center the icon horizontally
    marginBottom: 10, // Space between icon and title
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#FF7622",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  backButton: {
    padding: 4,
    backgroundColor: "#0D0D2B",
  },
});

export default PaymentScreen;
