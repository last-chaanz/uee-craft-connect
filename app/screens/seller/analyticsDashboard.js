// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { Rating } from "react-native-ratings";
// import Toast from "react-native-toast-message";
// import SummaryItem from "../../components/SummaryItem";
// import { API_BASE_URL } from "@env";

// const AnalyticsDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [filter, setFilter] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch products data from API
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/products`);
//       if (!response.ok) throw new Error("Failed to fetch products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Filter products based on search query
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   // Sample seller's review data
//   const sellerReviews = {
//     averageRating: 4.9,
//     totalReviews: 32,
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Analytics Dashboard</Text>
//       </View>

//       {/* Summary Section */}
//       <View style={styles.summaryContainer}>
//         <SummaryItem icon="cash-outline" title="Total Revenue" value="$2,241" />
//         <SummaryItem icon="cart-outline" title="Total Orders" value="250" />
//         <SummaryItem
//           icon="trending-up-outline"
//           title="Sales Growth"
//           value="+15%"
//         />
//       </View>

//       {/* Review Summary Section */}
//       <View style={styles.reviewContainer}>
//         <Text style={styles.sectionTitle}>Seller Review Summary</Text>
//         <View style={styles.reviewSummary}>
//           <Text style={styles.reviewAverage}>
//             {sellerReviews.averageRating} / 5.0
//           </Text>
//           <Rating
//             type="star"
//             startingValue={sellerReviews.averageRating}
//             imageSize={20}
//             readonly
//             style={styles.rating}
//           />
//         </View>
//         <Text style={styles.reviewCount}>
//           Based on {sellerReviews.totalReviews} reviews
//         </Text>
//       </View>

//       {/* Search Input */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search products..."
//         value={filter}
//         onChangeText={setFilter}
//       />

//       {/* Loading State */}
//       {loading && <ActivityIndicator size="large" color="#FF6F00" />}

//       {/* Error State */}
//       {error && <Text style={styles.errorText}>{error}</Text>}

//       {/* Top Products Section */}
//       <Text style={styles.sectionTitle}>Top Products</Text>
//       <FlatList
//         horizontal
//         data={filteredProducts.slice(0, 5)}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.productCard}>
//             <Icon name="pricetag-outline" size={30} color="#FF6F00" />
//             <Text style={styles.productName}>{item.name}</Text>
//             <Text style={styles.productSales}>Sales: ${item.sales}</Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.productList}
//         showsHorizontalScrollIndicator={false}
//       />

//       {/* All Products Section */}
//       <Text style={styles.sectionTitle}>All Products</Text>
//       <FlatList
//         data={filteredProducts}
//         renderItem={({ item }) => (
//           <View style={styles.productCard}>
//             <Icon name="pricetag-outline" size={30} color="#FF6F00" />
//             <Text style={styles.productName}>{item.name}</Text>
//             <Text style={styles.productSales}>Sales: ${item.sales}</Text>
//             <TouchableOpacity
//               onPress={() => console.log(`View details for ${item.name}`)}
//             >
//               <Text style={styles.viewDetails}>View Details</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.productList}
//       />

//       <Toast />
//     </ScrollView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     backgroundColor: "#f8f8f8",
//   },
//   header: {
//     backgroundColor: "#FF6F00",
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   title: {
//     color: "#FFFFFF",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   summaryContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   reviewContainer: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 10,
//   },
//   reviewSummary: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   reviewAverage: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginRight: 10,
//   },
//   reviewCount: {
//     fontSize: 14,
//     color: "#666",
//   },
//   rating: {
//     alignItems: "center",
//   },
//   searchInput: {
//     backgroundColor: "#FFF",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     elevation: 3,
//   },
//   productCard: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 5,
//     marginRight: 10,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   productSales: {
//     fontSize: 14,
//     color: "#666",
//   },
//   viewDetails: {
//     color: "#FF6F00",
//     fontWeight: "bold",
//     marginTop: 5,
//   },
// });

// export default AnalyticsDashboard;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   FlatList,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { Rating } from "react-native-ratings";
// import SummaryItem from "../../components/SummaryItem";
// import { API_BASE_URL } from "@env";

// const AnalyticsDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [filter, setFilter] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch products data from API
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/products`);
//       if (!response.ok) throw new Error("Failed to fetch products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Filter products based on search query
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   // Sample seller's review data
//   const sellerReviews = {
//     averageRating: 4.9,
//     totalReviews: 32,
//   };

//   // Render summary items
//   const renderSummaryItem = ({ item }) => (
//     <SummaryItem icon={item.icon} title={item.title} value={item.value} />
//   );

//   // Render product item
//   const renderProductItem = ({ item }) => (
//     <View style={styles.productCard}>
//       <Icon name="pricetag-outline" size={30} color="#FF6F00" />
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productSales}>Sales: ${item.sales}</Text>
//       <TouchableOpacity onPress={() => console.log(`View details for ${item.name}`)}>
//         <Text style={styles.viewDetails}>View Details</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   // Render loading state
//   const renderLoading = () => <ActivityIndicator size="large" color="#FF6F00" />;

//   // Render error state
//   const renderError = () => <Text style={styles.errorText}>{error}</Text>;

//   // Render header for the FlatList
//   const renderHeader = () => (
//     <View>
//       <View style={styles.header}>
//         <Text style={styles.title}>Analytics Dashboard</Text>
//       </View>

//       {/* Summary Section */}
//       <View style={styles.summaryContainer}>
//         {[
//           { icon: "cash-outline", title: "Total Revenue", value: "$2,241" },
//           { icon: "cart-outline", title: "Total Orders", value: "250" },
//           { icon: "trending-up-outline", title: "Sales Growth", value: "+15%" },
//         ].map((item) => (
//           <SummaryItem key={item.title} icon={item.icon} title={item.title} value={item.value} />
//         ))}
//       </View>

//       {/* Review Summary Section */}
//       <View style={styles.reviewContainer}>
//         <Text style={styles.sectionTitle}>Seller Review Summary</Text>
//         <View style={styles.reviewSummary}>
//           <Text style={styles.reviewAverage}>
//             {sellerReviews.averageRating} / 5.0
//           </Text>
//           <Rating
//             type="star"
//             startingValue={sellerReviews.averageRating}
//             imageSize={20}
//             readonly
//             style={styles.rating}
//           />
//         </View>
//         <Text style={styles.reviewCount}>
//           Based on {sellerReviews.totalReviews} reviews
//         </Text>
//       </View>

//       {/* Search Input */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search products..."
//         value={filter}
//         onChangeText={setFilter}
//       />
//     </View>
//   );

//   return (
//     <FlatList
//       data={filteredProducts}
//       renderItem={renderProductItem}
//       keyExtractor={(item) => item._id.toString()} // Ensure unique key as string
//       ListHeaderComponent={renderHeader}
//       ListEmptyComponent={loading ? renderLoading() : error ? renderError() : null}
//       contentContainerStyle={styles.container}
//       showsVerticalScrollIndicator={false}
//     />
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     backgroundColor: "#f8f8f8",
//   },
//   header: {
//     backgroundColor: "#FF6F00",
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   title: {
//     color: "#FFFFFF",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   summaryContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   reviewContainer: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 10,
//   },
//   reviewSummary: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   reviewAverage: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginRight: 10,
//   },
//   reviewCount: {
//     fontSize: 14,
//     color: "#666",
//   },
//   rating: {
//     alignItems: "center",
//   },
//   searchInput: {
//     backgroundColor: "#FFF",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     elevation: 3,
//   },
//   productCard: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 5,
//     marginRight: 10,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   productSales: {
//     fontSize: 14,
//     color: "#666",
//   },
//   viewDetails: {
//     color: "#FF6F00",
//     fontWeight: "bold",
//     marginTop: 5,
//   },
// });

// export default AnalyticsDashboard;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Rating } from "react-native-ratings";
import SummaryItem from "../../components/SummaryItem"; // Assuming SummaryItem is styled correctly
import { LineChart } from "react-native-chart-kit";
import { API_BASE_URL } from "@env";

const AnalyticsDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
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
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Sample seller's review data
  const sellerReviews = {
    averageRating: 4.9,
    totalReviews: 32,
  };

  // Example data for line chart (dummy data)
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [200, 450, 300, 600, 800, 650],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`,
      },
    ],
  };

  // Render product item
  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Icon name="pricetag-outline" size={30} color="#FF6F00" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productSales}>Sales: ${item.sales}</Text>
      <TouchableOpacity onPress={() => console.log(`View details for ${item.name}`)}>
        <Text style={styles.viewDetails}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  // Render loading state
  const renderLoading = () => <ActivityIndicator size="large" color="#FF6F00" />;

  // Render error state
  const renderError = () => <Text style={styles.errorText}>{error}</Text>;

  // Render header for the FlatList
  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Dashboard</Text>
      </View>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        {[
          { icon: "cash-outline", title: "Total Revenue", value: "$2,241" },
          { icon: "cart-outline", title: "Total Orders", value: "250" },
          { icon: "trending-up-outline", title: "Sales Growth", value: "+15%" },
          { icon: "trending-down-outline", title: "Net Profit", value: "$1,500" },
          { icon: "pricetags-outline", title: "Top-Selling Product", value: "Hand Crafted Face Mask" },
        ].map((item, index) => (
          <View key={item.title} style={styles.summaryCard}>
            <Icon name={item.icon} size={30} color="#FF6F00" />
            <Text style={styles.summaryTitle}>{item.title}</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
          </View>
        ))}

        {/* Seller Review Summary Card */}
        <View style={styles.summaryCard}>
          <Icon name="star-outline" size={30} color="#FF6F00" />
          <Text style={styles.summaryTitle}>Seller Review Summary</Text>
          <Text style={styles.summaryValue}>
            {sellerReviews.averageRating} / 5.0
          </Text>
          <Rating
            type="star"
            startingValue={sellerReviews.averageRating}
            imageSize={20}
            readonly
            style={styles.rating}
          />
          <Text style={styles.reviewCount}>
            Based on {sellerReviews.totalReviews} reviews
          </Text>
        </View>
      </View>

      {/* Sales Trend Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Sales Trends</Text>
        <LineChart
          data={salesData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#FF6F00",
            },
          }}
          bezier
          style={{ borderRadius: 10 }}
        />
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={filter}
        onChangeText={setFilter}
      />
    </View>
  );

  return (
    <FlatList
      data={filteredProducts}
      renderItem={renderProductItem}
      keyExtractor={(item) => item._id.toString()} // Ensure unique key as string
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={loading ? renderLoading() : error ? renderError() : null}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#FF6F00",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    elevation: 3,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    width: "48%", // Ensure all cards are the same width
    alignItems: "center", // Center align items within each summary card
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
    textAlign: "center", // Center title
  },
  summaryValue: {
    fontSize: 14,
    color: "#666",
    textAlign: "center", // Center value
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 5, // Add margin for spacing
  },
  reviewContainer: {
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 3,
    alignItems: "center", // Center align contents
  },
  chartContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center", // Center section title
  },
  reviewSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center align review summary elements
    marginBottom: 10,
  },
  rating: {
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 3,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  productCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  productName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  productSales: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  viewDetails: {
    color: "#FF6F00",
    marginTop: 5,
    textDecorationLine: "underline",
  },
});

export default AnalyticsDashboard;










