angular.module('noapp.services')

.factory('Clientes', ["$firebaseArray", "$firebaseObject", 
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