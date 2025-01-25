const ffmpeg = require('fluent-ffmpeg');

async function addAudio(videoFile, audioFile, outputVideo) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoFile)
            .input(audioFile)
            .outputOptions('-c:v copy')
            .outputOptions('-c:a aac')
            .outputOptions('-shortest')
            .save(outputVideo)
            .on('end', () => {
                console.log('Audio added successfully');
                resolve();
            })
            .on('error', reject);
    });
}

module.exports = { addAudio };
