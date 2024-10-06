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
import { API_BASE_URL } from "@env";
import Navbar from "../../components/Navbar";

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
      price={item.price}
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
      onView={() => navigation.navigate("ViewItem", { id: item._id })}
    />
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Craft Connect</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <Ionicons name="cart-outline" size={28} color="white" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
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
        <Text style={styles.sectionTitle}>Most Selling Products</Text>
        <FlatList
          horizontal
          data={filteredProducts.slice(0, 5)}
          renderItem={renderSmallCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.smallCardList}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>All Available Products</Text>
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.productList}
          scrollEnabled={false}
        />
      </ScrollView>

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
    padding: 20,
    height: 100,
    backgroundColor: "#181C2E",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "orange",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingHorizontal: 15, // Keep only horizontal padding to reduce space vertically
    paddingBottom: 0,
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
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navLabel: {
    textAlign: "center",
    fontSize: 12,
    color: "#333",
  },
});

export default ViewAll;
