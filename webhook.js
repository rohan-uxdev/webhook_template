const secret = "INSERT YOUR SECRET HERE";

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            exec('cd REPO_LOCATION && git pull && npm i && pm2 restart PROCESS_NAME');
            console.log('updated')

        }
    });

    res.end();
}).listen(port);

