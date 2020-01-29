var PORT = process.env.PORT || 3000;
var express = require('express');
var http = require('http');

var app = express();
var server = http.Server(app);

server.listen(PORT, function () {
    console.log("Server running")
});

app.use(express.static('public'));
