import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const { login } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const success = login(email, password);
    if (success) {
      router.replace("/Home"); // Redirect to home on success
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <View style={style.screenContainer}>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <View
        style={[
          style.inputWrapper,
          focusedInput === "email" && style.inputWrapperFocused,
        ]}
      >
        <TextInput
          style={[style.textInput, { outline: "none" }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      {/* Password Input Wrapper */}
      <View
        style={[
          style.inputWrapper,
          focusedInput === "password" && style.inputWrapperFocused,
        ]}
      >
        <TextInput
          style={[style.textInput, { outline: "none" }]}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput(null)}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={style.eyeIcon}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={style.button} onPress={handleLogin}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/SignUp")}
        style={style.linkButton}
      >
        <Text style={style.linkText}>
          Don&#39;t have an account? Register Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 15,
    backgroundColor: "#f5f5f5",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
  },
  inputWrapperFocused: {
    borderColor: "#000",
    borderWidth: 2,
  },
  textInput: {
    flex: 1,
    height: "100%",
    // @ts-ignore (outline is web-only)
    outline: "none",
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 4,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  eyeIcon: {
    padding: 5,
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
  },
});
