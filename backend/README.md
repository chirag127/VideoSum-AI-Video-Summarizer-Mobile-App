# VideoSum Backend

This is the backend server for the YouTube Video Summarizer app. It provides API endpoints for validating YouTube URLs, generating summaries using the Gemini 2.0 Flash-Lite model, and managing summary data.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Google's Gemini 2.0 Flash-Lite AI model
- ytdlp-nodejs for YouTube transcript extraction

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/videosum
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Validate YouTube URL
- **URL**: `/api/summaries/validate`
- **Method**: `POST`
- **Body**: `{ "url": "https://www.youtube.com/watch?v=..." }`
- **Response**: `{ "success": true, "data": { "valid": true, "videoId": "...", "title": "...", "thumbnail": "..." } }`

### Generate Summary
- **URL**: `/api/summaries`
- **Method**: `POST`
- **Body**: `{ "url": "https://www.youtube.com/watch?v=...", "summaryType": "Brief", "summaryLength": "Medium" }`
- **Response**: `{ "success": true, "data": { ... summary object ... } }`

### Get All Summaries
- **URL**: `/api/summaries`
- **Method**: `GET`
- **Response**: `{ "success": true, "count": 10, "data": [ ... summaries ... ] }`

### Get Summary by ID
- **URL**: `/api/summaries/:id`
- **Method**: `GET`
- **Response**: `{ "success": true, "data": { ... summary object ... } }`

### Update Summary
- **URL**: `/api/summaries/:id`
- **Method**: `PUT`
- **Body**: `{ "summaryType": "Detailed", "summaryLength": "Long" }`
- **Response**: `{ "success": true, "data": { ... updated summary object ... } }`

### Delete Summary
- **URL**: `/api/summaries/:id`
- **Method**: `DELETE`
- **Response**: `{ "success": true, "data": {} }`
