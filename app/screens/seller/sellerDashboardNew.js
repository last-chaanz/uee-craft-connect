import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const SellerDashboard = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const menuItems = [
    { name: "Reports", icon: "bar-chart-outline", screen: "Reports" },
    { name: "Analytics", icon: "analytics-outline", screen: "Analytics" },
    { name: "Reviews", icon: "chatbubble-outline", screen: "Reviews" },
    { name: "Community", icon: "people-outline", screen: "CommunityResources" },
    { name: "Chat", icon: "chatbubbles-outline", screen: "CommunityChat" },
    { name: "Products", icon: "cash-outline", screen: "SellerAllProducts" },
  ];

  useEffect(() => {
    loadSellerData();
  }, []);

  const loadSellerData = async () => {
    const userJson = await AsyncStorage.getItem("currentUser");
    const user = JSON.parse(userJson);
    setCurrentUser(user);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}

        <View style={styles.topBar}>
          {/* <TouchableOpacity onPress={() => navigation.openDrawer()}> */}
          <TouchableOpacity onPress={() => {}}>
            <Icon name="menu" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432593/cld-sample.jpg",
              }}
              style={styles.topBarImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>
            Welcome Back {currentUser ? currentUser.name : "Seller"}
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>152</Text>
            <Text style={styles.statLabel}>Total Products</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹45,230</Text>
            <Text style={styles.statLabel}>Today's Sales</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Avg. Rating</Text>
          </View>
        </View>

        {/* Grid for Menu Options */}
        <View style={styles.gridContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gridItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Icon name={item.icon} size={40} color="#FF6F00" />
              <Text style={styles.gridText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <Icon name="cart-outline" size={24} color="#FF6F00" />
            <Text style={styles.activityText}>
              New order received - #ORD12345
            </Text>
          </View>
          <View style={styles.activityItem}>
            <Icon name="star-outline" size={24} color="#FF6F00" />
            <Text style={styles.activityText}>
              New review - 5 stars for Product XYZ
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddItem")}
      >
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FF6F00",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  topBarImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#FF6F00",
    paddingTop: 20,
    paddingBottom: 70,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,

    fontSize: 24,
    marginTop: 40,
    fontWeight: "bold",
  },
  quickStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#FFF",
    marginTop: -20,
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 5,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6F00",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  gridItem: {
    backgroundColor: "#FFF",
    width: width * 0.43,
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  gridText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  recentActivity: {
    backgroundColor: "#FFF",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  activityText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#FF6F00",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});

export default SellerDashboard;
