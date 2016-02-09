'use strict';

var noapp = angular.module('noapp.controllers');

noapp.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope, ionicToast, $localStorage, $timeout, $window) {

    var ref = new Firebase($scope.firebaseUrl);
    var auth = $firebaseAuth(ref);

    $scope.signIn = function (user) {
        if (user && user.email && user.pwdForLogin) {
            $ionicLoading.show({
                template: '<img src="img/loading.gif" />'
            });
            auth.$authWithPassword({
                email: user.email,
                password: user.pwdForLogin
            }).then(function (authData) {
                $rootScope.authData = authData;
                ref.child("users").child(authData.uid).once('value', function (snapshot) {
                    var val = snapshot.val();
                });
                $state.go('app.escritorio');
                $window.location.reload(false);
                $timeout(function(){
                    $ionicLoading.hide();
                }, 500);
            }).catch(function (error) {
                alert("Ingreso incorrecto:" + error.message);
                $ionicLoading.hide();
            });
        } else
            alert("Debe completar ambos campos");
    }

    /*$scope.createUser = function (user) {
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
                $state.go('app.descuentos');
                $ionicLoading.hide();
                $scope.modal.hide();
            }).catch(function (error) {
                alert("Error: " + error);
                $ionicLoading.hide();
            });
        } else
            alert("Please fill all details");
    }*/
})