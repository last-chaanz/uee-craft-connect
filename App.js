import { StyleSheet, View, StatusBar } from "react-native";
import AppNavigator from "./AppNavigator";
import { CartProvider } from "./app/components/CartContext";

export default function App() {
  return (
    <CartProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <AppNavigator />
      </View>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  header: {
    backgroundColor: "red",
    height: 100,
    width: "100%",
    borderBottomEndRadius: 28,
    borderBottomStartRadius: 28,
    display: "flex",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    color: "white",
  },
  profile: {
    height: 50,
    width: 50,
    backgroundColor: "blue",
    borderRadius: 25,
    position: "absolute",
    right: 20,
    top: 20,
  },
  cardScroll: {
    flex: 1,
  },
  body: {
    display: "flex",

    height: 450,
    backgroundColor: "green",
  },
  topic: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  cardView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
