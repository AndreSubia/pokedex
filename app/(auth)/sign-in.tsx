import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CustomButton from "@//components/CustomButton";
import CustomInput from "@//components/CustomInput";
import SignInWith from "@//components/SignInWith";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const signInSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email"),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password should be at least 8 characters long"),
});

type SignInFields = z.infer<typeof signInSchema>;

interface ClerkAPIError {
  meta?: {
    paramName?: string;
    sessionId?: string;
    emailAddresses?: string[];
    identifiers?: string[];
    zxcvbn?: {
      suggestions: {
        code: string;
        message: string;
      }[];
    };
    permissions?: string[];
  };
}

const mapClerkErrorToFormField = (error: ClerkAPIError) => {
  switch (error.meta?.paramName) {
    case "identifier":
      return "email";
    case "password":
      return "password";
    default:
      return "root";
  }
};

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFields>({
    resolver: zodResolver(signInSchema),
  });

  const insets = useSafeAreaInsets();

  const { signIn, isLoaded, setActive } = useSignIn();

  const onSignIn = async (data: SignInFields) => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === "complete") {
        setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.log("Sign in failed");
        setError("root", { message: "Sign in could not be completed" });
      }
    } catch (err) {
      console.log("Sign in error: ", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        err.errors.forEach((error) => {
          const fieldName = mapClerkErrorToFormField(error);
          setError(fieldName, {
            message: error.longMessage,
          });
        });
      } else {
        setError("root", { message: "Unknown error" });
      }
    }

    console.log("Sign in: ", data.email, data.password);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Link href="/(tabs)" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="chevron-back-outline"
                size={25}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
        <View style={styles.content}>
          <Text style={styles.title}>Sign in</Text>

          <View style={styles.form}>
            <CustomInput
              control={control}
              name="email"
              placeholder="Email"
              autoFocus
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />

            <CustomInput
              control={control}
              name="password"
              placeholder="Password"
              secureTextEntry
            />

            {errors.root && (
              <Text style={{ color: "crimson" }}>{errors.root.message}</Text>
            )}
          </View>

          <CustomButton text="Sign in" onPress={handleSubmit(onSignIn)} />

          <Link href="/sign-up" style={styles.link}>
            Don't have an account? Sign up
          </Link>

          <View
            style={{ flexDirection: "row", gap: 10, marginHorizontal: "auto" }}
          >
            <SignInWith strategy="oauth_google" />
            <SignInWith strategy="oauth_facebook" />
            <SignInWith strategy="oauth_apple" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
  form: {
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  link: {
    color: "#4353FD",
    fontWeight: "600",
  },
});
