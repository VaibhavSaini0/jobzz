'use client';
import { createContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const ThemeModeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export default function ThemeContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeModeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        <div className="bg-background text-foreground min-h-screen">
          {children}
        </div>
      </div>
    </ThemeModeContext.Provider>
  );
}

