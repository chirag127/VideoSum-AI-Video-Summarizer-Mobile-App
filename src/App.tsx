/**
 * @file src/App.tsx
 * @description Root component for the VideoSum AI Mobile Platform.
 * @summary This file initializes the main application layout, including navigation,
 *          global state providers, and theme settings. It serves as the primary
 *          entry point for the user interface.
 * @author Apex Technical Authority (for chirag127)
 * @date 2025-12-16
 * @version 1.0.0
 * @license CC BY-NC 4.0
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// --- TYPE DEFINITIONS for NAVIGATION --- //
// Ensures type-safety for navigation props (navigate, route.params)

/**
 * @type MainTabParamList
 * @description Defines the screens available in the main bottom tab navigator.
 */
export type MainTabParamList = {
  SummarizeStack: undefined; // The 'Summarize' tab nests a stack navigator
  History: undefined;
  Settings: undefined;
};

/**
 * @type SummarizeStackParamList
 * @description Defines the screens within the 'Summarize' feature stack.
 */
export type SummarizeStackParamList = {
  Home: undefined;
  SummaryResult: { videoUrl: string; summary: string };
};

// --- NAVIGATION STACK & TAB INSTANCES --- //
const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<SummarizeStackParamList>();

// --- MOCK SCREEN COMPONENTS (PLACEHOLDERS) --- //
// In a full application, these would be in `src/screens/`

const HomeScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>VideoSum AI</Text>
    <Text style={styles.subtitle}>Enter a video URL to generate a concise summary.</Text>
    <TextInput style={styles.input} placeholder="https://www.youtube.com/watch?v=..." placeholderTextColor="#999" />
    <Button
      title="Generate Summary"
      onPress={() => navigation.navigate('SummaryResult', {
        videoUrl: 'https://youtube.com/watch?v=example',
        summary: 'This is a placeholder summary. In a real scenario, an AI model would process the video content and generate this text based on key topics and timestamps.',
      })}
      color="#0F3460"
    />
  </View>
);

const SummaryResultScreen = ({ route }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>AI Summary</Text>
    <Text style={styles.label}>Original URL:</Text>
    <Text style={styles.text}>{route.params.videoUrl}</Text>
    <Text style={styles.label}>Generated Insight:</Text>
    <Text style={styles.text}>{route.params.summary}</Text>
  </View>
);

const HistoryScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Summary History</Text>
    <Text style={styles.text}>Your past summaries will be listed here.</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Settings</Text>
    <Text style={styles.text}>Application settings and user preferences.</Text>
  </View>
);

// --- NAVIGATION STRUCTURES --- //

/**
 * Encapsulates the primary user flow for summarizing a video.
 * This stack includes the home screen for input and the results screen.
 */
const SummarizeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1A1A2E' },
        headerTintColor: '#E0E0E0',
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: '#F5F5F5' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Summarize Video' }} />
      <Stack.Screen name="SummaryResult" component={SummaryResultScreen} options={{ title: 'Summary Result' }} />
    </Stack.Navigator>
  );
};

/**
 * Defines the main application interface with a bottom tab bar for top-level navigation.
 */
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // The nested stack navigator handles its own header
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'SummarizeStack') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else { // Settings
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0F3460',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { 
          backgroundColor: '#FFFFFF',
          borderTopColor: '#DDDDDD',
          borderTopWidth: 1,
         },
      })}
    >
      <Tab.Screen name="SummarizeStack" component={SummarizeStackNavigator} options={{ title: 'Summarize' }} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// --- ROOT APP COMPONENT --- //

/**
 * The root component for the VideoSum application.
 * This component wraps the entire application in necessary providers
 * such as SafeAreaProvider for handling device notches and NavigationContainer
 * for managing routing and navigation state.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainTabNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// --- STYLESHEET --- //

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1A1A2E',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#5C5C5C',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
    alignSelf: 'flex-start',
    marginTop: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
});
