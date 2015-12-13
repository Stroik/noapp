angular.module('noapp.services')

.factory('Usuarios', ["$firebaseArray", "$firebaseObject", "$rootScope", 
	function($firebaseArray, $firebaseObject, $rootScope){
		var ref = new Firebase(firebaseUrl).child('users');
		Usuarios = $firebaseArray(ref);
		return{
			one: function(id){
				var usuario = Usuarios;
				var usuario = _.first(_.filter(Usuarios, { 'uid' : id }));
				return usuario;
			}
		}
	}
]);