const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');

// Validate YouTube URL
router.post('/validate', summaryController.validateUrl);

// Generate summary
router.post('/', summaryController.generateSummary);

// Get all summaries
router.get('/', summaryController.getAllSummaries);

// Get single summary
router.get('/:id', summaryController.getSummaryById);

// Update summary
router.put('/:id', summaryController.updateSummary);

// Delete summary
router.delete('/:id', summaryController.deleteSummary);

module.exports = router;
