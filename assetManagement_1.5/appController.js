(function () {

    "use strict";

    // Create module reference
    var module = angular.module("AssetManagementApp");

    module.controller('appController', function($scope, appService){
		var model = this;
		$scope.listOfAssets = [
			{id: 1, AssetId: "SHD-002323", AssetName: "Monitor", PurchasedDate: "10 Jun 2018", DamagedDate: "10 Jun 2018", AssignedDate: "09 Jun 2018", AssignedTo: "Chris", Cost: "100 GBP", Supplier: "Dell"},
			{id: 2, AssetId: "SHD-002323", AssetName: "Monitor", PurchasedDate: "10 Jun 2018", DamagedDate: "10 Jun 2018", AssignedDate: "09 Jun 2018", AssignedTo: "Chris", Cost: "100 GBP", Supplier: "Dell"},
			{id: 3, AssetId: "SHD-002323", AssetName: "Monitor", PurchasedDate: "10 Jun 2018", DamagedDate: "10 Jun 2018", AssignedDate: "09 Jun 2018", AssignedTo: "Chris", Cost: "100 GBP", Supplier: "Dell"},
			{id: 4, AssetId: "SHD-002323", AssetName: "Monitor", PurchasedDate: "10 Jun 2018", DamagedDate: "10 Jun 2018", AssignedDate: "09 Jun 2018", AssignedTo: "Chris", Cost: "100 GBP", Supplier: "Dell"},
			{id: 5, AssetId: "SHD-002323", AssetName: "Monitor", PurchasedDate: "10 Jun 2018", DamagedDate: "10 Jun 2018", AssignedDate: "09 Jun 2018", AssignedTo: "Chris", Cost: "100 GBP", Supplier: "Dell"},
			{id: 6, AssetId: "SHD-002323", AssetName: "Monitor", PurchasedDate: "10 Jun 2018", DamagedDate: "10 Jun 2018", AssignedDate: "09 Jun 2018", AssignedTo: "Chris", Cost: "100 GBP", Supplier: "Dell"},
			{id: 7, AssetId: "SHD-002323", AssetName: "Monitor", PurchasedDate: "10 Jun 2018", DamagedDate: "10 Jun 2018", AssignedDate: "09 Jun 2018", AssignedTo: "Chris", Cost: "100 GBP", Supplier: "Dell"},
			{id: 8, AssetId: "SHD-002323", AssetName: "Monitor", PurchasedDate: "10 Jun 2018", DamagedDate: "10 Jun 2018", AssignedDate: "09 Jun 2018", AssignedTo: "Chris", Cost: "100 GBP", Supplier: "Dell"},
			{id: 9, AssetId: "SHD-002323", AssetName: "Monitor", PurchasedDate: "10 Jun 2018", DamagedDate: "10 Jun 2018", AssignedDate: "09 Jun 2018", AssignedTo: "Chris", Cost: "100 GBP", Supplier: "Dell"}
		];
		
		model.$onInit = function() {
			$scope.showAllAssets = true;
			$scope.viewAssetDetails = false;
			$scope.toggleUpdate = true;
			$scope.assetAddition = false;
			$scope.assetIndex = 0;
		}
		
		$scope.assetsListUpdated = function() {
			localStorage.setItem('assetsListUpdated', JSON.stringify($scope.listOfAssets));
		}
		$scope.$watch('listOfAssets', $scope.assetsListUpdated, true);

		$scope.backToTableView = function() {
			model.$onInit();
		}
		// model.getListAssets = function() {
		// 	appService.getAssetsList().then(function(response){
		// 		$scope.listOfAssets = response;
		// 		console.log($scope.listOfAssets)
		// 	})
		// }

		$scope.addAsset = function() {
			$scope.assetAddition = true;
			$scope.viewAssetDetails = true;
			$scope.showAllAssets = false;
			$scope.toggleUpdate = false;
			$scope.assetDetails = {};
			$scope.assetIndex = $scope.listOfAssets.length;
			$scope.listOfAssets.push({AssetId: '',PurchasedDate: '',AssignedTo: '',Cost: '',Supplier: '',AssetName: ''});
		}

		$scope.viewAllAssets = function() {
			$scope.showAllAssets = false;
		}

		$scope.viewAsset = function(id, isUpdate) {
			$scope.viewAssetDetails = true;
			var service = appService.getAssetDetails(id, $scope.listOfAssets);
			$scope.assetDetails = service[0];
			$scope.assetIndex = service[1];
			if (isUpdate)
				$scope.toggleUpdate = false;
			else
				$scope.toggleUpdate = true;
		}

		$scope.updateAsset = function() {
			$scope.toggleUpdate = false;
		}

		$scope.saveAsset = function() {
			var object = $scope.assetDetails;
			var valid = object.AssetId && object.PurchasedDate && object.AssignedTo && object.Cost && object.Supplier && object.AssetName;
			if (valid)
			{
				$scope.listOfAssets[$scope.assetIndex].AssetId = $scope.assetDetails.AssetId;
				$scope.listOfAssets[$scope.assetIndex].PurchasedDate = $scope.assetDetails.PurchasedDate;
				$scope.listOfAssets[$scope.assetIndex].AssignedTo = $scope.assetDetails.AssignedTo;
				$scope.listOfAssets[$scope.assetIndex].Cost = $scope.assetDetails.Cost;
				$scope.listOfAssets[$scope.assetIndex].Supplier = $scope.assetDetails.Supplier;
				$scope.listOfAssets[$scope.assetIndex].AssetName = $scope.assetDetails.AssetName;
				$scope.showAllAssets = false;
				$scope.viewAssetDetails = false;
				$scope.assetAddition = false;
			}
		}

		$scope.deleteAsset = function(index) {
			$scope.listOfAssets.splice(index == 0 || index ? index : $scope.assetIndex, 1);
			$scope.showAllAssets = false;
			$scope.viewAssetDetails = false;
			$scope.assetAddition = false;
		}
	})
}());