import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const SellerDashboardNew = ({ navigation }) => {
  const sellerData = {
    name: "Ruwan Perera",
    id: "20190108R",
    joinedDate: "2019-10-15",
    status: "Active",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          {/* <TouchableOpacity onPress={() => navigation.openDrawer()}> */}
          <TouchableOpacity onPress={() => {}}>
            {/* <Entypo name="menu" size={24} color="#FFF" /> */}
            <Icon name="menu" size={36} color="#FFF" />
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

        {/* Header Content */}
        <View style={styles.headerContent}>
          <Text style={styles.title}>Product Seller</Text>
          <Text style={styles.welcome}>Hello {sellerData.name}</Text>
          <View style={styles.sellerInfo}>
            <Text style={styles.infoText}>Seller ID : {sellerData.id}</Text>
            <Text style={styles.infoText}>
              Joined Date : {sellerData.joinedDate}
            </Text>
            <Text style={styles.infoText}>Status : {sellerData.status}</Text>
          </View>
        </View>

        {/* Grid Container */}
        <View style={styles.gridWrapper}>
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
        </View>

        {/* Floating Action Button with Background */}
        <View style={styles.floatingButtonContainer}>
          <View style={styles.floatingButtonBackground} />
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => navigation.navigate("AddItem")}
          >
            <Icon name="add" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FF6F00",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topBarImage: {
    width: 36,
    height: 36,
    borderRadius: 15,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
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
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
  gridWrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: 20,
  },
  gridItem: {
    backgroundColor: "#F5F5F5",
    width: width * 0.3,

    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    elevation: 5,
  },
  gridText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  floatingButtonBackground: {
    position: "absolute",
    bottom: 0,
    width: width / 2 - 30,
    height: 80,
    backgroundColor: "#E0E0E0",
    borderTopLeftRadius: width / 2,
    borderTopRightRadius: width / 2,
  },
  floatingButton: {
    backgroundColor: "#FF6F00",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    bottom: 10,
  },
});

export default SellerDashboardNew;
