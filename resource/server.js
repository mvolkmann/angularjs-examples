'use strict';
var express = require('express');
var app = express();
var nextId = 1;
var contacts = {}; // just storing data in memory

app.use(express.static(__dirname)); // serve static files
app.use(express.bodyParser()); // automatically convert JSON requests to objects

function create(contact) {
  var id = nextId++;
  contact.id = id;
  contacts[id] = contact;
}

function del(req, res) {
  var id = req.params.id;
  if (contacts[id]) {
    delete contacts[id];
    res.send(200);
  } else {
    res.send(404);
  }
}

function get(req, res) {
  var id = req.params.id;
  var contact = contacts[id];
  if (contact) {
    res.set('Content-Type', 'application/json');
    res.send(200, contact);
  } else {
    res.send(404);
  }
}

/**
 * Return a JSON array of contacts.
 * If "start" query parameter is specified,
 * only contacts starting from that index are returned.
 * If "length" query parameter is also specified,
 * only that number of contacts are returned.
 * Otherwise all contacts are returned.
 */
function list(req, res) {
  res.set('Content-Type', 'application/json');

  // AngularJS $resource wants this to return a JSON array.
  var arr = Object.keys(contacts).map(function (key) { return contacts[key]; });
  arr.sort(function (c1, c2) { return c1.name.localeCompare(c2.name); });

  if (req.query.start) {
    var start = parseInt(req.query.start, 10);
    var length = parseInt(req.query.length, 10);
    arr = length ? arr.slice(start, start + length) : arr.slice(start);
  }

  res.send(200, arr);
}

function post(req, res) {
  var contact = req.body;
  create(contact);
  res.send(200, contact);
}

function put(req, res) {
  var id = req.params.id;
  if (contacts[id]) {
    contacts[id] = req.body;
    res.send(200);
  } else {
    res.send(404);
  }
}

// curl -XPOST localhost:3000/contact -H"Content-Type: application/json" \
// -d'{"name": "Richard", "email": "r.mark.volkmann@gmail.com"}'
app.post('/contact', post); // create

// curl -XPUT localhost:3000/contact/1 -H"Content-Type: application/json" \
// -d'{"name": "Mark", "email": "r.mark.volkmann@gmail.com"}'
app.put('/contact/:id', put); // update

// curl localhost:3000/contact
app.get('/contact', list); // retrieve all

// curl localhost:3000/contact/1
app.get('/contact/:id', get); // retrieve

// curl -XDELETE localhost:3000/contact/1
app['delete']('/contact/:id', del); // delete

create({
  name: 'Mark',
  email: 'r.mark.volkmann@gmail.com',
  mobile: '314-123-4567'
});
create({
  name: 'Tami',
  email: 'tami@gmail.com',
  mobile: '314-123-5678'
});
create({
  name: 'Amanda',
  email: 'amanda@gmail.com',
  mobile: '314-123-6789'
});
create({
  name: 'Jeremy',
  email: 'jeremy@gmail.com',
  mobile: '314-123-7890'
});

var PORT = 3000;
app.listen(PORT);
console.log('browse http://localhost:' + PORT);
