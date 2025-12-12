import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
    authToken: string | null;
    user: any | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, phone: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Static mock auth context
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setAuthToken('mock-token-123');
            setUser({ email, name: 'Demo User' });
            setIsLoading(false);
        }, 500);
    };

    const register = async (name: string, phone: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setAuthToken('mock-token-123');
            setUser({ name, phone });
            setIsLoading(false);
        }, 500);
    };

    const logout = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setAuthToken(null);
            setUser(null);
            setIsLoading(false);
        }, 300);
    };

    return (
        <AuthContext.Provider value={{ authToken, user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
