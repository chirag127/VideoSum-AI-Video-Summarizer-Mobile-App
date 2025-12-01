import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VideoSummarizationService } from '../../src/services/VideoSummarizationService';
import { AIService } from '../../src/services/AIService'; // Assuming an AI service
import { VideoProcessingService } from '../../src/services/VideoProcessingService'; // Assuming a video processing service

// Mock external dependencies to isolate VideoSummarizationService
vi.mock('../../src/services/AIService', () => ({
  AIService: {
    summarizeVideoContent: vi.fn(),
  },
}));

vi.mock('../../src/services/VideoProcessingService', () => ({
  VideoProcessingService: {
    extractVideoMetadata: vi.fn(),
    uploadVideoForProcessing: vi.fn(), // Placeholder if processing involves uploading
  },
}));

describe('VideoSummarizationService', () => {
  let videoSummarizationService: VideoSummarizationService;

  beforeEach(() => {
    // Reset mocks before each test to ensure isolation
    vi.clearAllMocks();
    videoSummarizationService = new VideoSummarizationService();
  });

  it('should successfully summarize a valid video URL with default options', async () => {
    const mockVideoUrl = 'https://example.com/test-video.mp4';
    const mockExtractedText = 'This is the extracted transcript of the video content.';
    const mockSummary = 'A concise AI-generated summary of the video.';

    // Configure mocks for successful operation
    vi.mocked(VideoProcessingService.extractVideoMetadata).mockResolvedValue({
      duration: 120,
      title: 'Sample Video',
      transcript: mockExtractedText,
    });
    vi.mocked(AIService.summarizeVideoContent).mockResolvedValue(mockSummary);

    const result = await videoSummarizationService.summarizeVideo(mockVideoUrl);

    // Assertions
    expect(VideoProcessingService.extractVideoMetadata).toHaveBeenCalledWith(mockVideoUrl);
    expect(AIService.summarizeVideoContent).toHaveBeenCalledWith(mockExtractedText, { length: 'medium', format: 'paragraph' });
    expect(result).toEqual({
      success: true,
      summary: mockSummary,
      metadata: { duration: 120, title: 'Sample Video', transcript: mockExtractedText },
    });
  });

  it('should handle an empty video URL gracefully', async () => {
    const emptyUrl = '';
    const result = await videoSummarizationService.summarizeVideo(emptyUrl);

    // Expect failure due to invalid input
    expect(result).toEqual({
      success: false,
      error: 'Invalid video URL provided.',
    });
    expect(VideoProcessingService.extractVideoMetadata).not.toHaveBeenCalled();
    expect(AIService.summarizeVideoContent).not.toHaveBeenCalled();
  });

  it('should return an error if video metadata extraction fails', async () => {
    const mockVideoUrl = 'https://example.com/corrupt-video.mp4';
    const errorMessage = 'Failed to extract any metadata or transcript from video.';

    // Mock video processing failure
    vi.mocked(VideoProcessingService.extractVideoMetadata).mockRejectedValue(new Error(errorMessage));

    const result = await videoSummarizationService.summarizeVideo(mockVideoUrl);

    // Expect failure due to video processing
    expect(VideoProcessingService.extractVideoMetadata).toHaveBeenCalledWith(mockVideoUrl);
    expect(AIService.summarizeVideoContent).not.toHaveBeenCalled();
    expect(result).toEqual({
      success: false,
      error: `Video processing failed: ${errorMessage}`,
    });
  });

  it('should return an error if AI summarization service fails', async () => {
    const mockVideoUrl = 'https://example.com/good-video.mp4';
    const mockExtractedText = 'This is a valid transcript.';
    const errorMessage = 'AI service temporarily unavailable.';

    // Mock video processing success but AI summarization failure
    vi.mocked(VideoProcessingService.extractVideoMetadata).mockResolvedValue({
      duration: 60,
      title: 'Short Clip',
      transcript: mockExtractedText,
    });
    vi.mocked(AIService.summarizeVideoContent).mockRejectedValue(new Error(errorMessage));

    const result = await videoSummarizationService.summarizeVideo(mockVideoUrl);

    // Expect failure due to AI service
    expect(VideoProcessingService.extractVideoMetadata).toHaveBeenCalledWith(mockVideoUrl);
    expect(AIService.summarizeVideoContent).toHaveBeenCalledWith(mockExtractedText, { length: 'medium', format: 'paragraph' });
    expect(result).toEqual({
      success: false,
      error: `AI summarization failed: ${errorMessage}`,
    });
  });

  it('should apply custom summarization options correctly', async () => {
    const mockVideoUrl = 'https://example.com/custom-options-video.mp4';
    const mockExtractedText = 'Detailed transcript for custom summarization.';
    const mockCustomSummary = 'Brief summary in bullet points.';
    const customOptions = { length: 'short', format: 'bullet-points' as 'bullet-points' };

    // Configure mocks with custom options
    vi.mocked(VideoProcessingService.extractVideoMetadata).mockResolvedValue({
      duration: 300,
      title: 'Custom Options',
      transcript: mockExtractedText,
    });
    vi.mocked(AIService.summarizeVideoContent).mockResolvedValue(mockCustomSummary);

    const result = await videoSummarizationService.summarizeVideo(mockVideoUrl, customOptions);

    // Assert that AI service was called with custom options
    expect(AIService.summarizeVideoContent).toHaveBeenCalledWith(mockExtractedText, customOptions);
    expect(result.success).toBe(true);
    expect(result.summary).toEqual(mockCustomSummary);
  });

  it('should handle video processing returning no transcript', async () => {
    const mockVideoUrl = 'https://example.com/no-transcript-video.mp4';

    vi.mocked(VideoProcessingService.extractVideoMetadata).mockResolvedValue({
      duration: 50,
      title: 'Silent Film',
      transcript: '', // No transcript available
    });

    const result = await videoSummarizationService.summarizeVideo(mockVideoUrl);

    expect(result).toEqual({
      success: false,
      error: 'Video processing failed: Could not extract transcript.',
    });
    expect(AIService.summarizeVideoContent).not.toHaveBeenCalled();
  });
});
