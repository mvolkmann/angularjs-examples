'use strict';
/*global angular: false */

// The ngResource module defines $resource.
var app = angular.module('Demo', ['ngResource']);

app.controller('DemoCtrl', function ($resource, $scope) {

  // Define the "Contact" resource.
  var paramDefaults = null;
  var customActions = {
    getPaged: {
      method: 'GET',
      params: {start: '@start', length: '@length'},
      isArray: true // result is an array
    },
    update: {
      method: 'PUT',
      params: {id: '@id'}
    }
  };
  var Contact = $resource('/contact/:id', paramDefaults, customActions);

  $scope.createContact = function () {
    $scope.contact.$save();
    $scope.contacts.push($scope.contact);
    $scope.existingContact = true;
  };

  $scope.deleteContact = function () {
    var id = $scope.contact.id;
    $scope.contact.$delete({id: id}, function () {
      // Remove contact from array.
      //$scope.contacts.splice($scope.index, 1);
      delete $scope.contacts[$scope.index];

      $scope.newContact();
    });
  };

  // This is called when a contact name in the list on the left is clicked.
  $scope.getContact = function (index) {
    $scope.index = index;
    $scope.contact = $scope.contacts[index];
    $scope.existingContact = true;
    /*
    console.log('demo: $scope.contact =', $scope.contact);
    for (var prop in $scope.contact) {
      console.log('demo: prop =', prop);
    }
    */
  };

  // This demonstrates invoking a custom $resource action.
  $scope.getPaged = function () {
    // Currently hard-coded to return just the 2nd and 3rd contacts.
    var result = Contact.getPaged({start: 1, length: 2});
    // result will initially be an empty array.
    // It will be populated with Contact objects
    // when the HTTP response is received.
    $scope.contacts = result;
  };

  $scope.newContact = function () {
    $scope.contact = new Contact();
    $scope.existingContact = false;
    document.getElementById('name').focus();
  };

  $scope.updateContact = function () {
    // $resource objects really should provide a $update instance method
    // so the next line can be replaced by "$scope.contact.$update();".
    Contact.update($scope.contact);
  };

  // Retrieve all existing contacts for list on left.
  // The query method returns an array that is asynchronously populated.
  $scope.contacts = Contact.query();

  // Start in a state that is ready to add a new contact.
  $scope.newContact();
});
