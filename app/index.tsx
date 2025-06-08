import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome screen</Text>

      <Text>{isSignedIn ? "Authenticated" : "Not authenticated"}</Text>

      <Link href="/(tabs)">Go to Pokédex</Link>

      <Link href="/sign-in">Go to sign in</Link>

      <Link href="/(protected)">Go to Protected Screen</Link>

      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
