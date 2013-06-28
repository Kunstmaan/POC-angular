angular.module('pocApp')
    .constant('config', {
        'routes': {
            'home_path': {
                'path': '/',
                'templateUrl': 'main.html',
                'controller': 'MainCtrl'
            },
            'overview_path': {
                'path': '/overview',
                'templateUrl': 'overview.html',
                'controller': 'OverviewCtrl'
            },
            'add_stock_item_path': {
                'path': '/overview/new',
                'templateUrl': 'new.html',
                'controller': 'NewStockItemCtrl'
            },
            'stock_item_path': {
                'path': '/overview/:item',
                'templateUrl': 'detail.html',
                'controller': 'DetailCtrl'
            }
        }
    });