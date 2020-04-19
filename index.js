const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const http = require('http').Server(app);
const io = require('socket.io')(http, { wsEngine: 'ws' });
const passwordHash = require('password-hash');  

const pwd = `${process.env.PASSWORD}`
let pwd_hash = passwordHash.generate(pwd)

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

app.use(express.static(path.join(__dirname, 'web-frontend')));

http.listen(port, () => {
    console.log('server is running..');
})