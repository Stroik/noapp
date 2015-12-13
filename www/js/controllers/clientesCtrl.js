var noapp = angular.module('noapp.controllers');

noapp.controller('ClientesCtrl', function($scope, $rootScope, Clientes, $stateParams, $localStorage, $ionicModal, ionicToast, $state) {
    $rootScope.showLoading('Cargando...');

    if($localStorage.clientes.length > 0){
        $rootScope.hideLoading();
    }else{ 
        var cl = Clientes.all();
        cl.$loaded().then(function(){
            cl = cl;
            $rootScope.hideLoading();
        });
        $localStorage.clientes = cl;
        $rootScope.hideLoading();
    }
    $rootScope.pedido = new Object();
})

.controller('ClienteInfoCtrl', function($scope, $rootScope, Clientes, Marcas, Pedidos, $ionicModal, $ionicPopup, ionicToast, $state, $stateParams, $location){

    var idd = $stateParams.clienteId;
    var oneCliente = Clientes.one(idd);
    $scope.dato_cliente =  oneCliente;
    $rootScope.pedido.cliente = $scope.dato_cliente;

    $ionicModal.fromTemplateUrl('templates/nuevo-pedido.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/productos-x-marcas.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalProductos = modal;
    });
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

	$scope.abrirMarcas = function(){
		$scope.modal.show();
	}
    
    var listaProductos = Marcas.all();


    $rootScope.productos = [];
    $scope.productos = listaProductos;
    $scope.productosMarca = [];
    $scope.titulo = '';
    $scope.productosXMarca = function(index){
        $scope.modalProductos.show();
        $scope.titulo = listaProductos[index].marca;
        $scope.productosMarca = listaProductos[index].productos;
    };
    $rootScope.pedido.productos = $rootScope.productos;
    $rootScope.pedido.vendedor = $rootScope.vendedor.first_name +' '+ $rootScope.vendedor.last_name;
    $rootScope.pedido.fecha = $rootScope.getDateTime();
    $rootScope.pedido.procesado = false;
    $rootScope.pedido.codigo = $rootScope.codigoPedido();

    $scope.procesarPedido = function(pedido){
        if(pedido){
            console.log($scope.pedido);
            if(pedido.productos == undefined){
                ionicToast.show('No puedes procesar un pedido sin productos. Noc noc!', 'middle', true, 2000);
            }else{
                $rootScope.pedido.cliente.pedidos = [];
                Pedidos.add($rootScope.pedido);
                $scope.modal.hide();
                $rootScope.productos = new Array();
                $rootScope.pedido = new Object();
                $rootScope.pedido.productos = $rootScope.productos;
                $rootScope.pedido.vendedor = 'Dionicio Longobardi';
                $rootScope.pedido.fecha = $rootScope.getDateTime();
                $rootScope.pedido.procesado = false;
                $rootScope.pedido.codigo = $rootScope.codigoPedido();
                console.log($rootScope);
                window.history.back();
            }
        }else{
            ionicToast.show('Debes completar todos los campos', 'middle', true, 2000);
        }
    }
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
                            return $rootScope.productos.cantidad && $rootScope.productos.cantidad === '';
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
                console.log($rootScope);
            }else{
                console.log('ya agregaste este producto');
            }            
        });

    }
})