angular.module('noapp.services', ['firebase'])

.factory("Auth", ["$firebaseAuth", "$rootScope",
	function ($firebaseAuth, $rootScope) {
	        var ref = new Firebase(firebaseUrl);
	        return $firebaseAuth(ref);
	}
])
.factory("FireObj", ["$firebaseObject", "$rootScope",
	function ($firebaseObject, $rootScope) {
	        var ref = new Firebase(firebaseUrl);
	        return $firebaseObject(ref);
	}
])