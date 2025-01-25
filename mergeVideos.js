const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

async function mergeVideos(videoFiles, outputPath) {
    const fileListPath = path.join(__dirname, 'fileList.txt');

    // Generate the file list content
    const fileContent = videoFiles.map(file => `file '${path.resolve(file).replace(/\\/g, '/')}'`).join('\n');

    // Write to fileList.txt
    fs.writeFileSync(fileListPath, fileContent, { encoding: 'utf-8' });

    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(fileListPath)
            .inputOptions(['-f concat', '-safe 0'])
            .outputOptions(['-c copy'])
            .save(outputPath)
            .on('end', () => {
                console.log('Videos merged successfully');
                resolve();
            })
            .on('error', (err) => {
                console.error('Error merging videos:', err);
                reject(err);
            });
    });
}

module.exports = { mergeVideos };
