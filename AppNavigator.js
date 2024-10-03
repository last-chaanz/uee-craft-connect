import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddItem from "./app/screens/product/AddItem";
import ViewItem from "./app/screens/product/ViewItem";
import ViewAll from "./app/screens/product/ViewAll";
import CartScreen from "./app/screens/product/CartScreen";
import LoginScreen from "./app/screens/user/LoginScreen";
import SignUpScreen from "./app/screens/user/SignUpScreen";
import SplashScreen from "./app/screens/user/SplashScreen";
import RoleSelectionScreen from "./app/screens/user/commonLogin";
import SellerDashboard from "./app/screens/seller/sellerDashboard";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="ViewItem" component={ViewItem} />
        <Stack.Screen name="ViewAll" component={ViewAll} />
        <Stack.Screen name="CartScreen" component={CartScreen} />

        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} />

        <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
