'use strict';
var express = require('express');

var app = express();

// To parse request bodies as raw text instead of JSON,
// use this instead of express.bodyParser().
/*
app.use(function (req, res, next) {
  req.setEncoding('utf8');
  req.body = '';
  req.on('data', function (chunk) { req.body += chunk; });
  req.on('end', next);
});
*/

app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname));

// TODO: Change this to persist todos to some database.
var todos = {};
var archive = {};
var nextId = Object.keys(todos).length;

// Deletes all archived todos.
// curl -XDELETE http://localhost:1919/todo/archive
app['delete']('/todo/archive', function (req, res) {
  archive = {};
  res.send(null, 200);
});

// Deletes a todo.
// curl -XDELETE http://localhost:1919/todo/0
app['delete']('/todo/:id', function (req, res) {
  var id = req.params.id;
  var todo = todos[id];
  if (todo) delete todos[id];
  res.send(null, todo ? 200 : 404);
});

// Retrieves all archived todos as a JSON object where
// keys are ids and values are todo objects.
// curl http://localhost:1919/todo
app.get('/todo/archive', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(archive, 200);
});

// Retrieves a todo.
// curl http://localhost:1919/todo/0
app.get('/todo/:id', function (req, res) {
  var id = req.params.id;
  var todo = todos[req.params.id];
  res.send(todo, todo ? 200 : 404);
});

// Retrieves all active todos as a JSON object where
// keys are ids and values are todo objects.
// curl http://localhost:1919/todo
app.get('/todo', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(todos, 200);
});

// Updates a todo.
// curl -XPUT http://localhost:1919/todo/0 -d 'go for a long run'
app.put('/todo/:id', function (req, res) {
  var id = req.params.id;
  var todo = todos[id];
  if (todo) todos[id] = req.body;
  res.send(null, todo ? 200 : 404);
});

// Creates a todo and returns its URL.
// curl -XPOST http://localhost:1919/todo -d 'go for a run'
app.post('/todo', function (req, res) {
  var todo = req.body;
  todo.id = nextId++;
  todos[todo.id] = todo;
  res.send('/todo/' + todo.id, 200);
});

// Archives a todo.  This version actually deletes it.
// curl -XPOST http://localhost:1919/todo/0/archive
app.post('/todo/:id/archive', function (req, res) {
  var id = req.params.id;
  var todo = todos[id];
  // TODO: Change this to mark the todo as archived instead of deleting it.
  // TODO: Change "get all" to only return todos that are not archived.
  if (todo) delete todos[id];
  archive[id] = todo;
  res.send(null, todo ? 200 : 404);
});

var PORT = 1919;
app.listen(PORT);
console.log('listening on', PORT);
