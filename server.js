const path = require('path');
const http = require('http');
const Express = require('express');
const app = new Express();
const server = new http.Server(app);

app.use('/', Express.static(path.join(__dirname, 'dist')));

app.use('/api', Express.static(path.join(__dirname, 'dummy_api')));

app.use(function (req, res) {
    res.sendFile('index.html', { root: './dist/' })
})

server.listen(3000, (err) => {
    if (err) {
        return console.error(err);
    }
    console.info('Server running on http://localhost:3000');
});