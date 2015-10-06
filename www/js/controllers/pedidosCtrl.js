var noapp = angular.module('noapp.controllers');

noapp.controller('PedidosCtrl', function($scope, $rootScope, $firebaseArray, $firebaseObject, $ionicModal, ionicToast, $state, $timeout) {
    var d = new Date(),
        dia = (d.getDay()-3),
        mes = (d.getMonth()+1),
        anio = d.getFullYear(),
        hora = d.getHours(),
        minutos =  d.getMinutes(),
        ampm = hora >= 12 ? 'PM' : 'AM',
        fechaHora = dia + '/' + mes + '/' + anio + ' - ' + hora + ':' + minutos + ' ' + ampm;    

    /*Array.prototype.sum = function (prop) {
        if(angular.isDefined(prop)){
            var total = 0
            for ( var i = 0, _len = this.length; i < _len; i++ ) {
                total += this[i][prop]
            }
            return total;
        }else{
            return 0;
        }
    }*/

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

    $scope.pedido = {};
    $scope.pedido.cliente = {};
    $scope.pedido.productos = $rootScope.$watch('productos', function(){
        $scope.pedido.productos = $rootScope.productos;
    });
    $scope.pedido.vendedor = $rootScope.profileData.first_name + ' ' + $rootScope.profileData.last_name;
    $scope.zona = $rootScope.profileData.zona;
    $scope.pedido.procesado = false;
    //$scope.pedido.precio_parcial = $scope.pedido.productos.sum("precio") || 0;
    $scope.pedido.fecha = fechaHora;
    
    var ref = new Firebase($scope.firebaseUrl).child('users').child($rootScope.authData.uid).child('pedidos');
    var list = $firebaseArray(ref);
    $scope.pedidosF = list;


    var refZonas = new Firebase($scope.firebaseUrl).child('zonas');
    var listZonas = $firebaseArray(refZonas);

    var refClientes = new Firebase($scope.firebaseUrl).child('clientes');
    var listClientes = $firebaseArray(refClientes);

    $scope.allClientes = listClientes;

    $scope.agregarPedido = function(pedido){
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

    $scope.removePedido = function(item){
        var confirmar = confirm('¿Estas seguro que deseas eliminar el registro?');
        if(confirmar){
            list.$remove(item).then(function(ref) {
              ref.key() === item.$id;
            });
        }
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
        var refProd = new Firebase($scope.firebaseUrl).child('users').child($rootScope.authData.uid).child('pedidos').child($scope.myIndex).child('productos');
        return listp = $firebaseObject(refProd);
    };
    
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

    $scope.$watch('pedido', function(){
        console.log($scope.pedido);
    })
})