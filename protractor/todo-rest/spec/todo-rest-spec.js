'use strict';
/*global beforeEach: false, browser: false, by: false, describe: false,
  element: false, expect: false, it: false, protractor: false */

var fs = require('fs');
var http = require('http');

describe('todo-rest', function () {
  var addBtn, archiveBtn, changeViewBtn, input, ptor, ul;

  beforeEach(function () {
    deleteArchive();

    ptor = protractor.getInstance();
    browser.get('http://localhost:1919/');

    // Find elements that are used in the tests.
    input = element(by.model('todoText'));
    addBtn = element(by.id('add-btn'));
    archiveBtn = element(by.id('archive-btn'));
    changeViewBtn = element(by.id('change-view-btn'));
    ul = element(by.tagName('ul'));

    deleteTodos(); // for a clean start
  });

  function deleteArchive() {
    var options = {
      hostname: 'localhost',
      port: 1919,
      path: '/todo/archive',
      method: 'DELETE'
    };
    http.request(options).end();
  }

  function deleteTodos() {
    element.all(by.className('delete-btn')).then(function (btns) {
      btns.forEach(function (btn) { btn.click(); });
    });
  }

  function expectTodoCount(n) {
    ul.findElements(by.tagName('li')).then(
      function (items) { expect(items.length).toBe(n); });
  }

  function takeScreenshot(filePath) {
    ptor.takeScreenshot().then(function (data) {
      var stream = fs.createWriteStream(filePath);
      stream.write(new Buffer(data, 'base64'));
      stream.end();
    });
  }

  it('should add a todo', function () {
    expect(ul.isPresent()).toBe(true);

    // Verify that there are no todos at the start.
    expectTodoCount(0);

    // Add a todo.
    input.sendKeys('cut grass');
    addBtn.click();

    // Verify that there is one todo.
    expectTodoCount(1);

    // Verify the text of the todo which is in an input element.
    var value = element(by.model('todo.text')).getAttribute('value');
    expect(value).toBe('cut grass');
  }, 1000); // one second timeout

  it('should delete a todo', function () {
    // Add a todo.
    input.sendKeys('cut grass');
    addBtn.click();

    // Delete the todo.
    element(by.className('delete-btn')).click();

    // Verify that there are no todos.
    expectTodoCount(0);
  }, 1000); // one second timeout

  it('should archive selected todos', function () {
    // Add three todos using enter key, instead of "Add" button.
    input.sendKeys('take out trash', protractor.Key.ENTER);
    input.sendKeys('get milk', protractor.Key.ENTER);
    input.sendKeys('cut grass', protractor.Key.ENTER);
    //takeScreenshot('todo-rest.png');

    // Select two of them.
    element.all(by.model('todo.done')).then(
      function (checkboxes) {
        expect(checkboxes.length).toBe(3);
        checkboxes[0].click();
        checkboxes[2].click();
      });

    // Archive the selected todos.
    archiveBtn.click();

    // Verify that there is one remaining todo.
    expectTodoCount(1);

    changeViewBtn.click();

    element.all(by.repeater('todo in archive')).then(function (lis) {
      expect(lis.length).toBe(2);
      expect(lis[0].getText()).toBe('cut grass');
      expect(lis[1].getText()).toBe('take out trash');
    });
  }, 2000); // takes more than one second when taking screenshot
});
