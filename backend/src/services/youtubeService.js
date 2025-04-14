const YTDlpWrap = require("yt-dlp-wrap").default;
const fs = require("fs");
const path = require("path");
const os = require("os");

// Initialize yt-dlp-wrap
const ytDlp = new YTDlpWrap();

// Create temp directory for transcripts
const tempDir = path.join(os.tmpdir(), "videosum-transcripts");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

/**
 * Validates a YouTube URL and returns video info if valid
 * @param {string} url - YouTube video URL
 * @returns {Promise<Object>} - Video info or null if invalid
 */
const validateYoutubeUrl = async (url) => {
    try {
        // Check if URL contains youtube.com or youtu.be
        if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
            return { valid: false, message: "Not a YouTube URL" };
        }

        // Create a unique filename for this request
        const infoFile = path.join(tempDir, `info-${Date.now()}.json`);

        try {
            // Get basic video info to validate URL
            await ytDlp.execPromise([
                url,
                "--dump-json",
                "--skip-download",
                "-o",
                infoFile,
            ]);

            // Read the info file
            const infoData = fs.readFileSync(infoFile, "utf8");
            const info = JSON.parse(infoData);

            // Clean up
            if (fs.existsSync(infoFile)) {
                fs.unlinkSync(infoFile);
            }

            if (!info || !info.id) {
                return {
                    valid: false,
                    message: "Invalid YouTube URL or video not found",
                };
            }

            return {
                valid: true,
                videoId: info.id,
                title: info.title,
                thumbnail: info.thumbnail,
            };
        } catch (error) {
            // Clean up on error
            if (fs.existsSync(infoFile)) {
                fs.unlinkSync(infoFile);
            }
            throw error;
        }
    } catch (error) {
        console.error("YouTube URL validation error:", error);
        return {
            valid: false,
            message: "Error validating YouTube URL",
            error: error.message,
        };
    }
};

/**
 * Fetches video metadata (title, thumbnail)
 * @param {string} url - YouTube video URL
 * @returns {Promise<Object>} - Video metadata
 */
const getVideoMetadata = async (url) => {
    try {
        // Create a unique filename for this request
        const infoFile = path.join(tempDir, `metadata-${Date.now()}.json`);

        try {
            // Get video info
            await ytDlp.execPromise([
                url,
                "--dump-json",
                "--skip-download",
                "-o",
                infoFile,
            ]);

            // Read the info file
            const infoData = fs.readFileSync(infoFile, "utf8");
            const info = JSON.parse(infoData);

            // Clean up
            if (fs.existsSync(infoFile)) {
                fs.unlinkSync(infoFile);
            }

            return {
                title: info.title || "Untitled Video",
                thumbnail: info.thumbnail || "",
                duration: info.duration,
                uploader: info.uploader,
            };
        } catch (error) {
            // Clean up on error
            if (fs.existsSync(infoFile)) {
                fs.unlinkSync(infoFile);
            }
            throw error;
        }
    } catch (error) {
        console.error("Error fetching video metadata:", error);
        return {
            title: "Untitled Video",
            thumbnail: "",
            error: error.message,
        };
    }
};

/**
 * Fetches video transcript
 * @param {string} url - YouTube video URL
 * @returns {Promise<string>} - Video transcript or null if not available
 */
const getVideoTranscript = async (url) => {
    try {
        // Create unique filenames for this request
        const infoFile = path.join(tempDir, `info-${Date.now()}.json`);
        const subtitleFile = path.join(tempDir, `subs-${Date.now()}.srt`);

        try {
            // First, get video info with subtitles
            await ytDlp.execPromise([
                url,
                "--dump-json",
                "--skip-download",
                "--write-auto-sub",
                "--sub-lang",
                "en",
                "--convert-subs",
                "srt",
                "-o",
                infoFile,
            ]);

            // Read the info file
            const infoData = fs.readFileSync(infoFile, "utf8");
            const info = JSON.parse(infoData);

            // Check if subtitles are available
            if (
                (!info.subtitles || Object.keys(info.subtitles).length === 0) &&
                (!info.automatic_captions ||
                    Object.keys(info.automatic_captions).length === 0)
            ) {
                // Clean up
                if (fs.existsSync(infoFile)) {
                    fs.unlinkSync(infoFile);
                }
                return {
                    available: false,
                    message: "No transcripts available for this video",
                };
            }

            // Try to download subtitles
            try {
                // Download subtitles
                await ytDlp.execPromise([
                    url,
                    "--skip-download",
                    "--write-auto-sub",
                    "--sub-lang",
                    "en",
                    "--convert-subs",
                    "srt",
                    "-o",
                    path.join(tempDir, "subs"),
                ]);

                // Find the subtitle file
                const files = fs.readdirSync(tempDir);
                const subtitleFiles = files.filter((file) =>
                    file.endsWith(".en.srt")
                );

                if (subtitleFiles.length === 0) {
                    // Clean up
                    if (fs.existsSync(infoFile)) {
                        fs.unlinkSync(infoFile);
                    }
                    return {
                        available: false,
                        message:
                            "No English transcripts available for this video",
                    };
                }

                // Read the subtitle file
                const subtitlePath = path.join(tempDir, subtitleFiles[0]);
                const subtitleData = fs.readFileSync(subtitlePath, "utf8");

                // Clean up
                if (fs.existsSync(infoFile)) {
                    fs.unlinkSync(infoFile);
                }
                if (fs.existsSync(subtitlePath)) {
                    fs.unlinkSync(subtitlePath);
                }

                return {
                    available: true,
                    transcript: parseSrtToText(subtitleData),
                };
            } catch (error) {
                console.error("Error downloading subtitles:", error);
                // Clean up
                if (fs.existsSync(infoFile)) {
                    fs.unlinkSync(infoFile);
                }
                return {
                    available: false,
                    message: "Error downloading subtitles",
                    error: error.message,
                };
            }
        } catch (error) {
            // Clean up on error
            if (fs.existsSync(infoFile)) {
                fs.unlinkSync(infoFile);
            }
            if (fs.existsSync(subtitleFile)) {
                fs.unlinkSync(subtitleFile);
            }
            throw error;
        }
    } catch (error) {
        console.error("Error fetching video transcript:", error);
        return {
            available: false,
            message: "Error fetching video transcript",
            error: error.message,
        };
    }
};

/**
 * Parses SRT format to plain text
 * @param {string} srtText - SRT formatted text
 * @returns {string} - Plain text transcript
 */
const parseSrtToText = (srtText) => {
    if (!srtText) return "";

    // Remove time codes and numbers, keep only the text
    return srtText
        .replace(/^\d+$/gm, "") // Remove subtitle numbers
        .replace(/\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/g, "") // Remove timestamps
        .replace(/\n\s*\n/g, "\n") // Remove empty lines
        .replace(/^\s+|\s+$/g, "") // Trim whitespace
        .trim();
};

module.exports = {
    validateYoutubeUrl,
    getVideoMetadata,
    getVideoTranscript,
};
