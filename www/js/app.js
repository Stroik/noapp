var firebaseUrl = 'https://incandescent-fire-5045.firebaseio.com';

angular.module('noapp.controllers', ['ionic']);
angular.module('noapp.services', ['ionic', 'ui.router']);
angular.module('noapp.directives', ['ionic', 'ui.router']);
angular.module('noapp', ['ionic', 'noapp.controllers', 'noapp.services', 'firebase', 'ngStorage', 'ionic-toast'])

.run(function($ionicPlatform, $rootScope, $location, Auth, Clientes, $ionicLoading, $firebaseObject, ionicToast, $localStorage, $state) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  ionic.Platform.fullScreen();

  $rootScope.firebaseUrl = firebaseUrl;

    $rootScope.getDateTime = function() {
      var now     = new Date(); 
      var year    = now.getFullYear();
      var month   = now.getMonth()+1; 
      var day     = now.getDate();
      var hour    = now.getHours();
      var minute  = now.getMinutes();
      var second  = now.getSeconds(); 
      if(month.toString().length == 1) {var month = '0'+month;}
      if(day.toString().length == 1) {var day = '0'+day;}   
      if(hour.toString().length == 1) {var hour = '0'+hour;}
      if(minute.toString().length == 1) {var minute = '0'+minute;}
      if(second.toString().length == 1) {var second = '0'+second;}
      var ampm = hour >= 12 ? 'PM' : 'AM';
      var dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second + ' ' + ampm;   
      return dateTime;
    };

    $rootScope.codigoPedido = function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
  
    $rootScope.showLoading = function(msg){
      $ionicLoading.show({
        template: msg ? msg : 'Cargando...'
      });
    };
    $rootScope.hideLoading = function(){
      $ionicLoading.hide();
    };

    $rootScope.$storage = $localStorage;

    if(!$localStorage.pedidos){
      $rootScope.$storage.pedidos = [];
    }
    if(!$localStorage.clientes){
      $rootScope.$storage.clientes = [];
    }else{
      if($localStorage.clientes.lenght < 1){
        var cl = Clientes.all();
          cl.$loaded().then(function(){
              cl = cl;
          });
          $localStorage.clientes = cl;
          $rootScope.hideLoading();
      }
    }

    Auth.$onAuth(function (authData) {
        if (authData) {
            var ref = new Firebase($rootScope.firebaseUrl).child('users').child(authData.uid);
            var obj = $firebaseObject(ref);
            $rootScope.uid = authData.uid;
            $rootScope.authData = authData;
            $state.go('app.descuentos');
        }
        else {
            $ionicLoading.hide();
            $rootScope.logout();
            $location.path('/login');
        }
    });

    $rootScope.logout = function () {
        $ionicLoading.show({
            template: 'Cerrando sesión'
        });
        Auth.$unauth();
        $location.path('/app/login');
        $ionicLoading.hide();
    }


    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");     
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.descuentos', {
    url: '/descuentos',
    views: {
      'menuContent': {
        templateUrl: 'templates/descuentos.html',
        controller: 'DescuentosCtrl',
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
  })

  .state('app.pedidos', {
      url: '/pedidos',
      views: {
        'menuContent': {
          templateUrl: 'templates/pedidos.html',
          controller: 'PedidosCtrl',
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
    })
  .state('app.pedidos-edit', {
      url: '/pedidos/editar/:pedidoId',
      views: {
        'menuContent': {
          templateUrl: 'templates/pedidos-editar.html',
          controller: 'PedidosEditCtrl',
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
    })
    .state('app.clientes', {
      url: '/clientes',
      views: {
        'menuContent': {
          templateUrl: 'templates/clientes.html',
          controller: 'ClientesCtrl',
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
    })
    .state('app.cliente-info', {
      url: '/cliente/:clienteId',
      views: {
        'menuContent': {
          templateUrl: 'templates/cliente-info.html',
          controller: 'ClienteInfoCtrl',
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
    })

  .state('app.marcas', {
    url: '/marcas',
    views: {
      'menuContent': {
        templateUrl: 'templates/marcas.html',
        controller: 'MarcasCtrl',
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
  })

  .state('app.productos-info', {
    url: '/productos/:marcaId',
    views: {
      'menuContent': {
        templateUrl: 'templates/productos-info.html',
        controller: 'ProductosCtrl',
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