'use strict';

angular.module('pocApp')
    .factory('Stock', function() {
        var calculateAverage = function(Stock) {
            return _.reduce(Stock.history, function(total, arr) { return total + arr[1]; }, 0) / Stock.history.length;
        };

        var Stock = function(name, market) {
            this.name = name;
            this.market = market;
            this.history = [];
            this.average = calculateAverage(this);
        };

        Stock.prototype = {
            'getName': function() {
                return this.name;
            },
            'getMarket': function() {
                return this.market;
            },
            'getHistory': function() {
                return this.history;
            },
            'getAverageQuotation': function() {
                return this.average;
            },
            'addQuotation': function(quotation, time) {
                if (typeof time === "undefined") {
                    time = (new Date()).getTime();
                }

                this.history.push([time, quotation]);

                this.average = calculateAverage(this);
                this.history = _.sortBy(this.history, function(quotation){ return quotation[0]; });
            }
        }

        return Stock
    })
    .factory('stockRepository', ['Stock', function (Stock) {

        // public members
        var findAll, findByName, findByMarkets, findAllMarkets, addStockItem;

        // private
        var data = [new Stock('BEL20', 'Brussels Euronext'), new Stock('GOOG', 'Nasdaq'), new Stock('AAPL', 'Nasdaq'), new Stock('MSFT', 'Nasdaq')],
            markets = [];

        // init the data with values for the last 24 hours
        var i,
            maxStart = 200,
            maxStep = 5;

        for (i = 0; i < data.length ; i++) {
            var j,
                item = data[i],
                history = [],
                time = (new Date()).getTime(),
                base = Math.floor((Math.random() * maxStart) + 1);

            if (!_.contains(markets, item.getMarket())) {
                markets.push(item.getMarket());
            }

            for (j = 0; j < 60; j++) {
                item.addQuotation(base + (-maxStep + Math.floor((Math.random() * maxStep) + 1)), time - (j * 60000));
            }
        }

        findAll = function() {
            return data;
        };

        findByName = function(name) {
            var i, item;

            name = name.toLowerCase();

            for (i = 0; i < data.length ; i++) {
                item = data[i];

                if (item.name.toLowerCase() === name) {
                    return item;
                }
            }

            return null;
        };

        findByMarkets = function(markets) {
            if (!$.isArray(markets)) {
                markets = [markets]
            }

            var i, result = [];
            for (i = 0; i < data.length ; i++) {
                item = data[i];

                if (_.contains(markets, item.getMarket())) {
                    result.push(item);
                }
            }

            return result;
        };

        findAllMarkets = function() {
            return markets;
        };

        addStockItem = function(name, market, quotation) {
            var stock = new Stock(name, market);
            stock.addQuotation(quotation);

            data.push(stock);

            if (!_.contains(markets, market)) {
                markets.push(market);
            }

            return stock;
        }

        return {
            'findAll': findAll,
            'findByName': findByName,
            'findByMarkets': findByMarkets,
            'findAllMarkets': findAllMarkets,
            'addStockItem': addStockItem
        };
    }]);
