import { store } from "@//store/store";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Provider store={store}>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </Provider>
    </ClerkProvider>
  );
}
