'use strict';
/*global beforeEach: false, browser: false, by: false, describe: false,
  element: false, expect: false, it: false, protractor: false */

describe('hello', function () {
  beforeEach(function () {
    browser.get('http://localhost:3000/');
  });

  it('should greet', function () {
    element(by.model('yourName')).sendKeys('Mark');

    var greeting = element(by.tagName('h1'));
    expect(greeting.getText()).toBe('Hello Mark!');
  }, 1000); // one second timeout
});
