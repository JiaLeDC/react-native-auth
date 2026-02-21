import { useAuth } from "@/app/context/AuthContext";
import { globalStyles } from "@/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

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
      router.replace("/Home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
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

      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/SignUp")}
        style={globalStyles.linkButton}
      >
        <Text style={globalStyles.linkText}>
          Don&#39;t have an account? Register Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}
