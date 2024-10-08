import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from "@env";

const SellerAllProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
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
  }, [fetchProducts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  const renderProductCard = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => {
          if (item.sellType === "bidding") {
            navigation.navigate("SellerBiddingProduct", { id: item._id });
          } else {
            navigation.navigate("SellerNormalProduct", { id: item._id });
          }
        }}
      >
        <Image
          source={{ uri: `${API_BASE_URL}/${item.image}` }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.priceAndTypeContainer}>
            <Text
              style={[
                styles.sellType,
                item.sellType === "bidding"
                  ? styles.biddingType
                  : styles.quickBuyType,
              ]}
            >
              {item.sellType === "bidding" ? "Bidding" : "Quick Buy"}
            </Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [navigation]
  );

  const filteredProducts = products.filter(
    (product) =>
      activeFilter === "All" ||
      (activeFilter === "Quick Buy" && product.sellType === "normal") ||
      (activeFilter === "Bidding" && product.sellType === "bidding")
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>All Products</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.filterContainer}>
        {["All", "Quick Buy", "Bidding"].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilterButton,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === filter && styles.activeFilterButtonText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.productList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    width: 40,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterButton: {
    paddingHorizontal: 35,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
  },
  activeFilterButton: {
    backgroundColor: "orange",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  activeFilterButtonText: {
    color: "#fff",
  },
  productList: {
    padding: 16,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  productDetails: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  priceAndTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
  },
  sellType: {
    fontSize: 14,
    fontWeight: "600",
  },
  quickBuyType: {
    color: "#4CAF50",
  },
  biddingType: {
    color: "#FF9800",
  },
});

export default SellerAllProducts;
