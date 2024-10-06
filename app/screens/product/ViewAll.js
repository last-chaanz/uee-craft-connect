import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../components/CartContext";
import LargeCard from "../../components/LargeCard";
import { API_BASE_URL } from "@env";
import Navbar from "../../components/Navbar";

const ViewAll = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { cart, addToCart, loadCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        console.error("Failed to fetch products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    loadCart();
  }, [fetchProducts, loadCart]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts();
    await loadCart();
    setRefreshing(false);
  }, [fetchProducts, loadCart]);

  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product, 1);
    },
    [addToCart]
  );

  const renderProductCard = useCallback(
    ({ item }) => (
      <LargeCard
        image={{ uri: `${API_BASE_URL}/${item.image}` }}
        title={item.name}
        subtitle={item.categories.join(" - ")}
        price={item.price}
        sellType={item.sellType}
        onAddToCart={() => handleAddToCart(item)}
        onView={() => navigation.navigate("ViewItem", { id: item._id })}
        product={item}
      />
    ),
    [handleAddToCart, navigation]
  );

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeFilter === "All" ||
        product.categories.includes(activeFilter) ||
        product.sellType === activeFilter)
  );

  const filterOptions = [
    "All",
    ...new Set(products.flatMap((p) => p.categories)),
    "normal",
    "bidding",
  ];

  const renderFilterButton = (title) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === title && styles.activeFilterButton,
      ]}
      onPress={() => setActiveFilter(title)}
    >
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === title && styles.activeFilterButtonText,
        ]}
      >
        {title === "normal"
          ? "quick buy"
          : title === "bidding"
          ? "bid buy"
          : title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Craft Connect</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="cart-outline" size={28} color="white" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        ListHeaderComponent={
          <FlatList
            horizontal
            data={filterOptions}
            renderItem={({ item }) => renderFilterButton(item)}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          />
        }
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.productList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 20,
    backgroundColor: "#181C2E",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "orange",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  filterList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: "#181C2E",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  activeFilterButtonText: {
    color: "white",
  },
  productList: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  cartBadge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#FF6B6B",
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

export default ViewAll;
