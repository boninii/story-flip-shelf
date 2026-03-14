import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  is_dark: boolean;
  toggle_theme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [is_dark, set_is_dark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", is_dark);
    localStorage.setItem("theme", is_dark ? "dark" : "light");
  }, [is_dark]);

  const toggle_theme = () => set_is_dark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ is_dark, toggle_theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
