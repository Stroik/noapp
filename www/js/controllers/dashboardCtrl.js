var noapp = angular.module('noapp.controllers');

noapp.controller('DashboardCtrl', function($scope, $rootScope) {
  $scope.userdata = $rootScope.profileData;
})