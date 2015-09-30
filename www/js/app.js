var firebaseUrl = 'https://incandescent-fire-5045.firebaseio.com';
angular.module('noapp', ['ionic', 'noapp.controllers', 'noapp.services', 'firebase', 'ngStorage', 'ionic-toast'])

.run(function($ionicPlatform, $rootScope, $location, Auth, $ionicLoading, FireObj, $firebaseObject, ionicToast, $localStorage) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  //$rootScope vars

  ionic.Platform.fullScreen();

    $rootScope.firebaseUrl = firebaseUrl;

    Auth.$onAuth(function (authData) {
        if (authData) {
            var ref = new Firebase($rootScope.firebaseUrl).child('users').child(authData.uid);
            var obj = $firebaseObject(ref);
            obj.$bindTo($rootScope, 'profileData').then(function(){
              console.log($rootScope.profileData);
            })
            $rootScope.authData = authData;
            //console.log($rootScope.authData);
            $location.path('/app/dashboard');
        } else {
            //console.log("No has iniciado sesión. En caso de no tener cuenta, crea una.");
            $ionicLoading.hide();
            ionicToast.show('Cerrando sessión', 'middle', false, 2000);
            $location.path('/login');
        }
    });

    $rootScope.logout = function () {
        console.log("Logging out from the app");
        $ionicLoading.show({
            template: 'Cerrando sesión'
        });
        Auth.$unauth();
    }


    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
            $localStorage.$reset();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth",
            function (Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
      }]
    }
  })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })

  .state('app.pedidos', {
      url: '/pedidos',
      views: {
        'menuContent': {
          templateUrl: 'templates/pedidos.html',
          controller: 'PedidosCtrl'
        }
      }
    })
    .state('app.ventas', {
      url: '/ventas',
      views: {
        'menuContent': {
          templateUrl: 'templates/ventas.html',
          controller: 'VentasCtrl'
        }
      }
    })

  .state('app.productos', {
    url: '/productos',
    views: {
      'menuContent': {
        templateUrl: 'templates/productos.html',
        controller: 'ProductosCtrl'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth",
                function (Auth) {
                    // $waitForAuth returns a promise so the resolve waits for it to complete
                    return Auth.$waitForAuth();
        }]
        }
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});