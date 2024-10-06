import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LargeCard = ({ image, title, subtitle, price, rating, onView }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.price}>${price}.00</Text>
      </View>
      <TouchableOpacity style={styles.viewButton} onPress={onView}>
        <Text style={styles.viewButtonText}>VIEW</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  content: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "green",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "",
    marginTop: 5,
  },
  rating: {
    marginLeft: 5,
    fontWeight: "bold",
  },
  addToCartButton: {
    position: "absolute",
    bottom: 15,
    left: 15,
    backgroundColor: "green",
    width: 120,
    borderRadius: 5,
    padding: 8,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  viewButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "orange",
    width: 80,
    borderRadius: 5,
    padding: 8,
    alignItems: "center",
    marginTop: 10,
  },
  viewButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  likeBtn: {
    position: "absolute",
    top: 17,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
  },
  freeText: {
    marginLeft: 5,
    color: "orange",
    fontWeight: "bold",
  },
});

export default LargeCard;
