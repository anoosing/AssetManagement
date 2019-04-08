(function () {

    'use strict';
	
    angular.module("AssetManagementApp").config(['$httpProvider', function ($httpProvider) {
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        $httpProvider.defaults.headers.get["Cache-Control"] = "no-cache";
        $httpProvider.defaults.headers.common.Pragma = "no-cache";
        $httpProvider.defaults.headers.get["If-Modified-Since"] = "0";
    }]);

    // Datagrid service
    angular.module('AssetManagementApp')
        .service('appService', ['$http', function ($http) {
            $http.defaults.headers.get = { 'Content-Type': 'application/json' };

			this.getAssetsList = function () {
                var promise = $http({
                    url: "assetsData.json",
                    method: "GET"
                })
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                });
                return promise;
            }

            this.getAssetDetails = function (id, object) {
                var indexUpdated = 0;
                var value = object.filter(function(value, index){if(String(value.id).indexOf(String(id)) != -1) {indexUpdated = index;return value}})[0];
                return [value, indexUpdated];
            }
        }]);
}());