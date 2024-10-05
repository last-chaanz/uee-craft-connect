import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../components/CartContext"; // Import the useCart hook
import CartItem from "../../components/CartItem";

const CartScreen = ({ navigation }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    const totalAmount = calculateTotal();
    navigation.navigate("PaymentScreen",  { amount: totalAmount }); 
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleIncreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearCartText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => handleRemoveItem(item.id)}
            onIncrease={() => handleIncreaseQuantity(item.id)}
            onDecrease={() => handleDecreaseQuantity(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>TOTAL AMOUNT: </Text>
          <Text style={styles.totalAmount}>$ {calculateTotal()}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderButtonText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181C2E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  placeholder: {
    width: 24,
  },
  listContainer: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#3A3A3C",
  },
  clearCartText: {
    color: "red",
  },
  deliveryAddressContainer: {
    marginBottom: 16,
  },
  deliveryAddressLabel: {
    color: "#8E8E93",
    fontSize: 12,
    marginBottom: 4,
  },
  deliveryAddressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliveryAddress: {
    color: "white",
    fontSize: 16,
  },
  editButton: {
    color: "#FF9500",
    fontSize: 14,
    fontWeight: "600",
  },
  totalContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 40,
  },
  totalLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 86,
  },
  totalAmount: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    flex: 1,
  },

  placeOrderButton: {
    backgroundColor: "#FF9500",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  placeOrderButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CartScreen;
