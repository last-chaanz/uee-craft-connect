import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import AddItem from "./app/screens/product/AddItem";
import ViewItem from "./app/screens/product/ViewItem";
import ViewAll from "./app/screens/product/ViewAll";
import CartScreen from "./app/screens/product/CartScreen";
import LoginScreen from "./app/screens/user/LoginScreen";
import SignUpScreen from "./app/screens/user/SignUpScreen";
import SplashScreen from "./app/screens/user/SplashScreen";
import ProfileScreen from "./app/screens/user/Profile";
import RoleSelectionScreen from "./app/screens/user/commonLogin";
import SellerDashboard from "./app/screens/seller/sellerDashboard";
import PaymentScreen from "./app/screens/payment/Payment";
import payHistory from "./app/screens/payment/payHistory";
import SellerBiddingProduct from "./app/screens/product/SellerBiddingProduct";
import SellerNormalProduct from "./app/screens/product/SellerNormalProduct";
import SellerDashboardNew from "./app/screens/seller/sellerDashboardNew";
import CommunityResources from "./app/screens/community&resources/communityResources";
import analyticsDashboard from "./app/screens/seller/analyticsDashboard";
import reviewsDashboard from "./app/screens/seller/reviewsDashboard";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <StripeProvider publishableKey="pk_test_51Q5jLmFdeM9eSzXpupdHdr6zXOGhM2JKig4j2wZFTGiHNE5bIOIM6tlHvH4kH2sgly4toiLf5ylSU9HByE4xDNRy00jdAlXMK4">
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="AddItem" component={AddItem} />
          <Stack.Screen name="ViewItem" component={ViewItem} />
          <Stack.Screen name="ViewAll" component={ViewAll} />
          <Stack.Screen name="CartScreen" component={CartScreen} />

          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="payHistory" component={payHistory} />

          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            name="RoleSelectionScreen"
            component={RoleSelectionScreen}
          />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

          <Stack.Screen name="SellerDashboard" component={SellerDashboardNew} />
          <Stack.Screen
            name="SellerBiddingProduct"
            component={SellerBiddingProduct}
          />
          <Stack.Screen
            name="SellerNormalProduct"
            component={SellerNormalProduct}
          />

          <Stack.Screen
            name="CommunityResources"
            component={CommunityResources}
          />
          <Stack.Screen name="Analytics" component={analyticsDashboard} />

          <Stack.Screen name="Reviews" component={reviewsDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

export default AppNavigator;
