import { useAuth } from "@/app/context/AuthContext";
import { colors, globalStyles } from "@/app/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = async () => {
    setError("");
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    const result = await signup(name, email, password);
    setIsSubmitting(false);
    if (result.success) {
      router.replace("/Home");
    } else {
      setError(result.message);
    }
  };

  const inputIcon = (field: string, iconName: any) => (
    <Ionicons
      name={iconName}
      size={18}
      color={focusedInput === field ? colors.primary : colors.textMuted}
      style={{ marginRight: 10 }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={globalStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={globalStyles.innerContainer}>
            <View style={globalStyles.card}>
              <Text style={globalStyles.title}>Create account</Text>
              <Text style={globalStyles.subtitle}>
                Join us — it only takes a minute
              </Text>

              {error ? (
                <View style={globalStyles.errorContainer}>
                  <Ionicons
                    name="alert-circle"
                    size={16}
                    color={colors.error}
                  />
                  <Text style={globalStyles.errorText}>{error}</Text>
                </View>
              ) : null}

              <Text style={globalStyles.fieldLabel}>Full Name</Text>
              <View
                style={[
                  globalStyles.inputWrapper,
                  focusedInput === "name" && globalStyles.inputWrapperFocused,
                ]}
              >
                {inputIcon("name", "person-outline")}
                <TextInput
                  style={globalStyles.textInput}
                  placeholder="John Doe"
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              <Text style={globalStyles.fieldLabel}>Email</Text>
              <View
                style={[
                  globalStyles.inputWrapper,
                  focusedInput === "email" && globalStyles.inputWrapperFocused,
                ]}
              >
                {inputIcon("email", "mail-outline")}
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
                  focusedInput === "password" &&
                    globalStyles.inputWrapperFocused,
                ]}
              >
                {inputIcon("password", "lock-closed-outline")}
                <TextInput
                  style={globalStyles.textInput}
                  placeholder="At least 6 characters"
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

              <Text style={globalStyles.fieldLabel}>Confirm Password</Text>
              <View
                style={[
                  globalStyles.inputWrapper,
                  focusedInput === "confirm" &&
                    globalStyles.inputWrapperFocused,
                ]}
              >
                {inputIcon("confirm", "shield-checkmark-outline")}
                <TextInput
                  style={globalStyles.textInput}
                  placeholder="Repeat your password"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!isConfirmVisible}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedInput("confirm")}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity
                  onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                  style={globalStyles.iconContainer}
                >
                  <Ionicons
                    name={isConfirmVisible ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[globalStyles.button, isSubmitting && { opacity: 0.7 }]}
                onPress={handleSignup}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={globalStyles.buttonText}>Create Account</Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/Login")}
              style={globalStyles.linkButton}
            >
              <Text style={globalStyles.linkText}>
                Already have an account?{" "}
                <Text style={globalStyles.linkTextBold}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
