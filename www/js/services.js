var noapp = angular.module('noapp.services', ['firebase']);

noapp.factory("Auth", ["$firebaseAuth", "$rootScope",
	function ($firebaseAuth, $rootScope) {
	        var ref = new Firebase(firebaseUrl);
	        return $firebaseAuth(ref);
	}
]);
noapp.factory("FireObj", ["$firebaseObject", "$rootScope",
	function ($firebaseObject, $rootScope) {
	        var ref = new Firebase(firebaseUrl);
	        return $firebaseObject(ref);
	}
]);

noapp.factory('Clientes', ["$firebaseArray", "$firebaseObject", 
	function($firebaseArray, $firebaseObject){
		var ref = new Firebase(firebaseUrl).child('clientes');
		Clientes = $firebaseArray(ref);
		Clientes.$loaded().then(function(data){
			return Clientes;
		})
		return{
			all: function(){
				return Clientes;
			},
			one: function(id){
				var cliente = $firebaseObject(ref.child(id));
				cliente.$loaded().then(function(data){
					cliente === cliente;
					return cliente;
				}) ;
				return cliente;
			}
		}
	}
]);

noapp.factory('Marcas', ["$firebaseArray", "$firebaseObject", 
	function($firebaseArray){
		var ref = new Firebase(firebaseUrl).child('marcas');
		Marcas = $firebaseArray(ref);
		Marcas.$watch(function(snap){
			Marcas === Marcas;
		})
		return{
			all: function(){
				return Marcas;
			},
			getProducts: function(id){
				var productos = Marcas[id];
				return productos;
			}
		}
	}
]);