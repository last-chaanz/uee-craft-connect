import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Using Ionicons for icons

const SellerDashboard = ({ navigation }) => {
  const sellerData = {
    name: "Ruwan Perera",
    id: "20190108R",
    joinedDate: "2019-10-15",
    status: "Active",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Product Seller</Text>
        <Text style={styles.welcome}>Hello {sellerData.name}</Text>
        <View style={styles.sellerInfo}>
          <Text style={styles.infoText}>Seller ID : {sellerData.id}</Text>
          <Text style={styles.infoText}>
            Joined Date : {sellerData.joinedDate}
          </Text>
          <Text style={styles.infoText}>Status : {sellerData.status}</Text>
        </View>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://example.com/ruwan-profile-pic.jpg" }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Grid for Menu Options */}
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("Reports")}
        >
          <Icon name="bar-chart-outline" size={50} color="#000" />
          <Text style={styles.gridText}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("Analytics")}
        >
          <Icon name="analytics-outline" size={50} color="#000" />
          <Text style={styles.gridText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("Reviews")}
        >
          <Icon name="chatbubble-outline" size={50} color="#000" />
          <Text style={styles.gridText}>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("CommunityResources")}
        >
          <Icon name="people-outline" size={50} color="#000" />
          <Text style={styles.gridText}>Community & Resources</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("CommunityChat")}
        >
          <Icon name="chatbubbles-outline" size={50} color="#000" />
          <Text style={styles.gridText}>Community Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("Bidding")}
        >
          <Icon name="cash-outline" size={50} color="#000" />
          <Text style={styles.gridText}>Bidding</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddItem")} // Navigate to AddItem page
      >
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#FF6F00",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    position: "relative",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  welcome: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  sellerInfo: {
    alignItems: "center",
  },
  infoText: {
    color: "#FFF",
    fontSize: 14,
  },
  profileImageContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 30,
    overflow: "hidden",
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    backgroundColor: "#FFF",
    width: "45%",
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    elevation: 5,
  },
  gridText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#FF6F00",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
});

export default SellerDashboard;
