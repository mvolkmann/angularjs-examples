'use strict';
/*global protractor: false */

module.exports = function (ptor) {
  var obj = {};

  obj.click = function (id) {
    this.getElementById(id).click();
  };

  obj.getElementByClass = function (className) {
    return ptor.findElement(protractor.By.className(className));
  };

  obj.getElementById = function (id) {
    return ptor.findElement(protractor.By.id(id));
  };

  obj.getElementByName = function (name) {
    return ptor.findElement(protractor.By.name(name));
  };

  obj.getElementByXPath = function (xpath) {
    return ptor.findElement(protractor.By.xpath(xpath));
  };
  
  obj.getLink = function (linkText) {
    return ptor.findElement(protractor.By.linkText(linkText));
  };

  obj.getText = function (id) {
    return this.getElementById(id).getText();
  };
  
  obj.getTextAtXPath = function (xpath) {
    return this.getElementByXPath(xpath).getText();
  };
  
  obj.setInputValue = function (id, value) {
    var input = this.getElementById(id);
    input.clear();
    input.sendKeys(value);
  };
  
  return obj;
};
