import React, { createContext, FC, ReactNode, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { ColorSchemeName, useColorScheme } from "react-native";

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  colorScheme: ColorSchemeName;
  isDark: boolean;
  statusBarStyle: "light-content" | "dark-content";
};

const themeContext = createContext<ThemeContextType>({} as ThemeContextType);

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();

  const contextValue: ThemeContextType = {
    colorScheme,
    isDark: colorScheme === "dark",
    statusBarStyle: "light-content",
  };

  return (
    <themeContext.Provider value={contextValue}>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        translucent
      />
      {children}
    </themeContext.Provider>
  );
};

export const useThemeProvider = () => useContext(themeContext);

export default ThemeProvider;
