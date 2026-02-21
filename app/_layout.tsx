import { Stack } from "expo-router";
import { AuthProvider } from "@/app/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
