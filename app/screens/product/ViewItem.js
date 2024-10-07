import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../components/CartContext"; // Import the useCart hook

const API_BASE_URL = "http://192.168.8.169:5000"; // Update this with your actual API base URL

const ViewItem = ({ route, navigation }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart, loadCart } = useCart(); // Use the cart context

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
      }
    };

    fetchProduct();
    loadCart(); // Load the latest cart data when the component mounts
  }, [route.params]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    Alert.alert("Success", "Item added to cart!");
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
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
              color="black"
            />
            <Text style={styles.infoText}>{category}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.descriptionText}>{product.description}</Text>

      <View style={styles.priceQuantityContainer}>
        <Text style={styles.price}>${product.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            style={styles.quantityButton}
          >
            <Ionicons name="remove" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() =>
              setQuantity(Math.min(product.quantity, quantity + 1))
            }
            style={styles.quantityButton}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
      </TouchableOpacity>
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
  priceQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 20,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    color: "white",
    paddingHorizontal: 15,
  },
  addToCartButton: {
    backgroundColor: "orange",
    padding: 15,
    margin: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
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
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ViewItem;
