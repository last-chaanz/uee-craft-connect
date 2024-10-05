import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image source={require("../../assets/logo.webp")} style={styles.logo} />

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RoleSelectionScreen")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 276,
    height: 276,
    resizeMode: "contain",
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#FF7622",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SplashScreen;
