'use strict';

angular.module('pocApp')
    .controller('DetailCtrl', ['$scope', '$routeParams', 'stockRepository', function ($scope, $routeParams, stockRepository) {
        $scope.item = stockRepository.findByName($routeParams.item);
        $scope.form = {
            quotation: 100
        };

        $scope.addQuotation = function() {
            $scope.item.addQuotation($scope.form.quotation);
        }

    }]);
