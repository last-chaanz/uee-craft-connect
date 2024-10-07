import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from "@env";

const SellerBiddingProduct = ({ route, navigation }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [biddingState, setBiddingState] = useState("");
  const [highestBid, setHighestBid] = useState(null);
  const [bidCount, setBidCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = route.params;
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        const data = await response.json();
        if (response.ok) {
          const fullImageUrl = `${API_BASE_URL}/${data.image.replace(
            /\\/g,
            "/"
          )}`;
          setProduct({ ...data, fullImageUrl });
          setBiddingState(data.state); // Set initial bidding state from the product data
          fetchHighestBid(data.name);
          fetchBidCount(data.name); 
        } else {
          Alert.alert("Error", data.error || "Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        Alert.alert(
          "Error",
          "Failed to fetch product details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [route.params]);

  const fetchHighestBid = async (productName) => {
    try {
      const bidResponse = await fetch(`${API_BASE_URL}/api/highest-bid/${productName}`);
      const highestBidData = await bidResponse.json();

      if (bidResponse.ok) {
        setHighestBid(highestBidData.highestBidAmount);
      } else {
        Alert.alert("Error", highestBidData.message || "Failed to fetch highest bid");
      }
    } catch (error) {
      console.error("Error fetching highest bid:", error);
      Alert.alert("Error", "Failed to fetch highest bid. Please try again.");
    }
  };

  const fetchBidCount = async (productName) => {
    try {
      const countResponse = await fetch(`${API_BASE_URL}/api/bid-count/${productName}`);
      const text = await countResponse.text(); // Get the response as text
      
      const countData = JSON.parse(text); // Try parsing the response as JSON
  
      if (countResponse.ok) {
        setBidCount(countData.bidCount);
      } else {
        Alert.alert("Error", countData.message || "Failed to fetch bid count");
      }
    } catch (error) {
      console.error("Error fetching bid count:", error);
      Alert.alert("Error", "Failed to fetch bid count. Please try again.");
    }
  };
  

  const handleCancelBidding = () => {
    Alert.alert(
      "Cancel Bidding",
      "Are you sure you want to cancel the bidding for this product?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const response = await fetch(
                `${API_BASE_URL}/api/products/${product._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ state: "cancelled" }),
                }
              );

              if (response.ok) {
                setBiddingState("cancelled"); // Update the bidding state
                Alert.alert("Success", "Bidding cancelled successfully", [
                  {
                    text: "OK",
                    onPress: () => navigation.navigate("SellerAllProducts"),
                  },
                ]);
              } else {
                const result = await response.json();
                Alert.alert(
                  "Error",
                  result.error || "Failed to cancel bidding"
                );
              }
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to cancel bidding. Please try again."
              );
              console.error("Cancel Bidding Error:", error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bidding Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <Image source={{ uri: product.fullImageUrl }} style={styles.image} />

      <Text style={styles.productName}>{product.name}</Text>

      <View style={styles.infoContainer}>
        {product.categories.map((category, index) => (
          <View key={index} style={styles.infoItem}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={16}
              color="black"
            />
            <Text style={styles.infoText}>{category}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.descriptionText}>{product.description}</Text>

      <View style={styles.biddingInfoContainer}>
        <View style={styles.biddingInfoItem}>
          <Ionicons name="cash-outline" size={24} color="black" />
          <Text style={styles.biddingInfoText}>
            Starting Price: ${product.price.toFixed(2)}
          </Text>
        </View>
        <View style={styles.biddingInfoItem}>
          <Ionicons name="cash-outline" size={24} color="black" />
          <Text style={styles.biddingInfoText}>Highest Bid: ${highestBid}</Text>
        </View>
        <View style={styles.biddingInfoItem}>
          <Ionicons name="people-outline" size={24} color="black" />
          <Text style={styles.biddingInfoText}>Total Bids: {bidCount}</Text>
        </View>
      </View>

      {biddingState !== "cancelled" && (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelBidding}>
          <Ionicons 
            name={biddingState === "started" ? "close-circle-outline" : "checkmark-circle-outline"} 
            size={24} 
            color="white" 
          />
          <Text style={styles.cancelButtonText}>
            {biddingState === "started" ? "Cancel Bidding" : "Start Bidding"}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "95%",
    height: 250,
    alignSelf: "center",
    resizeMode: "cover",
    borderRadius: 32,
    marginTop: 15,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 15,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 5,
  },
  infoText: {
    marginLeft: 5,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 15,
  },
  descriptionText: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
  },
  biddingInfoContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    margin: 15,
  },
  biddingInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  biddingInfoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5733",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 15,
  },
  cancelButtonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
});

export default SellerBiddingProduct;
