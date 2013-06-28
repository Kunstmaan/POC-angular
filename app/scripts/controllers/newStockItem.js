'use strict';

angular.module('pocApp')
    .controller('NewStockItemCtrl', ['$scope', 'stockRepository', '$location', function ($scope, stockRepository, $location) {
        $scope.newStockItem = {
            'name': '',
            'market': '',
            'quotation': 200
        };

        $scope.addStockItem = function(newStockItem) {
            var stockItem = stockRepository.addStockItem(newStockItem.name, newStockItem.market, newStockItem.quotation);

            $location.path($scope.path('stock_item_path', {item: stockItem.name}, true));
        };

    }]);
