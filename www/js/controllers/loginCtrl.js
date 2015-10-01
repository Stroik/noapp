'use strict';

var noapp = angular.module('noapp.controllers');

noapp.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope, ionicToast, $localStorage) {
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
})