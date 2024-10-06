import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const NavItem = ({ label, icon, onPress, isActive }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Ionicons
      name={isActive ? icon : `${icon}-outline`}
      size={24}
      color={isActive ? "#007AFF" : "#8E8E93"}
    />
    <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const Navbar = ({ navigation }) => {
  const route = useRoute();

  const navItems = [
    { label: "Home", icon: "home", screen: "ViewAll" },
    { label: "Products", icon: "pricetags", screen: "ProductsScreen" },
    { label: "Cart", icon: "cart", screen: "CartScreen" },
    { label: "Profile", icon: "person", screen: "ProfileScreen" },
  ];

  return (
    <View style={styles.navbar}>
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          onPress={() => navigation.navigate(item.screen)}
          isActive={route.name === item.screen}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
    color: "#8E8E93",
  },
  activeNavLabel: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default Navbar;
