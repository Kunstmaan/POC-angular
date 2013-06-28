'use strict';

describe('Controller: NewStockItemCtrl', function () {

  // load the controller's module
  beforeEach(module('pocApp'));

  var NewStockItemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewStockItemCtrl = $controller('NewStockItemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
