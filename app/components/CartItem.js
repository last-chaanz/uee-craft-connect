import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CartItemImage from "../assets/carts.webp";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <View style={styles.container}>
      <Image source={CartItemImage} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={onDecrease} style={styles.quantityButton}>
          <Ionicons name="remove" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.quantityButton}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Ionicons name="close" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A3A3C",
    borderRadius: 15,
    marginRight: 12,
  },
  quantityButton: {
    padding: 6,
  },
  quantity: {
    color: "white",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    padding: 4,
  },
});

export default CartItem;
