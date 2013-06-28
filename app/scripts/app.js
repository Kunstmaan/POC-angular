'use strict';

angular.module('pocApp', ['$strap.directives'])
    .config(['config', '$routeProvider', '$locationProvider', function (config, $routeProvider, $locationProvider) {

        if (typeof config.routes !== "undefined") {
            var route, routeName;
            for (routeName in config.routes) {
                route = config.routes[routeName];

                $routeProvider.when(route.path, {
                    templateUrl: 'views/' + route.templateUrl,
                    controller: route.controller
                })
            }
        }

        $routeProvider.otherwise({
            redirectTo: '/'
        });

        // $locationProvider.html5Mode(true);

        Highcharts.setOptions({
            global : {
                useUTC : false
            }
        });
    }])
    .run(['$rootScope', 'config', function($rootScope, config) {
        var routes = config.routes;

        $rootScope.path = function(routeName, params, noHash) {
            if (typeof routes[routeName] !== "undefined") {
                var param, queryParams = [], routePath = routes[routeName].path;

                for(param in params) {
                    if (routePath.indexOf(':' + param) !== -1) {
                        routePath = routePath.replace(':' + param, params[param]);
                    } else {
                        queryParams.push(param + '=' + params[param]);
                    }
                }

                if (queryParams.length > 0) {
                    routePath = routePath + '?' + queryParams.join('&');
                }

                if (!noHash) {
                    routePath = '#' + routePath
                }

                return routePath;
            }

            return undefined;
        }
    }]);
