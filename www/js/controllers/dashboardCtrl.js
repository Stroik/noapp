var noapp = angular.module('noapp.controllers');

noapp.controller('DescuentosCtrl', function($scope, $rootScope, Marcas, Zonas, $firebaseArray, $firebaseObject, $ionicModal, ionicToast, $state, $timeout) {
	$scope.titulo = "Escritorio";
	$rootScope.showLoading('Actualizando base de datos');
	angular.element(document).ready(function () {
        $rootScope.hideLoading();
    });
})

