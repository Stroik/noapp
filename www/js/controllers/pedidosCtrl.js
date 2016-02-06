var noapp = angular.module('noapp.controllers');

noapp.controller('PedidosCtrl', function($scope, $rootScope, Pedidos, $firebaseArray, $firebaseObject, $ionicModal, ionicToast, $state, $timeout, $window) {

   /* Modals */
   $ionicModal.fromTemplateUrl('templates/nuevo-pedido.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/editar-pedido.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.editar = modal;
    });

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    /* Pedido */
    $scope.pedido = {};
    $scope.pedido.cliente = {};
    $scope.pedido.productos = $rootScope.$watch('productos', function(){
        $scope.pedido.productos = $rootScope.productos;
    });
    $scope.pedido.vendedor = 'Dionicio Longobardi';
    $scope.pedido.procesado = false;
    $scope.pedido.fecha = $rootScope.getDateTime();
    
    var list = Pedidos.all();
    
    /* Funciones para gestionar pedidos */
    $scope.enviarPedidos = function(){
        Pedidos.send();
    };

    $scope.nuevoPedido = function(){
        $state.go('app.clientes');
    }

    $rootScope.agregarPedido = function(pedido){
        console.log($rootScope.productos);
        if(pedido){
            console.log($scope.pedido);
            if(pedido.productos == undefined){
                console.log('necesito productos!');
            }else{
                list.$add($scope.pedido).then(function(data) {
                    console.log($scope.pedido);
                    var id = ref.key();
                    list.$indexFor(id);
                    $scope.modal.hide();
                    $scope.pedido = {};
                    $rootScope.productos = [];
                });

            }
        }else{
            ionicToast.show('Debes completar todos los campos', 'middle', true, 2000);
        }
    };

    $scope.setCliente = function(index){
        console.log(listClientes[index]);
        $scope.pedido.cliente = listClientes[index];
    };
    
    $scope.myID = null;
    $scope.saveEdit = function(index){
        list[index].ultima_edicion = fechaHora;
        list.$save(index).then(function(ref) {
          ref.key() === list[index].$id;

        });
        $scope.editar.hide();
    };

    $scope.showNuevoPedido = function(index){
        $scope.modal.show();
        $scope.leproduct = $rootScope.productos;
    };
    

    $scope.showEdit = function(index){
        $scope.pedidos = list[index].productos;
        $scope.cliente = list[index].cliente;
        $scope.fecha = list[index].fecha;
        $scope.editar.show();
        $scope.myID = index;
        $scope.myIndex = list[index].$id;
    }
    
    $scope.delProduct = function(item){
        var confirmar = confirm('¿Estas seguro que deseas eliminar el producto?');
        if(confirmar){
            listp.$remove(item).then(function(ref) {
              ref.key() === item.$id;
              console.log($scope.pedidos);
            });
        }
    }

    $scope.pedidoSinProductos = function(){
        $scope.modal.hide();
        $timeout(function(){
            $state.go('app.productos');
        },500);
    }


})

noapp.controller('PedidosEditCtrl', function($scope, $rootScope, Pedidos, $ionicModal, ionicToast, $stateParams, $localStorage) {
    var id = $stateParams.pedidoId;
    var pedidos = $localStorage.pedidos;
    var pedido = pedidos[id];
    var productos = pedidos[id].productos;

    $scope.pedido = pedido;
    $scope.delProducto = function(item){
        var index = productos.indexOf(item);
        productos.splice(index, 1);
    };
    $scope.removePedido = function(item){
        if(item){
            var siono = confirm('¿Estás seguro que querés borrar TODO el pedido?');
            if(siono){
                Pedidos.del(item);
                window.history.back();
            }
        }
    };
    console.log($localStorage);
})