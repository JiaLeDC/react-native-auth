import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "expo-router";

export default function Home() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace("/Login");
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Welcome, {user?.name}!</Text>
            <Text>{user?.email}</Text>

            <TouchableOpacity
                onPress={handleLogout}
                style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 5 }}
            >
                <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}