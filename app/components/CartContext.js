import React, {createContext, useState, useContext, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const savedCart = await AsyncStorage.getItem("cart");
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Error loading cart:", error);
        }
    };

    const saveCart = async (newCart) => {
        try {
            await AsyncStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
        } catch (error) {
            console.error("Error saving cart:", error);
        }
    };

    const addToCart = (product, quantity) => {
        const newCart = [...cart];
        const existingItem = newCart.find((item) => item.id === product._id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            newCart.push({
                id: product._id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.fullImageUrl || `${API_BASE_URL}/${product.image}`,
            });
        }
        saveCart(newCart);
    };

    const removeFromCart = (productId) => {
        const newCart = cart.filter((item) => item.id !== productId);
        saveCart(newCart);
    };

    const updateQuantity = (productId, newQuantity) => {
        const newCart = cart.map((item) =>
            item.id === productId ? {...item, quantity: newQuantity} : item
        );
        saveCart(newCart);
    };

    const clearCart = () => {
        saveCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                loadCart, // Expose loadCart to force a refresh when needed
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
