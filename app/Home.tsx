import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={globalStyles.screenContainer}>
        <Text style={globalStyles.title}>Home Screen</Text>

        <View style={{ marginBottom: 30, alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "#666" }}>Welcome back,</Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>
            {user?.name}!
          </Text>
          <Text style={{ fontSize: 16, color: "#888", marginTop: 5 }}>
            {user?.email}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={[globalStyles.button, { backgroundColor: "#FF3B30" }]}
        >
          <Text style={globalStyles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
