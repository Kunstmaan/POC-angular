'use strict';

describe('Directive: unique', function () {
  beforeEach(module('pocApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<unique></unique>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the unique directive');
  }));
});
