'use strict';
var express = require('express');
var app = express();
app.use(express.static(__dirname)); // serve static files

var PORT = 3000;
app.listen(PORT);
console.log('Express server listening on port', PORT);
