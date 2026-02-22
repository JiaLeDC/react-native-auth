import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const authRoutes = ["Login", "SignUp"];
    const inAuthGroup = authRoutes.includes(segments[0] as string);

    if (!user && !inAuthGroup) {
      // Redirect to the login page if the user is not authenticated
      router.replace("/Login");
    } else if (user && inAuthGroup) {
      // Redirect away from the login page if the user is authenticated
      router.replace("/Home");
    }
  }, [user, segments, isLoading, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
