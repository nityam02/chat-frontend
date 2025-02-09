import React, { createContext, useContext, useState } from 'react';
import {ThemeContextType,themeStyles,layouts} from '../types'


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<keyof typeof themeStyles>('light');
  const [layout, setLayout] = useState<keyof typeof layouts>('default');

  const value = {
    theme,
    layout,
    styles: themeStyles[theme],
    setTheme,
    setLayout
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

const  useTheme=()=> {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export {useTheme}
