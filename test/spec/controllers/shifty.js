'use strict';

describe('Controller: ShiftyController', function () {

  // load the controller's module
  beforeEach(module('angularAppApp'));

  var ShiftyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShiftyCtrl = $controller('ShiftyController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ShiftyCtrl.awesomeThings.length).toBe(3);
  });
});
