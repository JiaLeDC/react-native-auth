import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/app/context/AuthContext";

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
      { text: "OK", onPress: () => router.replace("/home") },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={style.scrollContainer}>
        <View style={style.innerContainer}>
          <Text style={style.title}>Create Account</Text>

          <View
            style={[
              style.inputWrapper,
              focusedInput === "name" && style.inputWrapperFocused,
            ]}
          >
            <TextInput
              style={style.textInput}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedInput("name")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View
            style={[
              style.inputWrapper,
              focusedInput === "email" && style.inputWrapperFocused,
            ]}
          >
            <TextInput
              style={style.textInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Password Input with Production-Ready Toggle  */}
          <View
            style={[
              style.inputWrapper,
              focusedInput === "password" && style.inputWrapperFocused,
            ]}
          >
            <TextInput
              style={style.textInput}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={style.iconContainer}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={style.button} onPress={handleSignup}>
            <Text style={style.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Navigation back to Login [cite: 36] */}
          <TouchableOpacity
            onPress={() => router.push("/Login")}
            style={style.linkButton}
          >
            <Text style={style.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    gap: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "100%",
    height: 52,
    paddingHorizontal: 15,
  },
  inputWrapperFocused: {
    borderColor: "#000",
    borderWidth: 1.5,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  iconContainer: {
    padding: 5,
  },
  button: {
    width: "100%",
    height: 52,
    borderRadius: 8,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
  },
});
