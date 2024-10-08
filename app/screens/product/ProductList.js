import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SmallCard from "../../components/SmallCard";
import Navbar from "../../components/Navbar";
import { API_BASE_URL } from "@env";
import { LikedProductsContext } from "../../components/LikedProductsContext";

const ProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { likedProducts, toggleLikedProduct } =
    useContext(LikedProductsContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
        const uniqueCategories = [
          ...new Set(data.flatMap((product) => product.categories)),
        ];
        setCategories(["All", ...uniqueCategories, "Quick Buy", "Bidding"]);
      } else {
        console.error("Failed to fetch products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const renderCategorySection = (category) => {
    let filteredProducts = products;
    if (category !== "All") {
      filteredProducts = products.filter((product) =>
        category === "Quick Buy"
          ? product.sellType === "normal"
          : category === "Bidding"
          ? product.sellType === "bidding"
          : product.categories.includes(category)
      );
    }

    return (
      <View style={styles.categorySection} key={category}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <FlatList
          horizontal
          data={filteredProducts}
          renderItem={({ item }) => (
            <SmallCard
              product={{
                ...item,
                image: `${API_BASE_URL}/${item.image}`,
              }}
              onView={() => navigation.navigate("ViewItem", { id: item._id })}
            />
          )}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Artisan Products</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {categories.map(renderCategorySection)}
      </ScrollView>
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#181C2E",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  scrollContent: {
    paddingBottom: 80, // Ensure content is above navbar
  },
  categorySection: {
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  productList: {
    paddingHorizontal: 10,
  },
});

export default ProductList;
