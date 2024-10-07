import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../components/CartContext";
import LargeCard from "../../components/LargeCard";
import SmallCard from "../../components/SmallCard";

const API_BASE_URL = "http://192.168.8.169:5000";

const ViewAll = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { cart, addToCart, loadCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
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
  };

  useEffect(() => {
    fetchProducts();
    loadCart();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    await loadCart();
    setRefreshing(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const renderProductCard = ({ item }) => (
    <LargeCard
      image={{ uri: `${API_BASE_URL}/${item.image}` }}
      title={item.name}
      subtitle={item.categories.join(" - ")}
      rating={item.rating || 0}
      onAddToCart={() => handleAddToCart(item)}
      onView={() => navigation.navigate("ViewItem", { id: item._id })}
    />
  );

  const renderSmallCard = ({ item }) => (
    <SmallCard
      image={`${API_BASE_URL}/${item.image}`}
      title={item.name}
      subtitle={item.categories[0]}
      price={item.price}
      onAddToCart={() => handleAddToCart(item)}
    />
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="cart-outline" size={24} color="black" />
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

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <FlatList
          horizontal
          data={filteredProducts.slice(0, 5)}
          renderItem={renderSmallCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.smallCardList}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>All Products</Text>
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.productList}
          scrollEnabled={false}
        />
      </ScrollView>
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
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 15,
    color: "#333",
  },
  smallCardList: {
    paddingLeft: 15,
  },
  productList: {
    padding: 10,
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

export default ViewAll;
