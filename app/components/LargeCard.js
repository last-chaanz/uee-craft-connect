import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../components/CartContext";

const LargeCard = ({
  image,
  title,
  subtitle,
  price,
  sellType,
  onView,
  product,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1); // Add 1 item to cart
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
        <View style={styles.priceTypeContainer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <View
            style={[
              styles.sellTypeTag,
              sellType === "bidding" ? styles.biddingTag : styles.normalTag,
            ]}
          >
            <Text style={styles.sellTypeText}>
              {sellType === "normal" ? "Quick Buy" : "Bid Buy"}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.viewButton} onPress={onView}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
    flexDirection: "row",
    height: 140,
  },
  image: {
    width: "45%",
    resizeMode: "cover",
  },
  content: {
    padding: 15,
    width: "55%",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  priceTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
  },
  sellTypeTag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  normalTag: {
    backgroundColor: "#E1F5FE",
  },
  biddingTag: {
    backgroundColor: "#FFF3E0",
  },
  sellTypeText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  viewButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  viewButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default LargeCard;
