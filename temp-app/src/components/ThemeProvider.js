import React, { useEffect } from 'react';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import useSettingsStore from '../store/settingsStore';

// Custom light theme
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2196F3',
    secondary: '#03A9F4',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#B00020',
    text: '#000000',
    onSurface: '#000000',
    disabled: '#9E9E9E',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FF9800',
  },
};

// Custom dark theme
const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#90CAF9',
    secondary: '#81D4FA',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
    text: '#FFFFFF',
    onSurface: '#FFFFFF',
    disabled: '#757575',
    placeholder: '#757575',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FFC107',
  },
};

const ThemeProvider = ({ children }) => {
  const { theme, initSettings } = useSettingsStore();
  
  // Initialize settings on component mount
  useEffect(() => {
    initSettings();
  }, [initSettings]);
  
  // Select theme based on settings
  const paperTheme = theme === 'dark' ? darkTheme : lightTheme;
  
  return (
    <PaperProvider theme={paperTheme}>
      {children}
    </PaperProvider>
  );
};

export default ThemeProvider;
