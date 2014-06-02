'use strict';
/*global angular: false, beforeEach: false,
  ddescribe: false, describe: false,
  expect: false, inject: false, it: false,
  module: false, xdescribe: false */

// Test a module.
describe('KarmaDemo module', function () {
  var module = angular.module('KarmaDemo');

  it('should exist', function () {
    expect(module).not.toBeNull();
  });

  it('should have correct dependencies', function () {
    expect(module.requires.length).toBe(2);
    expect(module.requires).toContain('ngRoute');
    expect(module.requires).toContain('OtherModule');
  });
});

// Test a service.
describe('demoSvc service', function () {
  beforeEach(function () {
    module('KarmaDemo');
    
    /* This works, but it is commented out so the real service is tested.
    // This is an example of providing a mock service.
    // It is useful to mock services that are used by
    // a controller or service that is being tested.
    module(function ($provide) {
      $provide.value('demoSvc', {
        increment: function (n) {
          return n + 1;
        }
      });
    });
    */
  });

  // This will fail if no service named "demoSvc" exists.
  it('should increment properly', inject(function (demoSvc) {
    expect(demoSvc.increment(2)).toBe(3);
  }));

  it('should get content from a URL', inject(function (demoSvc, $httpBackend) {
    var url = 'http://localhost:3000/demo';

    $httpBackend.when('GET', url).respond('just testing');

    var that = this;
    demoSvc.getContent(url).
      success(function (content) {
        expect(content).toBe('just testing');
      }).
      error(function (err) {
        that.fail(new Error(err));
      });

    $httpBackend.flush();
  }));
});

// Test a controller.
describe('DemoCtrl controller', function () {
  var scope;

  beforeEach(function () {
    module('KarmaDemo');
    /* uncomment to use mock service
    module(function ($provide) {
      $provide.value('demoSvc', {
        increment: function (n) { return n + 1; }
      });
    });
    */
    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new(); // create a scope for DemoCtrl to use
      $controller('DemoCtrl', {$scope: scope}); // give scope to DemoCtrl
    });
  });

  it('should have number in scope', function () {
    expect(scope.number).not.toBeNull();
    expect(scope.number).toBe(1);
  });

  it('should increment properly', function () {
    scope.increment();
    expect(scope.number).toBe(2);
    scope.increment();
    expect(scope.number).toBe(3);
  });
});

// Test a filter.
describe('asWord filter', function () {
  beforeEach(module('KarmaDemo'));

  // This will fail if no fitler named "asWord" exists.
  it('should translate 2', inject(function (asWordFilter) {
    expect(asWordFilter(2)).toBe('two');
  }));
});

// Test a directive.
//TODO: Why doesn't this test work?
xdescribe('evenOddClass directive', function () {
  beforeEach(module('KarmaDemo'));

  it('should add correct CSS class to an element',
    inject(function ($compile, $rootScope) {

    var scope = $rootScope.$new();

    scope.number = 1;
    // The directive should add the CSS class "bar"
    // to the element because number is odd.
    // This will fail if no directive named "even-odd-class" exists.
    var element =
      $compile('<span even-odd-class="foo,bar" even-odd-expr="number"></span>')(scope);
    expect(element.hasClass('bar')).toBe(true);

    scope.number = 2;
    // The directive should add the CSS class "foo"
    // to the element because number is even.
    element =
      $compile('<span even-odd-class="foo,bar" even-odd-expr="number"></span>')(scope);
    expect(element.hasClass('foo')).toBe(true);
  }));
});

// Test a directive that uses an external template.
describe('addressLabel directive', function () {
  // Load the app module and template files.
  // GET requests for template files will then
  // return compiled templates from $templateCache.
  beforeEach(module('KarmaDemo', 'partials/address.html'));

  it('should create address label', inject(function ($compile, $rootScope) {
    var scope = $rootScope.$new();

    scope.myAddress = {
      street: '644 Glen Summit',
      city: 'St. Charles',
      state: 'MO',
      zip: 63304
    };

    var html = '<address-label address="myAddress"></address-label>';
    //var element = angular.element(html);
    //$compile(element)(scope);
    // Alternative to previous two lines.
    var element = $compile(html)(scope);

    // Initiate digest cycle to update DOM based on scope changes.
    scope.$digest();

    expect(element.hasClass('address')).toBe(true);
    expect(element.text()).toContain('St. Charles');
  }));
});

// Test a route.
describe('footer routes', function () {
  it('should change path', function () {
    // Must do before inject so routes are configured.
    module('KarmaDemo');
    
    inject(function ($location, $route) {
      var route = $route.routes['/even'];
      expect(route.controller).toBe('EvenFooterCtrl');
      expect(route.templateUrl).toBe('partials/evenFooter.html');
      expect(route.view).toBe('footer');

      route = $route.routes['/odd'];
      expect(route.controller).toBe('OddFooterCtrl');
      expect(route.templateUrl).toBe('partials/oddFooter.html');
      expect(route.view).toBe('footer');
    });
  });
});

// Test $log service.
describe('$log service', function () {
  it('should be usable in tests', function () {
    inject(function ($log) {
      $log.log('foo', 'bar');

      var logs = $log.log.logs;
      expect(logs.length).toBe(1);

      var firstLog = logs[0];
      expect(firstLog.length).toBe(2);
      expect(firstLog[0]).toBe('foo');
      expect(firstLog[1]).toBe('bar');
    });
  });
});
