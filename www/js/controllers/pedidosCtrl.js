var noapp = angular.module('noapp.controllers');

noapp.controller('PedidosCtrl', function($scope, $rootScope, $firebaseArray, $ionicModal, ionicToast) {
    var d = new Date(),
        dia = (d.getDay()-3),
        mes = (d.getMonth()+1),
        anio = d.getFullYear(),
        hora = d.getHours(),
        minutos =  d.getMinutes(),
        ampm = hora >= 12 ? 'PM' : 'AM',
        fechaHora = dia + '/' + mes + '/' + anio + ' - ' + hora + ':' + minutos + ' ' + ampm;    

    /*Array.prototype.sumar = function (prop) {
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
    $scope.pedido.cliente = {nombres: "Manuel Dario", apellidos: "Canteros", cbu: "30340834834530945", numero_cuenta: "z731", moroso: false};
    $scope.pedido.productos = $rootScope.productos;
    $scope.pedido.vendedor = $rootScope.profileData.first_name + ' ' + $rootScope.profileData.last_name;
    $scope.zona = $rootScope.profileData.zona;
    //$scope.pedido.precio_parcial = $scope.pedido.productos.sumar("precio") || 0;
    $scope.pedido.fecha = fechaHora;
    
    var ref = new Firebase($scope.firebaseUrl).child('users').child($rootScope.authData.uid).child('pedidos');
    var list = $firebaseArray(ref);
    
    $scope.mispedidos = list;
    
    $scope.agregarPedido = function(pedido){
        if(pedido.codigo && pedido.linea){
            console.log($scope.pedido);
            if(pedido.productos == undefined){
                console.log('necesito productos!');
            }else{
                $

                list.$add(pedido).then(function(data) {
                    console.log($scope.pedido);
                    //console.log(data);
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
        list[index].codigo = $scope.pedido.codigo;
        list[index].cantidad = $scope.pedido.cantidad;
        list[index].linea = $scope.pedido.linea;
        list[index].ultima_edicion = fechaHora;
        list.$save(index).then(function(ref) {
          ref.key() === list[index].$id;
          //console.log(ref.key() + ' = ' + list[index].$id);
        });
        $scope.editar.hide();
    };

})