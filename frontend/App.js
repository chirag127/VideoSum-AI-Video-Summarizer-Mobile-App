import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ThemeProvider from "./src/components/ThemeProvider";
import AppNavigator from "./src/navigation/AppNavigator";
import useSettingsStore from "./src/store/settingsStore";

export default function App() {
    const { theme } = useSettingsStore();

    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <StatusBar style={theme === "dark" ? "light" : "dark"} />
                <AppNavigator />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
