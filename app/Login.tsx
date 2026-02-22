import { useAuth } from "@/app/context/AuthContext";
import { colors, globalStyles } from "@/app/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { login } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email format.");
      return;
    }
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (result.success) {
      router.replace("/Home");
    } else {
      setError(result.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={globalStyles.screenContainer}>
        <View style={[globalStyles.card, { width: "100%" }]}>
          <Text style={globalStyles.title}>Welcome back</Text>
          <Text style={globalStyles.subtitle}>
            Sign in to continue to your account
          </Text>

          {error ? (
            <View style={globalStyles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color={colors.error} />
              <Text style={globalStyles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Text style={globalStyles.fieldLabel}>Email</Text>
          <View
            style={[
              globalStyles.inputWrapper,
              focusedInput === "email" && globalStyles.inputWrapperFocused,
            ]}
          >
            <Ionicons
              name="mail-outline"
              size={18}
              color={
                focusedInput === "email" ? colors.primary : colors.textMuted
              }
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={globalStyles.textInput}
              placeholder="you@example.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <Text style={globalStyles.fieldLabel}>Password</Text>
          <View
            style={[
              globalStyles.inputWrapper,
              focusedInput === "password" && globalStyles.inputWrapperFocused,
            ]}
          >
            <Ionicons
              name="lock-closed-outline"
              size={18}
              color={
                focusedInput === "password" ? colors.primary : colors.textMuted
              }
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={globalStyles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={colors.textMuted}
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={globalStyles.iconContainer}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[globalStyles.button, isSubmitting && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={globalStyles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/SignUp")}
          style={globalStyles.linkButton}
        >
          <Text style={globalStyles.linkText}>
            Don&#39;t have an account?{" "}
            <Text style={globalStyles.linkTextBold}>Create one</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
