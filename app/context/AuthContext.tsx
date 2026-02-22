import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

type SessionUser = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: SessionUser | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_STORAGE_KEY = "@registered_users";
const CURRENT_USER_KEY = "@current_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load persisted user on startup
    const loadStorageData = async () => {
      try {
        const persistedUser = await AsyncStorage.getItem(CURRENT_USER_KEY);
        if (persistedUser) {
          setUser(JSON.parse(persistedUser));
        }
      } catch (e) {
        console.error("Failed to load auth state", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Get existing users
      const existingUsersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users: User[] = existingUsersJson
        ? JSON.parse(existingUsersJson)
        : [];

      // Check if user already exists
      if (users.find((u) => u.email === email)) {
        return {
          success: false,
          message: "User already exists with this email.",
        };
      }

      const newUser: User = { name, email, password };
      const updatedUsers = [...users, newUser];

      // Save to "database"
      await AsyncStorage.setItem(
        USERS_STORAGE_KEY,
        JSON.stringify(updatedUsers),
      );

      // Auto-login after signup
      const sessionUser: SessionUser = {
        name: newUser.name,
        email: newUser.email,
      };
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);

      return { success: true, message: "Account created successfully!" };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        message: "Signup failed. Please try again.",
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const existingUsersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users: User[] = existingUsersJson
        ? JSON.parse(existingUsersJson)
        : [];

      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (foundUser) {
        // Strip password before saving to session
        const sessionUser: SessionUser = {
          name: foundUser.name,
          email: foundUser.email,
        };
        await AsyncStorage.setItem(
          CURRENT_USER_KEY,
          JSON.stringify(sessionUser),
        );
        setUser(sessionUser);
        return { success: true, message: "Login successful!" };
      }
      return { success: false, message: "Invalid email or password." };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed. Please try again." };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
      setUser(null);
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
