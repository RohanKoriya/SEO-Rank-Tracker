import type { AxiosInstance } from "axios";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Axios Instance
export const api = axios.create({
  baseURL: BACKEND_URL,
});

// Axios Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// User Interface
interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  analysisCount?: number;
}

// Context Interface
interface AppContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  api: AxiosInstance;

  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;

  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;

  logout: () => void;
}

// Create Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  // States
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [loading, setLoading] = useState(true);

  // Load User
  const loadUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/api/auth/user");

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }

    setLoading(false);
  };

  // Run once on app start
  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        setToken(res.data.token);

        setUser(res.data.user);

        localStorage.setItem("token", res.data.token);

        return { success: true };
      }

      return {
        success: false,
        message: res.data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Register
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (res.data.success) {
        setToken(res.data.token);

        setUser(res.data.user);

        localStorage.setItem("token", res.data.token);

        return { success: true };
      }

      return {
        success: false,
        message: res.data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };

  // Context Value
  const value: AppContextType = {
    user,
    token,
    loading,
    api,
    login,
    register,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom Hook
export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
}
