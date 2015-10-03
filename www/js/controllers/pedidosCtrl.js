var noapp = angular.module('noapp.controllers');

noapp.controller('PedidosCtrl', function($scope, $rootScope, $firebaseArray, $firebaseObject, $ionicModal, ionicToast) {
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
    $scope.pedido.cliente = {nombres: "Jimeno Homero", apellidos: "Canteros", cbu: "30340834834530945", numero_cuenta: "z731", moroso: false};
    $scope.pedido.productos = $rootScope.productos;
    $scope.pedido.vendedor = $rootScope.profileData.first_name + ' ' + $rootScope.profileData.last_name;
    $scope.zona = $rootScope.profileData.zona;
    //$scope.pedido.precio_parcial = $scope.pedido.productos.sumar("precio") || 0;
    $scope.pedido.fecha = fechaHora;
    
    var ref = new Firebase($scope.firebaseUrl).child('users').child($rootScope.authData.uid).child('pedidos');
    var list = $firebaseArray(ref);

    var refZonas = new Firebase($scope.firebaseUrl).child('zonas');
    var listZonas = $firebaseArray(refZonas);

    $scope.mispedidos = list.$watch(function(event){
        $scope.mispedidos = list;
    })
    
    $scope.agregarPedido = function(pedido){
        if(pedido){
            console.log($scope.pedido);
            if(pedido.productos == undefined){
                console.log('necesito productos!');
            }else{
                list.$add($scope.pedido).then(function(data) {
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
        $scope.pedidos = list[index].productos;
        $scope.editar.show();
        $scope.myID = index;
        $scope.myIndex = list[index].$id;
        //console.log($scope.myID);
    };
    $scope.saveEdit = function(index){
        list[index].ultima_edicion = fechaHora;
        list.$save(index).then(function(ref) {
          ref.key() === list[index].$id;

        });
        $scope.editar.hide();
    };
    $scope.delProduct = function(index){

        var confirmar = confirm('¿Estas seguro que deseas eliminar el producto?');
        if(confirmar){
            var refProd = new Firebase($scope.firebaseUrl).child('users').child($rootScope.authData.uid).child('pedidos').child($scope.myIndex).child('productos');
            var listp = $firebaseObject(refProd);

            var l = listp;
            console.log(l);
        }
    }

})