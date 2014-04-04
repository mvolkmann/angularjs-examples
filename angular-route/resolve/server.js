'use strict';
var express = require('express');
var app = express();
app.use(express.static(__dirname)); // serve static files

var PORT = 1919;
app.listen(PORT);
console.log('browse http://localhost:' + PORT);
