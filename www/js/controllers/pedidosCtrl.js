var noapp = angular.module('noapp.controllers');

noapp.controller('PedidosCtrl', function($scope, $rootScope, $firebaseArray, $ionicModal, ionicToast) {
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
    $scope.pedido.fecha = new Date();
    
    var ref = new Firebase($scope.firebaseUrl).child('users').child($rootScope.authData.uid).child('pedidos');
    var list = $firebaseArray(ref);
    
    $scope.mispedidos = list;
    
    $scope.agregarPedido = function(pedido){
        if(pedido.codigo && pedido.cantidad && pedido.linea){
            list.$add(pedido).then(function(data) {
                //console.log(data);
                var id = ref.key();
                list.$indexFor(id); // returns location in the array
                $scope.modal.hide();
                $scope.pedido = {};
            });
        }else{
            ionicToast.show('Debes completar todos los campos', 'middle', true, 2000);
        }
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
    $scope.showEdit = function(index){
        $scope.editar.show();
        $scope.pedido.codigo = list[index].codigo;
        $scope.pedido.cantidad = list[index].cantidad;
        $scope.pedido.linea = list[index].linea;
        $scope.myID = index;
        //console.log($scope.myID);
    };

    $scope.saveEdit = function(index){
        var ultima_fecha = new Date().getHours()+':'+new Date().getMinutes()+' | '+new Date().getDay()+'/'+new Date().getMonth()+'/'+new Date().getFullYear();
        list[index].codigo = $scope.pedido.codigo;
        list[index].cantidad = $scope.pedido.cantidad;
        list[index].linea = $scope.pedido.linea;
        list[index].ultima_edicion = ultima_fecha;
        list.$save(index).then(function(ref) {
          ref.key() === list[index].$id;
          //console.log(ref.key() + ' = ' + list[index].$id);
        });
        $scope.editar.hide();
    };

})