angular.module('noapp.services')

.factory('Marcas', ["$firebaseArray", 
	function($firebaseArray){
		var ref = new Firebase(firebaseUrl).child('marcas');
		Marcas = $firebaseArray(ref);
		Marcas.$watch(function(snap){
			Marcas === Marcas;
		})
		return{
			all: function(){
				return Marcas;
			}
		}
	}
]);