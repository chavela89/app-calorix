
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
      
      // Устанавливаем цвет фона в зависимости от выбранной темы
      const selectedTheme = THEMES.find(t => t.id === theme);
      if (selectedTheme) {
        if (theme === "dark") {
          document.documentElement.style.setProperty('--background-color', selectedTheme.color);
          document.documentElement.style.setProperty('--text-color', '#ffffff');
        } else {
          document.documentElement.style.setProperty('--background-color', selectedTheme.color);
          document.documentElement.style.setProperty('--text-color', '#1a1a1a');
        }
        
        // Добавляем дополнительные CSS-переменные для специфических тем
        switch(theme) {
          case "cream":
            document.documentElement.style.setProperty('--primary-color', '#d4a373');
            break;
          case "coral":
            document.documentElement.style.setProperty('--primary-color', '#e63946');
            break;
          case "mint":
            document.documentElement.style.setProperty('--primary-color', '#2d6a4f');
            break;
          case "yellow":
            document.documentElement.style.setProperty('--primary-color', '#e9c46a');
            break;
          case "green":
            document.documentElement.style.setProperty('--primary-color', '#386641');
            break;
          case "blue":
            document.documentElement.style.setProperty('--primary-color', '#023e8a');
            break;
          case "orange":
            document.documentElement.style.setProperty('--primary-color', '#f4a261');
            break;
          case "purple":
            document.documentElement.style.setProperty('--primary-color', '#7b2cbf');
            break;
          default:
            document.documentElement.style.setProperty('--primary-color', '#3b82f6');
            break;
        }
      }
    }
  };

  // Устанавливаем CSS-переменные при первой загрузке
  useEffect(() => {
    setTheme(currentTheme);
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
