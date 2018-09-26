const compressor = require('node-minify');

compressor.minify({
    compressor: 'clean-css',
    input: './dist/style.css',
    output: './dist/style.css',
    callback: function (err, min) {
        if (err) {
            console.log('ERROR MINIFYING CSS')
        } else {
            console.log('CSS MINIFY SUCCESS')
        }
    }
});