var noapp = angular.module('noapp.controllers');

noapp.controller('DashboardCtrl', function($scope, $rootScope, $firebaseArray, $firebaseObject, $ionicModal, ionicToast, $state, $timeout) {
  	$scope.userdata = $rootScope.profileData;
    $ionicModal.fromTemplateUrl('templates/productos-con-descuento.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });  
	var ref = new Firebase($scope.firebaseUrl).child('descuentos');
	var obj = $firebaseObject(ref);

	obj.$loaded().then(function(data){
		$scope.descuentos = data;
	});

	$scope.showDescuentos = function(index, id){
		$scope.modal.show();
		var promocion = $firebaseObject(ref.child(id).child(index));
		var promocionProductos = $firebaseObject(ref.child(id));
		$scope.promocion = promocion;
		$scope.promocionProductos = promocionProductos;
		console.log($scope.promocionProductos);

	};
})

