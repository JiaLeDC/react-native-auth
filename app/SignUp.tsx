import { useAuth } from "@/app/context/AuthContext";
import { globalStyles } from "@/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignup = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    signup(name, email, password);

    Alert.alert("Success", "Account created successfully!", [
      { text: "OK", onPress: () => router.replace("/Home") },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
        <View style={globalStyles.innerContainer}>
          <Text style={globalStyles.title}>Create Account</Text>

          <View
            style={[
              globalStyles.inputWrapper,
              focusedInput === "name" && globalStyles.inputWrapperFocused,
            ]}
          >
            <TextInput
              style={[globalStyles.textInput, { outline: "none" } as any]}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedInput("name")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View
            style={[
              globalStyles.inputWrapper,
              focusedInput === "email" && globalStyles.inputWrapperFocused,
            ]}
          >
            <TextInput
              style={[globalStyles.textInput, { outline: "none" } as any]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View
            style={[
              globalStyles.inputWrapper,
              focusedInput === "password" && globalStyles.inputWrapperFocused,
            ]}
          >
            <TextInput
              style={[globalStyles.textInput, { outline: "none" } as any]}
              placeholder="Password"
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
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={globalStyles.button} onPress={handleSignup}>
            <Text style={globalStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/Login")}
            style={globalStyles.linkButton}
          >
            <Text style={globalStyles.linkText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
