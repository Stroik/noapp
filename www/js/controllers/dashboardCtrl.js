var noapp = angular.module('noapp.controllers');

noapp.controller('DashboardCtrl', function($scope, $rootScope, $firebaseArray, $firebaseObject, $ionicModal, ionicToast, $state, $timeout) {
  $scope.userdata = $rootScope.profileData;

  var ref = new Firebase($scope.firebaseUrl).child('descuentos');
  var list = $firebaseArray(ref);


})

