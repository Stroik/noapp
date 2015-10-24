angular.module('noapp.services')

.factory('Zonas', ["$firebaseArray", "$firebaseObject", 
	function($firebaseArray, $firebaseObject){
		var ref = new Firebase(firebaseUrl).child('zonas');
		Zonas = $firebaseObject(ref);
		Zonas.$loaded().then(function(data){
			return Zonas;
		})
		return{
			all: function(){
				return Zonas;
			},
			one: function(id){
				var zona = $firebaseObject(ref.child(id));
				zona.$loaded().then(function(data){
					zona === zona;
					return zona;
				}) ;
				return zona;
			},
			add: function(obj){
				Zonas = $firebaseArray(ref);
				Zonas.$add(obj).then(function(){
					var id = ref.key();
					Zonas.$indexFor(id);
				});
			}

		}
	}
]);