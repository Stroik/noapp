angular.module('noapp.services')

.factory("Auth", ["$firebaseAuth", "$rootScope",
	function ($firebaseAuth, $rootScope) {
	        var ref = new Firebase(firebaseUrl);
	        return $firebaseAuth(ref);
	}
]);