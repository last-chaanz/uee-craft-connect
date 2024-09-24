import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddItem from "./app/screens/AddItem";
import ViewItem from "./app/screens/ViewItem";
import ViewAll from "./app/screens/ViewAll";
import CartScreen from "./app/screens/CartScreen";
import LoginScreen from "./app/screens/LoginScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import SplashScreen from "./app/screens/SplashScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ViewAll"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="ViewItem" component={ViewItem} />
        <Stack.Screen name="ViewAll" component={ViewAll} />
        <Stack.Screen name="CartScreen" component={CartScreen} />

        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
