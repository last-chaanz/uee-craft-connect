import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';
import Toast from 'react-native-toast-message'; 
import SummaryItem from './components/SummaryItem'; 
import TopProducts from './components/TopProducts'; 

const API_BASE_URL = "http://192.168.1.185:5000";

const AnalyticsDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products data from API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Sample seller's review data
  const sellerReviews = {
    averageRating: 4.9,
    totalReviews: 32,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Dashboard</Text>
      </View>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <SummaryItem icon="cash-outline" title="Total Revenue" value="$2,241" />
        <SummaryItem icon="cart-outline" title="Total Orders" value="250" />
        <SummaryItem icon="trending-up-outline" title="Sales Growth" value="+15%" />
      </View>

      {/* Review Summary Section */}
      <View style={styles.reviewContainer}>
        <Text style={styles.sectionTitle}>Seller Review Summary</Text>
        <View style={styles.reviewSummary}>
          <Text style={styles.reviewAverage}>{sellerReviews.averageRating} / 5.0</Text>
          <Rating
            type="star"
            startingValue={sellerReviews.averageRating}
            imageSize={20}
            readonly
            style={styles.rating}
          />
        </View>
        <Text style={styles.reviewCount}>Based on {sellerReviews.totalReviews} reviews</Text>
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={filter}
        onChangeText={setFilter}
      />

      {/* Loading State */}
      {loading && <ActivityIndicator size="large" color="#FF6F00" />}

      {/* Error State */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Top Products Section */}
      <Text style={styles.sectionTitle}>Top Products</Text>
      <FlatList
        horizontal
        data={filteredProducts.slice(0, 5)} 
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <Icon name="pricetag-outline" size={30} color="#FF6F00" />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productSales}>Sales: ${item.sales}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.productList}
        showsHorizontalScrollIndicator={false}
      />

      {/* All Products Section */}
      <Text style={styles.sectionTitle}>All Products</Text>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Icon name="pricetag-outline" size={30} color="#FF6F00" />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productSales}>Sales: ${item.sales}</Text>
            <TouchableOpacity onPress={() => console.log(`View details for ${item.name}`)}>
              <Text style={styles.viewDetails}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.productList}
      />
      
      <Toast />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#FF6F00',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  reviewContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  reviewSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAverage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 3,
  },
  productCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productSales: {
    fontSize: 14,
    color: '#666',
  },
  viewDetails: {
    color: '#FF6F00',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default AnalyticsDashboard;
