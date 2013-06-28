'use strict';

describe('Directive: kumaGraph', function () {
  beforeEach(module('pocApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<kuma-graph></kuma-graph>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the kumaGraph directive');
  }));
});
