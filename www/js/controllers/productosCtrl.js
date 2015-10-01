var noapp = angular.module('noapp.controllers');

noapp.controller('ProductosCtrl', function($scope, $rootScope, $firebaseArray, $ionicModal, ionicToast, $localStorage){

	$ionicModal.fromTemplateUrl('templates/productos-x-marcas.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    var misProductos = new Firebase($scope.firebaseUrl).child('marcas');
    var listaProductos = $firebaseArray(misProductos);

    $scope.productos = listaProductos;
    $scope.productosMarca = [];
    $scope.titulo = '';
    $scope.productosXMarca = function(index){
    	$scope.modal.show();
    	$scope.titulo = listaProductos[index].marca;
    	$scope.productosMarca = listaProductos[index].productos;
    };
})