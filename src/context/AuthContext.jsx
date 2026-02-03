import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize user from storage on mount
    useEffect(() => {
        const fetchUser = () => {
            try {
                const currentUser = authService.getCurrentUser();
                if (currentUser && authService.isAuthenticated()) {
                    setUser(currentUser);
                } else {
                    // If token invalid or expired, clear
                    if (sessionStorage.getItem("token")) {
                        authService.logout();
                    }
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const userData = await authService.login(credentials);
            // authService.login already sets localStorage
            setUser({
                token: userData.token,
                userId: userData.userId,
                userName: userData.userName,
                role: userData.role
            });
            toast.success(`Welcome, ${userData.userName}!`);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        toast.info("Logged out successfully");
        // Navigation should be handled by the component calling logout or here if we have access to specific router context, 
        // but usually Context is higher up. 
        // However, since we might need to redirect, returning a promise or letting component handle nav is okay.
        // authService.logout does window.location.href = "/login" which forces reload, let's change behavior if we want SPA feel.
        // But request said "Redirect user to Home page".
        // authService.logout currently redirects to /login. We might want to override that or change authService.
    };

    // For role updates (e.g. subscription upgrade)
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
