
import React, { createContext, useContext, useEffect, useState } from "react";

// Определение доступных тем
export const THEMES = [
  { id: "light", name: "Светлая", color: "#ffffff" },
  { id: "dark", name: "Темная", color: "#1a1a1a" },
  { id: "cream", name: "Сливочная", color: "#f8f0e3" },
  { id: "coral", name: "Коралловая", color: "#ff7f7f" },
  { id: "mint", name: "Мятная", color: "#c5e8d5" },
  { id: "yellow", name: "Жёлтая", color: "#f9efc7" },
  { id: "green", name: "Зелёная", color: "#d0e8c0" },
  { id: "blue", name: "Голубая", color: "#c2e5f8" },
  { id: "orange", name: "Оранжевая", color: "#ffd8a8" },
  { id: "purple", name: "Пурпурная", color: "#e3d0f9" },
];

type ThemeContextType = {
  currentTheme: string;
  setTheme: (theme: string) => void;
  themes: typeof THEMES;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    // Восстанавливаем тему из локального хранилища при загрузке
    const savedTheme = localStorage.getItem("app_theme");
    if (savedTheme && THEMES.some((theme) => theme.id === savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (theme: string) => {
    if (THEMES.some((t) => t.id === theme)) {
      setCurrentTheme(theme);
      localStorage.setItem("app_theme", theme);
      
      // Добавляем/удаляем класс dark для темной темы
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // Устанавливаем класс dark при первой загрузке, если тема темная
  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
