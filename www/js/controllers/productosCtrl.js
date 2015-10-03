var noapp = angular.module('noapp.controllers');

noapp.controller('ProductosCtrl', function($scope, $rootScope, $firebaseArray, $ionicModal, ionicToast, $localStorage, $ionicPopup){

	$ionicModal.fromTemplateUrl('templates/productos-x-marcas.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    var misProductos = new Firebase($scope.firebaseUrl).child('marcas');
    var listaProductos = $firebaseArray(misProductos);

    $rootScope.productos = {};

    $scope.productos = listaProductos;
    $scope.productosMarca = {};
    $scope.titulo = '';
    $scope.productosXMarca = function(index){
    	$scope.modal.show();
    	$scope.titulo = listaProductos[index].marca;
    	$scope.productosMarca = listaProductos[index].productos;
    };
    $scope.agregarProducto = function(id){
        var myPopup = $ionicPopup.show({
            template: '<input type="number" ng-model="productos.cantidad">',
            title: '¿Cúantos agregas?',
            subTitle: 'Ingrese la cantidad de productos',
            scope: $rootScope,
            buttons: [
                { 
                    text: 'Cancelar' 
                },
                {
                    text: '<b>Agregar</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$rootScope.productos.cantidad) {
                            e.preventDefault();
                        }else{
                            return $rootScope.productos.cantidad;
                        }
                    }
                },
            ]
        });
        myPopup.then(function(res) {
            var elProducto = $scope.productosMarca[id];
                elProducto.cantidad = res;
            if($rootScope.productos.indexOf(elProducto) == -1 && res != undefined){
                $rootScope.productos.push(elProducto);
            }else{
                console.log('ya agregaste este producto');
            }
            console.log($rootScope.productos);
            
        });

    }
})