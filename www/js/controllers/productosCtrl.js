var noapp = angular.module('noapp.controllers');

noapp.controller('ProductosCtrl', function($scope, $rootScope, Marcas, $ionicPopup, ionicToast, $localStorage, $stateParams){
    var index = $stateParams.marcaId;
    var todas = Marcas.all();
    $scope.marcas = todas[index];
    $scope.titulo = todas[index].marca;

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
                    type: 'button-assertive',
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