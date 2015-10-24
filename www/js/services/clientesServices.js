angular.module('noapp.services')

.factory('Clientes', ["$firebaseArray", "$firebaseObject", "$rootScope", 
	function($firebaseArray, $firebaseObject, $rootScope){
		var ref = new Firebase(firebaseUrl).child('clientes');
		Clientes = $firebaseArray(ref);
		return{
			all: function(){
				return Clientes;
			},
			one: function(id){
				var clientes = Clientes;
				var cliente = _.first(_.filter(Clientes, { '$id' : id }));
				return cliente;
			}
		}
	}
]);