const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// Initialize Gemini AI with API key
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Get the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});

// Generation configuration
const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

/**
 * Generate a summary of the video transcript using Gemini AI
 * @param {string} transcript - Video transcript
 * @param {string} videoTitle - Video title
 * @param {string} summaryType - Type of summary (Brief, Detailed, Key Point)
 * @param {string} summaryLength - Length of summary (Short, Medium, Long)
 * @returns {Promise<string>} - Generated summary
 */
const generateSummary = async (transcript, videoTitle, summaryType = 'Brief', summaryLength = 'Medium') => {
  try {
    if (!transcript) {
      throw new Error('Transcript is required to generate a summary');
    }

    // Create a chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Determine token limits based on summary length
    let tokenLimit;
    switch (summaryLength) {
      case 'Short':
        tokenLimit = 300;
        break;
      case 'Medium':
        tokenLimit = 600;
        break;
      case 'Long':
        tokenLimit = 1000;
        break;
      default:
        tokenLimit = 600; // Default to Medium
    }

    // Create prompt based on summary type
    let prompt;
    switch (summaryType) {
      case 'Brief':
        prompt = `Please provide a brief summary of the following YouTube video transcript. The video is titled "${videoTitle}". Focus on the main points and key takeaways. Format the summary in markdown with paragraphs and bullet points where appropriate. Keep it concise, around ${tokenLimit} words.\n\nTranscript:\n${transcript}`;
        break;
      case 'Detailed':
        prompt = `Please provide a detailed summary of the following YouTube video transcript. The video is titled "${videoTitle}". Include all important points, arguments, and examples. Format the summary in markdown with sections, paragraphs, and bullet points where appropriate. The summary should be comprehensive but well-structured, around ${tokenLimit} words.\n\nTranscript:\n${transcript}`;
        break;
      case 'Key Point':
        prompt = `Please extract and list the key points from the following YouTube video transcript. The video is titled "${videoTitle}". Format the output in markdown with bullet points for each key point. Include only the most important information, around ${tokenLimit} words total.\n\nTranscript:\n${transcript}`;
        break;
      default:
        prompt = `Please summarize the following YouTube video transcript. The video is titled "${videoTitle}". Format the summary in markdown. Keep it around ${tokenLimit} words.\n\nTranscript:\n${transcript}`;
    }

    // Send the prompt to Gemini
    const result = await chatSession.sendMessage(prompt);
    const summary = result.response.text();

    return summary;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
};

module.exports = {
  generateSummary
};
