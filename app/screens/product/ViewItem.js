import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../components/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { API_BASE_URL } from "@env";

const ViewItem = ({ route, navigation }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [bidAmount, setBidAmount] = useState("");
  const [userId, setUserId] = useState(null);
  const [currentHighestBid, setCurrentHighestBid] = useState(0);

  const { cart, addToCart, loadCart } = useCart();

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      }
    } catch (error) {
      console.error("Error decoding token: ", error);
    }
  };

  useEffect(() => {
    loadToken();
    loadCart();
  }, []);

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
        highbid(data); // Fetch highest bid after successfully fetching product
      } else {
        Alert.alert("Error", data.error || "Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      Alert.alert(
        "Error",
        "Failed to fetch product details. Please try again."
      );
    }
  };

  const highbid = async (product) => {
    try {
      const bidResponse = await fetch(
        `${API_BASE_URL}/api/highest-bid/${product.name}`
      );
      const highestBidData = await bidResponse.json();

      if (bidResponse.ok) {
        setCurrentHighestBid(highestBidData.highestBidAmount);
      } else {
        setCurrentHighestBid(0);
      }
    } catch (error) {
      console.error("Error fetching highest bid:", error);
      Alert.alert("Error", "Failed to fetch highest bid. Please try again.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [route.params]);

  const handleMakeBid = async () => {
    if (!userId) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    const parsedBidAmount = parseFloat(bidAmount);
    if (isNaN(parsedBidAmount) || parsedBidAmount <= currentHighestBid) {
      Alert.alert(
        "Error",
        "Bid amount must be greater than the current highest bid."
      );
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userId,
          bidamount: parsedBidAmount,
          productName: product.name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message);
        setBidAmount("");
        highbid(product); // Refresh the highest bid after making a bid
      } else {
        Alert.alert("Error", data.error || "Failed to place the bid.");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      Alert.alert("Error", "Failed to place the bid. Please try again.");
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    Alert.alert("Success", "Item added to cart!");
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="cart-outline" size={24} color="black" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Image source={{ uri: product.fullImageUrl }} style={styles.image} />

      <Text style={styles.productName}>{product.name}</Text>

      <View style={styles.infoContainer}>
        {product.categories.map((category, index) => (
          <View key={index} style={styles.infoItem}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={16}
              color="green"
            />
            <Text style={styles.infoText}>{category}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.descriptionText}>{product.description}</Text>

      {product.sellType === "normal" ? (
        <>
          <View style={styles.priceQuantityContainer}>
            <Text style={styles.price}>$ {product.price}.00</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.quantityButton}
              >
                <Ionicons name="remove" size={16} color="white" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={() =>
                  setQuantity(Math.min(product.quantity, quantity + 1))
                }
                style={styles.quantityButton}
              >
                <Ionicons name="add" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.biddingInfoContainer}>
            <View style={styles.biddingInfoItem}>
              <Text style={styles.biddingInfoLabel}>Starting Price:</Text>
              <Text style={styles.biddingInfoValue}>$ {product.price}.00</Text>
            </View>
            <View style={styles.biddingInfoItem}>
              <Text style={styles.biddingInfoLabel}>Current Highest Bid:</Text>
              <Text style={styles.biddingInfoValue}>
                $ {currentHighestBid}.00
              </Text>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter Bidding Amount"
            placeholderTextColor="#B0B0B0"
            value={bidAmount}
            onChangeText={(text) => {
              const enteredBidAmount = parseFloat(text);
              if (!isNaN(enteredBidAmount) && enteredBidAmount <= currentHighestBid) {
                Alert.alert(
                  "Error",
                  `Bid amount must be greater than the current highest bid of $${currentHighestBid}.`
                );
              } else {
                setBidAmount(text); // Only update bidAmount if it passes validation
              }
            }}
            keyboardType="numeric" // Allow only numeric input
          />

          <TouchableOpacity
            style={styles.makeBidButton}
            onPress={handleMakeBid}
          >
            <Text style={styles.makeBidButtonText}>MAKE A BID</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    height: 240,
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
    padding: 5,
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
    padding: 15,
    color: "gray",
  },
  priceQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#F0F5FA",
    borderRadius: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
  },
  quantityContainer: {
    backgroundColor: "#121223",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingVertical: 10,
    borderRadius: 20,
  },
  quantityButton: {
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    color: "white",
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    margin: 10,
  },
  addToCartButtonText: {
    color: "#003366",
    fontSize: 16,
    fontWeight: "bold",
  },
  biddingInfoContainer: {
    padding: 15,
    backgroundColor: "#F0F5FA",
    borderRadius: 12,
  },
  biddingInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  biddingInfoLabel: {
    fontWeight: "bold",
  },
  biddingInfoValue: {
    fontWeight: "bold",
    color: "green",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 15,
  },
  makeBidButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    margin: 15,
  },
  makeBidButtonText: {
    color: "#003366",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartBadge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ViewItem;
