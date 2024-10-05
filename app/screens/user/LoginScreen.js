import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { API_BASE_URL } from "@env";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        const userRole = data.user.role; // Get the user's role from the response

        Alert.alert("Success", "Logged in successfully!", [
          {
            text: "OK",
            onPress: () => {
              if (userRole === "user") {
                navigation.navigate("ViewAll"); // Navigate to ViewAll for users
              } else if (userRole === "admin") {
                navigation.navigate("SellerDashboard"); // Navigate to AdminDashboard for admins
              } else {
                // Handle other roles or default navigation
                navigation.navigate("ViewAll");
              }
            },
          },
        ]);
      } else {
        Alert.alert("Error", data.msg || "Login failed! Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.subtitle}>
        Please sign in to your existing account
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor="#B0B3B8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>PASSWORD</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#B0B3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showPasswordButton}
          >
            <Text style={styles.showPasswordText}>
              {showPassword ? "🙈" : "👁️"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Log In Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Don’t have an account?{" "}
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E2C",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#B0B3B8",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#B0B3B8",
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#000",
  },
  passwordContainer: {
    position: "relative",
  },
  showPasswordButton: {
    position: "absolute",
    right: 20,
    height: "100%",
    justifyContent: "center",
  },
  showPasswordText: {
    color: "#B0B3B8",
  },
  loginButton: {
    backgroundColor: "#FF6F00",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    color: "#B0B3B8",
    fontSize: 14,
    textAlign: "center",
  },
  signUpText: {
    color: "#FF6F00",
    fontWeight: "bold",
  },
});

export default LoginScreen;
