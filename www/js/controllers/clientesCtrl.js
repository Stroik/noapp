var noapp = angular.module('noapp.controllers');

noapp.controller('ClientesCtrl', function($scope, $rootScope, $firebaseObject, $firebaseArray, $ionicModal, ionicToast, $state) {
    var refClientes = new Firebase($scope.firebaseUrl).child('clientes');
    var listClientes = $firebaseArray(refClientes);

    listClientes.$loaded().then(function(data){
    	$scope.todosLosClientes = listClientes;
    })
    listClientes.$watch(function(){
    	$scope.todosLosClientes = listClientes;
    })

    $scope.clienteDetalle = function(index){
    	if(index != null || index != undefined){
    		$rootScope.dato_cliente = listClientes[index];
    	}
    }
    
})

.controller('ClienteInfoCtrl', function($scope, $rootScope){
	$ionicModal.fromTemplateUrl('templates/nuevo-pedido.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

	$scope.dato_cliente = $rootScope.dato_cliente;

	$scope.abrirMarcas = function(){
		$scope.modal.show();
	}

	$scope.nuevoPedido = function(){

	}
})