'use strict';
var express = require('express');

var app = express();
app.use(app.router);
app.use(express.static(__dirname));

app.get('/demo', function (req, res) {
  res.send('just testing', 200);
});

var PORT = 3000;
app.listen(PORT);
console.log('listening on', PORT);
