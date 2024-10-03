import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RoleSelectionScreen = ({ navigation }) => {
  const handleRoleSelection = (role) => {
    // Navigate to the Register screen, passing the selected role
    navigation.navigate("SignUpScreen", { role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Role</Text>
      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => handleRoleSelection("user")}
      >
        <Text style={styles.roleButtonText}>I am a Buyer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => handleRoleSelection("admin")}
      >
        <Text style={styles.roleButtonText}>I am a Seller</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E0E2C",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 40,
  },
  roleButton: {
    backgroundColor: "#FF6F00",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  roleButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RoleSelectionScreen;
