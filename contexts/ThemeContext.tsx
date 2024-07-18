import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ColorsTheme } from '@/constants/Colors';

type ThemeContextType = {
  theme: ColorsTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme() as ColorsTheme;
  const [theme, setTheme] = useState<ColorsTheme>(deviceTheme);

  useEffect(() => {
    setTheme(deviceTheme);
  }, [deviceTheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === ColorsTheme.Light ? ColorsTheme.Dark : ColorsTheme.Light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};