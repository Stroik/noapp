angular.module('noapp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})
.controller('DashboardCtrl', function($scope, $rootScope) {
  $scope.userdata = $rootScope.profileData;
})
.controller('PedidosCtrl', function($scope, $rootScope, $firebaseArray, $ionicModal, ionicToast) {
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
        $scope.myID = '';
    $scope.showEdit = function(index){
        $scope.editar.show();
        $scope.pedido.codigo = list[index].codigo;
        $scope.pedido.cantidad = list[index].cantidad;
        $scope.pedido.linea = list[index].linea;
        $scope.myID = index;
        console.log($scope.myID);
    };

    $scope.saveEdit = function(index){
        var id = list[index].$id;
        list.$save(id).then(function(ref) {
          ref.key() === list[id].$id; 
        });
        $scope.editar.hide();
    };

})
.controller('VentasCtrl', function($scope, $rootScope) {

})
.controller('ProductosCtrl', function($scope, $rootScope) {

})

.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope, ionicToast, $localStorage) {
    //console.log('Login Controller Initialized');

    var ref = new Firebase($scope.firebaseUrl);
    var auth = $firebaseAuth(ref);

    $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.createUser = function (user) {
        //console.log("Create User Function called");
        if (user && user.email && user.password && user.firstname && user.lastname) {
            $ionicLoading.show({
                template: 'Registrando usuario...'
            });
            user.zona = 'Zona 3';
            auth.$createUser({
                email: user.email,
                password: user.password,
                firs_tname: user.firstname,
                last_name: user.lastname
            }).then(function (userData) {
                //alert("User created successfully!");
                ionicToast.show('Registro exitoso. ¡Bienvenido!', 'middle', false, 2000);
                ref.child("users").child(userData.uid).set({
                    email: user.email,
                    first_name: user.firstname,
                    last_name: user.lastname,
                    picture: 'http://placehold.it/150x150',
                    zona: user.zona
                });
                $state.go('app.dashboard');
                $ionicLoading.hide();
                $scope.modal.hide();
            }).catch(function (error) {
                alert("Error: " + error);
                $ionicLoading.hide();
            });
        } else
            alert("Please fill all details");
    }

    $scope.signIn = function (user) {

        if (user && user.email && user.pwdForLogin) {
            $ionicLoading.show({
                template: 'Ingresando...'
            });
            auth.$authWithPassword({
                email: user.email,
                password: user.pwdForLogin
            }).then(function (authData) {
                //console.log("Logged in as:" + authData.uid);
                ref.child("usuarios").child(authData.uid).once('value', function (snapshot) {
                    var val = snapshot.val();
                    // To Update AngularJS $scope either use $apply or $timeout
                    //$scope.$apply(function () {
                    //    $rootScope.displayName = val;
                    //});
                });
                $ionicLoading.hide();
                $state.go('app.dashboard');
            }).catch(function (error) {
                alert("Ingreso incorrecto:" + error.message);
                $ionicLoading.hide();
            });
        } else
            alert("Debe completar ambos campos");
    }
});
