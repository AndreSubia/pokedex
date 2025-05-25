import { store } from "@//store/store";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  console.log("Root layout");

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Provider store={store}>
        <Slot />
      </Provider>
    </ClerkProvider>
  );
}
