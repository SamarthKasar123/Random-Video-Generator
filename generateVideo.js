const path = require('path');
const { downloadFile } = require('./download');
const { mergeVideos } = require('./mergeVideos');
const { overlayText } = require('./overlayText');
const { addAudio } = require('./addAudio');
const fs = require('fs-extra');

async function generateVideo(transcriptionDetails, videoDetails, audioLink) {
    const tempDir = path.join(__dirname, 'temp');
    fs.ensureDirSync(tempDir);

    let videoPaths = [];
    for (let i = 0; i < videoDetails.length; i++) {
        let filePath = path.join(tempDir, `video${i}.mp4`);
        await downloadFile(videoDetails[i], filePath);
        videoPaths.push(filePath);
    }

    let mergedVideoPath = path.join(tempDir, 'merged.mp4');
    await mergeVideos(videoPaths, mergedVideoPath);

    let textOverlayVideo = path.join(tempDir, 'text_overlay.mp4');
    await overlayText(mergedVideoPath, transcriptionDetails, textOverlayVideo);

    let audioFilePath = path.join(tempDir, 'audio.mp3');
    await downloadFile(audioLink, audioFilePath);

    let finalVideoPath = path.join(__dirname, 'final_video.mp4');
    await addAudio(textOverlayVideo, audioFilePath, finalVideoPath);

    console.log(`Final video saved at: ${finalVideoPath}`);
}

module.exports = { generateVideo };
