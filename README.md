# VideoSum - YouTube Video Summarizer

VideoSum is a cross-platform application that generates concise summaries of YouTube videos using Google's Gemini 2.0 Flash-Lite AI model. It extracts video transcripts using ytdlp-nodejs and provides various summary options to suit different user needs.

## Features

- Generate summaries from YouTube videos
- Choose summary type (Brief, Detailed, Key Point)
- Choose summary length (Short, Medium, Long)
- Text-to-speech playback with adjustable speed, pitch, and voice
- View summary history
- Share summaries
- Dark mode support
- Cross-platform (iOS, Android, Web/PWA)

## Tech Stack

### Frontend
- React Native Expo
- React Navigation
- React Native Paper
- Zustand (State management)
- Expo Speech (Text-to-speech)

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- Google's Gemini 2.0 Flash-Lite AI model
- ytdlp-nodejs for YouTube transcript extraction

## Project Structure

The project is organized into two main directories:

- `frontend/`: Contains the React Native Expo app
- `backend/`: Contains the Express.js server

## Setup

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/videosum
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Follow the instructions in the terminal to run the app on your device or emulator.

## API Endpoints

### Validate YouTube URL
- **URL**: `/api/summaries/validate`
- **Method**: `POST`
- **Body**: `{ "url": "https://www.youtube.com/watch?v=..." }`

### Generate Summary
- **URL**: `/api/summaries`
- **Method**: `POST`
- **Body**: `{ "url": "https://www.youtube.com/watch?v=...", "summaryType": "Brief", "summaryLength": "Medium" }`

### Get All Summaries
- **URL**: `/api/summaries`
- **Method**: `GET`

### Get Summary by ID
- **URL**: `/api/summaries/:id`
- **Method**: `GET`

### Update Summary
- **URL**: `/api/summaries/:id`
- **Method**: `PUT`
- **Body**: `{ "summaryType": "Detailed", "summaryLength": "Long" }`

### Delete Summary
- **URL**: `/api/summaries/:id`
- **Method**: `DELETE`

## License

This project is licensed under the MIT License.
