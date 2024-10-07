import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Importing the font icon library
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native"; // Import ScrollView here
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode';  // Import jwt-decode

const ProfileScreen = ({ navigation }) => {
  const [name, setUsername] = useState("");  // State to store username

  // Logout function
  const handleLogout = async () => {
    try {
      // Clear the token from AsyncStorage
      await AsyncStorage.removeItem("authToken");

      // Alert the user that they have logged out
      Alert.alert("Logged Out", "You have successfully logged out.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("RoleSelectionScreen"),
        },
      ]);
    } catch (error) {
      console.error("Logout error: ", error);
      Alert.alert("Error", "An error occurred during logout. Please try again.");
    }
  };

  // Function to load and decode the token
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const decodedToken = jwtDecode(token);  // Correct token decoding
        setUsername(decodedToken.name);  // Set the username from the decoded token
      }
    } catch (error) {
      console.error("Error decoding token: ", error);
    }
  };

  // Use effect to load the token when the component mounts
  useEffect(() => {
    loadToken();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        {/* Generic gender-neutral icon */}
        <View style={styles.iconContainer}>
          <FontAwesome name="user-circle-o" size={100} color="#888" />
        </View>
        <Text style={styles.profileName}>{name ? name : "User Name"}</Text>
 {/* Display the username */}
        <Text style={styles.profileBio}>I love arts and crafts</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('CartScreen')} >
          <Ionicons name="cart-outline" size={24} color="#1E88E5" />
          <Text style={styles.optionText}>Cart</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <FontAwesome name="heart-o" size={24} color="#E91E63" />
          <Text style={styles.optionText}>Favourite</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('payHistory')}>
          <MaterialIcons name="payment" size={24} color="#3F51B5" />
          <Text style={styles.optionText}>Payment History</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Bidding Section */}
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('BiddingScreen')}>
          <MaterialIcons name="gavel" size={24} color="#00C853" />
          <Text style={styles.optionText}>My Bidding</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Log Out */}
      <View style={styles.optionContainer}>
        {/* Log Out Option */}
        <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF5252" />
          <Text style={styles.optionText}>Log Out</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Footer Design */}
      <View style={styles.footerDesign}>
        {/* Add any custom design here (could be an image or SVG) */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileBio: {
    fontSize: 16,
    color: '#6c757d',
  },
  optionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  footerDesign: {
    marginTop: 20,
    alignItems: 'flex-end',
    paddingRight: 20,
    // Add footer styling or image here
  },
});

export default ProfileScreen;
