'use strict';

angular.module('pocApp')
    .controller('MainCtrl', ['$scope', 'stockRepository', function ($scope, stockRepository) {
        var allData = stockRepository.findAll();

        $scope.allData = allData;
        $scope.data = allData;
        $scope.filter = "";

        $scope.$watch('filter', function(newValue) {
            if (!newValue) {
                $scope.data = allData;
            } else {
                $scope.data = stockRepository.findByName(newValue);
            }
        });
    }]);
