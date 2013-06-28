'use strict';

angular.module('pocApp')
    .directive('kumaGraph', function () {
        return {
            template: '<div></div>',
            restrict: 'E',
            scope: {
                'data': "=value"
            },
            replace: true,
            transclude: true,
            link: function postLink(scope, element, attrs) {

                var options = {
                        'xAxis': {
                            'type': 'datetime'
                        },
                        'series': []
                    };

                var data = scope.data;
                if (!$.isArray(data)) {
                    data = [data];
                }

                var i, stockData;
                for (i = 0; i < data.length; i++) {
                    stockData = data[i];

                    options.series.push({
                        'name': stockData.name,
                        'data': stockData.history
                    });
                }

                element.highcharts(options);

                var chart = element.highcharts();

                scope.$watch('data', function(newValue, oldValue) {
                    if (!newValue) return;

                    var data = newValue;
                    if (!$.isArray(data)) {
                        data = [data];
                    }

                    var i, serieIndexes = [];
                    for (i = 0; i < data.length; i++) {
                        var stockData = data[i];

                        var j, success = false;
                        for (j = 0; j < chart.series.length; j++) {
                            if (chart.series[j].name === stockData.name) {
                                serieIndexes.push(j);
                                chart.series[j].setData(stockData.history);
                                chart.series[j].show();
                                success = true;
                                break;
                            }
                        }

                        if (!success) {
                            chart.series.push({
                                'name': stockData.name,
                                'data': stockData.history
                            });
                        }
                    }

                    for (i = 0; i < chart.series.length; i++) {
                        if (!_.contains(serieIndexes, i)) {
                            chart.series[i].hide();
                        }
                    }

                }, true);
            }
        };
    });