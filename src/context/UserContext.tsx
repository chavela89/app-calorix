
import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt: string;
  settings: {
    calorieGoal: number;
    proteinGoal: number;
    fatGoal: number;
    carbGoal: number;
    waterGoal: number;
  };
}

type UserContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Мокап данных пользователя
const MOCK_USER: User = {
  id: "user123",
  email: "test@example.com",
  name: "Иван Петров",
  isPremium: false,
  createdAt: new Date().toISOString(),
  settings: {
    calorieGoal: 2200,
    proteinGoal: 132,
    fatGoal: 73,
    carbGoal: 220,
    waterGoal: 2500,
  },
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Имитация проверки сессии при загрузке
    const savedUser = localStorage.getItem("calorix_user");
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user:", err);
        localStorage.removeItem("calorix_user");
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // В реальном приложении здесь был бы API запрос
      // Имитируем запрос с помощью setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Простая проверка для демо
      if (email === "test@example.com" && password === "password") {
        setUser(MOCK_USER);
        localStorage.setItem("calorix_user", JSON.stringify(MOCK_USER));
      } else {
        throw new Error("Неверный email или пароль");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // В реальном приложении здесь был бы API запрос
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Создаем нового пользователя для демо
      const newUser: User = {
        ...MOCK_USER,
        id: `user_${Date.now()}`,
        email,
        name,
        createdAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem("calorix_user", JSON.stringify(newUser));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("calorix_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("calorix_user", JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, loading, error, login, register, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
