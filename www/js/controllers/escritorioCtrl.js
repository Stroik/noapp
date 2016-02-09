var noapp = angular.module('noapp.controllers');

noapp.controller('EscritorioCtrl', function($scope, $rootScope, $ionicModal, ionicToast, $state, $timeout, $localStorage) {
	$scope.$storage = $localStorage;
	$scope.titulo = "Escritorio";
	$scope.menu = [
		{title: "Clientes", link: "app.clientes", icon:"ion-person"},
		{title: "Pedidos", link: "app.pedidos", icon:"ion-android-cart", cantidad: $localStorage.pedidos.length},
		{title: "Lista de precios", link: "app.lista-precios", icon:"ion-cash"},
		{title: "Artículos", link: "app.marcas", icon:"ion-android-list"},
		{title: "Encuestas", link: "app.encuestas", icon:"ion-arrow-graph-up-right"},
		{title: "Objetivos", link: "app.objetivos", icon:"ion-pie-graph"},
		{title: "Enviar", link: "app.enviar-pedidos", icon:"ion-android-sync"}
	];
})

