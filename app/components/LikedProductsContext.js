import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LikedProductsContext = createContext();

export const LikedProductsProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    loadLikedProducts();
  }, []);

  const loadLikedProducts = async () => {
    try {
      const storedLikedProducts = await AsyncStorage.getItem("likedProducts");
      if (storedLikedProducts) {
        setLikedProducts(JSON.parse(storedLikedProducts));
      }
    } catch (error) {
      console.error("Error loading liked products:", error);
    }
  };

  const saveLikedProducts = async (products) => {
    try {
      await AsyncStorage.setItem("likedProducts", JSON.stringify(products));
    } catch (error) {
      console.error("Error saving liked products:", error);
    }
  };

  const toggleLikedProduct = (product) => {
    setLikedProducts((prevLikedProducts) => {
      const isLiked = prevLikedProducts.some((p) => p._id === product._id);
      let newLikedProducts;
      if (isLiked) {
        newLikedProducts = prevLikedProducts.filter(
          (p) => p._id !== product._id
        );
      } else {
        newLikedProducts = [...prevLikedProducts, product];
      }
      saveLikedProducts(newLikedProducts);
      return newLikedProducts;
    });
  };

  return (
    <LikedProductsContext.Provider
      value={{ likedProducts, toggleLikedProduct }}
    >
      {children}
    </LikedProductsContext.Provider>
  );
};
