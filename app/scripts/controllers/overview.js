'use strict';

angular.module('pocApp')
    .controller('OverviewCtrl', ['$scope', 'stockRepository', function ($scope, stockRepository) {
        var allStock = stockRepository.findAll();

        $scope.data = allStock;
        $scope.markets = stockRepository.findAllMarkets();

        $scope.typeahead = _.map(allStock, function(val) { return val.getName() });
        $scope.filter = {
            'name': '',
            'markets': {}
        };

        var i;
        for (i = 0; i < $scope.markets.length; i++) {
            $scope.filter.markets[$scope.markets[i]] = true;
        }

        $scope.$on('typeahead-updated', function(event, value) {
            $scope.data = [stockRepository.findByName(value)];
            $scope.$apply();
        });

        $scope.$watch('filter.markets', function(newValue, oldValue) {
            if (!newValue) return;

            var markets = _.map(_.filter(_.pairs(newValue), function(val) { return val[1]; }), function(val) { return val[0]; });
            $scope.data = stockRepository.findByMarkets(markets);
        }, true);
    }]);
