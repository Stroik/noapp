var noapp = angular.module('noapp.controllers');

noapp.controller('ProductosCtrl', function($scope, $rootScope, $firebaseArray, $ionicModal, ionicToast, $localStorage){

	$scope.productos = [
		{titulo: 'Producto 01', descripcion: 'Lorem ipsum dolor amet', codigo: 'X02394', stock: true, disponibles: 753, imagen: 'img/ionic.png'},
		{titulo: 'Producto 02', descripcion: 'Lorem ipsum dolor amet', codigo: 'X02395', stock: true, disponibles: 423, imagen: 'img/ionic.png'},
		{titulo: 'Producto 03', descripcion: 'Lorem ipsum dolor amet', codigo: 'X02396', stock: true, disponibles: 235234, imagen: 'img/ionic.png'},
		{titulo: 'Producto 04', descripcion: 'Lorem ipsum dolor amet', codigo: 'X02397', stock: true, disponibles: 2353234, imagen: 'img/ionic.png'},
		{titulo: 'Producto 05', descripcion: 'Lorem ipsum dolor amet', codigo: 'X02398', stock: true, disponibles: 123, imagen: 'img/ionic.png'},
		{titulo: 'Producto 06', descripcion: 'Lorem ipsum dolor amet', codigo: 'X02399', stock: true, disponibles: 54322, imagen: 'img/ionic.png'}
	];
})