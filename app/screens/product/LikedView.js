import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { LikedProductsContext } from "../../components/LikedProductsContext";
import SmallCard from "../../components/SmallCard";
import Navbar from "../../components/Navbar";

const LikedView = ({ navigation }) => {
  const { likedProducts } = useContext(LikedProductsContext);

  const renderProductCard = ({ item }) => (
    <SmallCard
      product={item}
      onView={() => navigation.navigate("ViewItem", { id: item._id })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Liked Products</Text>
      </View>
      <FlatList
        data={likedProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No liked products yet</Text>
        }
      />
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
    backgroundColor: "#181C2E",
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  productGrid: {
    paddingHorizontal: 28,
    paddingBottom: 80,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#888",
  },
});

export default LikedView;
