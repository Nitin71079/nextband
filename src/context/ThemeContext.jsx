import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const ThemeContext =
  createContext();

export function ThemeProvider({
  children
}) {
  const [darkMode,
    setDarkMode] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "darkMode"
      );

    if (saved) {
      setDarkMode(
        JSON.parse(saved)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(
        darkMode
      )
    );

    document.body.style.background =
      darkMode
        ? "#0f172a"
        : "#f8fafc";

    document.body.style.color =
      darkMode
        ? "white"
        : "#0f172a";
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode(
      !darkMode
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(
    ThemeContext
  );
}