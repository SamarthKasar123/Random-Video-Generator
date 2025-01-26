const { generateVideo } = require('./generateVideo');

const transcriptionDetails = [ /* Paste transcription JSON here */ ];
const videoDetails = [ /* Paste video URLs here */ ];
const audioLink = "https://dbuzz-assets.s3.amazonaws.com/static/sample_audio.mp3";

generateVideo(transcriptionDetails, videoDetails, audioLink)
    .then(() => console.log('Video generation complete'))
    .catch(console.error);
//This Project has been completed Successfully