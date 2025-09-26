import "../global.css";
import { Slot } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { NavigationContainer } from "@react-navigation/native";

export default function Layout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      {/* <NavigationContainer> */}
        <Slot />
      {/* </NavigationContainer> */}
    </ClerkProvider>
  );
}
