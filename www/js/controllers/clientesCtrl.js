var noapp = angular.module('noapp.controllers');

noapp.controller('ClientesCtrl', function($scope, $rootScope, Clientes, $stateParams, $firebaseObject, $firebaseArray, $ionicModal, ionicToast, $state) {
    var cl = Clientes.all();
    $scope.todosLosClientes = cl;
    $rootScope.pedido = new Object();
    
})

.controller('ClienteInfoCtrl', function($scope, $rootScope, Clientes, Marcas, $ionicModal, $ionicPopup, ionicToast, $state, $stateParams){

    var idd = $stateParams.clienteId;
    var oneCliente = Clientes.one(idd);
    $scope.dato_cliente =  oneCliente;


    function getDateTime() {
        var now     = new Date(); var year    = now.getFullYear(); var month   = now.getMonth()+1; 
        var day     = now.getDate(); var hour    = now.getHours(); var minute  = now.getMinutes();
        var second  = now.getSeconds(); if(month.toString().length == 1) {var month = '0'+month;}
        if(day.toString().length == 1) {var day = '0'+day;}   
        if(hour.toString().length == 1) {var hour = '0'+hour;}
        if(minute.toString().length == 1) {var minute = '0'+minute;}
        if(second.toString().length == 1) {var second = '0'+second;}
        var ampm = hour >= 12 ? 'PM' : 'AM'; 
        var dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second + ' ' + ampm;   
        return dateTime;
    }
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
    $rootScope.pedido.vendedor = $rootScope.profileData.first_name +' '+ $rootScope.profileData.last_name;
    $rootScope.pedido.fecha = getDateTime();
    $rootScope.pedido.procesado = false;
    $rootScope.pedido.zona = $rootScope.profileData.zona;

    $scope.procesarPedido = function(pedido){
        if(pedido){
            console.log($scope.pedido);
            if(pedido.productos == undefined){
                alert('No se puede el pedido porque todavía no has agregado productos');
            }else{
                objcliente.$add($rootScope.pedido).then(function(data) {
                    console.log($rootScope.pedido);
                    var id = refCliente.key();
                    objcliente.$indexFor(id);
                    $scope.modal.hide();
                    $rootScope.productos = new Array();
                    $rootScope.pedido = new Object();
                    $rootScope.pedido.productos = $rootScope.productos;
                    $rootScope.pedido.vendedor = $rootScope.profileData.first_name +' '+ $rootScope.profileData.last_name;
                    $rootScope.pedido.fecha = getDateTime();
                    $rootScope.pedido.procesado = false;
                    $rootScope.pedido.zona = $rootScope.profileData.zona;
                });

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
            }else{
                console.log('ya agregaste este producto');
            }
            console.log($rootScope.productos);
            console.log($rootScope.pedido);
            
        });

    }
})