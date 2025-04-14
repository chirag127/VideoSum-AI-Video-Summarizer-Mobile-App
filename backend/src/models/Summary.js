const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
    index: true
  },
  videoTitle: {
    type: String,
    default: 'Untitled Video'
  },
  videoThumbnailUrl: {
    type: String,
    default: ''
  },
  summaryText: {
    type: String,
    required: true
  },
  summaryType: {
    type: String,
    enum: ['Brief', 'Detailed', 'Key Point'],
    default: 'Brief'
  },
  summaryLength: {
    type: String,
    enum: ['Short', 'Medium', 'Long'],
    default: 'Medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Summary', SummarySchema);
