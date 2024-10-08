import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LikedProductsContext } from "../components/LikedProductsContext";

const SmallCard = ({ product, onView }) => {
  const { likedProducts, toggleLikedProduct } =
    useContext(LikedProductsContext);

  const isLiked = likedProducts.some((p) => p._id === product._id);

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.subtitle}>{product.categories.join(", ")}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => toggleLikedProduct(product)}
      >
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={24}
          color={isLiked ? "red" : "red"}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={onView}>
        <Ionicons name="cart-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  content: {
    marginTop: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "green",
  },
  likeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "orange",
    borderRadius: 15,
    padding: 5,
  },
});

export default SmallCard;
