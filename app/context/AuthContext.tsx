import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
    name: string;
    email: string;
    password: string;
};

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => boolean;
    signup: (name: string, email: string, password: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const signup = (name: string, email: string, password: string) => {
        setUser({ name, email, password });
    };

    const login = (email: string, password: string) => {
        if (user?.email === email && user.password === password) {
            return true;
        }
        return false;
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};