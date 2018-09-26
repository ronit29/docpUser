const compressor = require('node-minify');
const DIST_FOLDER = './dist/';
const fs = require('fs');

fs.readdir(DIST_FOLDER, (err, files) => {
    let css_file = null
    for (let file of files) {
        if (file.includes('.css')) {
            css_file = file
        }
    }

    if (css_file) {
        compressor.minify({
            compressor: 'clean-css',
            input: `${DIST_FOLDER}${css_file}`,
            output: `${DIST_FOLDER}${css_file}`,
            options: {
                keepSpecialComments: 0
            },
            callback: function (err, min) {
                if (err) {
                    console.log('ERROR MINIFYING CSS')
                } else {
                    console.log('CSS MINIFY SUCCESS')
                }
            }
        });
    }
})