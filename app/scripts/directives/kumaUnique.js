'use strict';

angular.module('pocApp')
    .directive('kumaUnique', ['stockRepository', function (stockRepository) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function postLink(scope, element, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if (stockRepository.findByName(viewValue)) {
                        ctrl.$setValidity('unique', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('unique', true);
                        return viewValue;
                    }
                });
            }
        };
  }]);
