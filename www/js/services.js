angular.module('noapp.services', ['firebase'])

.factory("Auth", ["$firebaseAuth", "$rootScope",
	function ($firebaseAuth, $rootScope) {
	        var ref = new Firebase(firebaseUrl);
	        return $firebaseAuth(ref);
	}
])