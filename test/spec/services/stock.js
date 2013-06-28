'use strict';

describe('Service: stock', function () {

  // load the service's module
  beforeEach(module('pocApp'));

  // instantiate service
  var stock;
  beforeEach(inject(function (_stock_) {
    stock = _stock_;
  }));

  it('should do something', function () {
    expect(!!stock).toBe(true);
  });

});
