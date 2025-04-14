# VideoSum Frontend

This is the frontend for the YouTube Video Summarizer app. It's built with React Native Expo and provides a cross-platform (iOS, Android, Web) interface for generating and managing YouTube video summaries.

## Technologies Used

- React Native Expo
- React Navigation
- React Native Paper (UI components)
- Zustand (State management)
- Expo Speech (Text-to-speech)
- React Native Markdown Display

## Features

- Generate summaries from YouTube videos
- Choose summary type (Brief, Detailed, Key Point)
- Choose summary length (Short, Medium, Long)
- View summary history
- Text-to-speech playback with adjustable speed, pitch, and voice
- Share summaries
- Dark mode support

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Follow the instructions in the terminal to run the app on your device or emulator.

## Building for Production

### For Android

```
expo build:android
```

### For iOS

```
expo build:ios
```

### For Web

```
expo build:web
```
