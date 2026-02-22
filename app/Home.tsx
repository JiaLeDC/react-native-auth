import { colors, globalStyles, responsive } from "@/app/styles/globalStyles";
import { useAuth } from "./context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export default function Home() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={globalStyles.screenContainer}>
        <View style={[globalStyles.card, { alignItems: "center" }]}>
          <View
            style={{
              width: responsive.avatarSize,
              height: responsive.avatarSize,
              borderRadius: responsive.avatarRadius,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Text
              style={{
                fontSize: responsive.avatarFontSize,
                fontWeight: "800",
                color: "#fff",
              }}
            >
              {getInitials(user?.name ?? "?")}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 11,
              fontWeight: "700",
              letterSpacing: 2,
              color: colors.textMuted,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Logged in as
          </Text>
          <Text
            style={{
              fontSize: responsive.titleSize * 0.8,
              fontWeight: "800",
              color: colors.textPrimary,
              letterSpacing: -0.5,
              marginBottom: 4,
            }}
          >
            {user?.name}
          </Text>

          <View style={globalStyles.divider} />

          <View style={{ width: "100%", gap: 12 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                backgroundColor: colors.primaryLight,
                padding: 14,
                borderRadius: 14,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: colors.primary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="mail-outline" size={18} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: colors.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  Email
                </Text>
                <Text
                  style={{
                    fontSize: responsive.inputFontSize - 1,
                    fontWeight: "600",
                    color: colors.textPrimary,
                    marginTop: 2,
                  }}
                  numberOfLines={1}
                >
                  {user?.email}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                backgroundColor: "#F0FDF9",
                padding: 14,
                borderRadius: 14,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: colors.success,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color="#fff"
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: colors.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  Status
                </Text>
                <Text
                  style={{
                    fontSize: responsive.inputFontSize - 1,
                    fontWeight: "600",
                    color: colors.success,
                    marginTop: 2,
                  }}
                >
                  Authenticated ✓
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={[globalStyles.dangerButton, { marginTop: 20 }]}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={colors.error}
            style={{ flexShrink: 0 }}
          />
          <Text style={globalStyles.dangerButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
