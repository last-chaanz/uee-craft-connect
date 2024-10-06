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
                `${API_BASE_URL}/api/products/${product._id}/cancel-bidding`,
                { method: "POST" }
              );

              if (response.ok) {
                Alert.alert("Success", "Bidding cancelled successfully", [
                  {
                    text: "OK",
                    onPress: () => navigation.navigate("SellerDashboard"),
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
          <Ionicons name="time-outline" size={24} color="black" />
          <Text style={styles.biddingInfoText}>Ends in: 2 days</Text>
        </View>
        <View style={styles.biddingInfoItem}>
          <Ionicons name="people-outline" size={24} color="black" />
          <Text style={styles.biddingInfoText}>Current Bids: 5</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={handleCancelBidding}
      >
        <Ionicons name="close-circle-outline" size={24} color="white" />
        <Text style={styles.cancelButtonText}>Cancel Bidding</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 7,
    width: "95%",
    backgroundColor: "#f0f0f0",
    alignSelf: "center",
    borderRadius: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 5,
    color: "black",
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 15,
  },
  descriptionText: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    color: "gray",
    textAlign: "justify",
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
    backgroundColor: "#FF9800",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    margin: 15,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  errorText: {
    fontSize: 18,
    color: "#FF5252",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SellerBiddingProduct;
