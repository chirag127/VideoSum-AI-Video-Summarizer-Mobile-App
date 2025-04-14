const Summary = require('../models/Summary');
const youtubeService = require('../services/youtubeService');
const geminiService = require('../services/geminiService');

/**
 * Validate a YouTube URL
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const validateUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required'
      });
    }

    const validation = await youtubeService.validateYoutubeUrl(url);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message || 'Invalid YouTube URL'
      });
    }

    res.status(200).json({
      success: true,
      data: validation
    });
  } catch (error) {
    console.error('Error validating URL:', error);
    res.status(500).json({
      success: false,
      message: 'Error validating URL',
      error: error.message
    });
  }
};

/**
 * Generate a summary for a YouTube video
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const generateSummary = async (req, res) => {
  try {
    const { url, summaryType, summaryLength } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required'
      });
    }

    // Validate the URL
    const validation = await youtubeService.validateYoutubeUrl(url);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message || 'Invalid YouTube URL'
      });
    }

    // Get video metadata
    const metadata = await youtubeService.getVideoMetadata(url);

    // Get video transcript
    const transcriptResult = await youtubeService.getVideoTranscript(url);
    
    if (!transcriptResult.available) {
      return res.status(400).json({
        success: false,
        message: transcriptResult.message || 'No transcript available for this video'
      });
    }

    // Generate summary using Gemini AI
    const summary = await geminiService.generateSummary(
      transcriptResult.transcript,
      metadata.title,
      summaryType || 'Brief',
      summaryLength || 'Medium'
    );

    // Save the summary to the database
    const newSummary = new Summary({
      videoUrl: url,
      videoTitle: metadata.title,
      videoThumbnailUrl: metadata.thumbnail,
      summaryText: summary,
      summaryType: summaryType || 'Brief',
      summaryLength: summaryLength || 'Medium'
    });

    await newSummary.save();

    res.status(201).json({
      success: true,
      data: newSummary
    });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating summary',
      error: error.message
    });
  }
};

/**
 * Get all summaries
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: summaries.length,
      data: summaries
    });
  } catch (error) {
    console.error('Error fetching summaries:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching summaries',
      error: error.message
    });
  }
};

/**
 * Get a single summary by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getSummaryById = async (req, res) => {
  try {
    const summary = await Summary.findById(req.params.id);

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });
    }

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching summary',
      error: error.message
    });
  }
};

/**
 * Update a summary
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateSummary = async (req, res) => {
  try {
    const { summaryType, summaryLength } = req.body;
    
    // Find the existing summary
    const existingSummary = await Summary.findById(req.params.id);
    
    if (!existingSummary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });
    }
    
    // Get video metadata and transcript
    const metadata = await youtubeService.getVideoMetadata(existingSummary.videoUrl);
    const transcriptResult = await youtubeService.getVideoTranscript(existingSummary.videoUrl);
    
    if (!transcriptResult.available) {
      return res.status(400).json({
        success: false,
        message: transcriptResult.message || 'No transcript available for this video'
      });
    }
    
    // Generate new summary with updated parameters
    const summary = await geminiService.generateSummary(
      transcriptResult.transcript,
      metadata.title,
      summaryType || existingSummary.summaryType,
      summaryLength || existingSummary.summaryLength
    );
    
    // Update the summary
    const updatedSummary = await Summary.findByIdAndUpdate(
      req.params.id,
      {
        summaryText: summary,
        summaryType: summaryType || existingSummary.summaryType,
        summaryLength: summaryLength || existingSummary.summaryLength,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedSummary
    });
  } catch (error) {
    console.error('Error updating summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating summary',
      error: error.message
    });
  }
};

/**
 * Delete a summary
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteSummary = async (req, res) => {
  try {
    const summary = await Summary.findById(req.params.id);

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });
    }

    await summary.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting summary',
      error: error.message
    });
  }
};

module.exports = {
  validateUrl,
  generateSummary,
  getAllSummaries,
  getSummaryById,
  updateSummary,
  deleteSummary
};
