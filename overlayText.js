const ffmpeg = require('fluent-ffmpeg');

async function overlayText(inputVideo, transcription, outputVideo) {
    let drawTextCommands = transcription.map(({ text, start, end }, index) => {
        return `[0:v]drawtext=text='${text}':fontcolor=white:fontsize=24:x=10:y=H-th-10:enable='between(t,${start},${end})'[v${index}];`;
    }).join('');

    let filterComplex = `[0:v]${drawTextCommands}concat=n=${transcription.length}:v=1:a=0[outv]`;

    return new Promise((resolve, reject) => {
        ffmpeg(inputVideo)
            .videoFilter(filterComplex)
            .outputOptions('-map [outv]')
            .save(outputVideo)
            .on('end', () => {
                console.log('Text overlay added successfully');
                resolve();
            })
            .on('error', reject);
    });
}

module.exports = { overlayText };
