angular.module('noapp.services')

.factory('Pedidos', ["$localStorage", "$rootScope", "$firebaseArray","ionicToast",
	function($localStorage, $rootScope, $firebaseArray, ionicToast){
		Pedidos = $localStorage.pedidos;
		return{
			all: function(){
				return Pedidos;
			},
			add: function(obj){
				Pedidos.push(obj);
			},
			del: function(item){
				var index = Pedidos.indexOf(item);
        		Pedidos.splice(index, 1);
			},
			send: function(){
				$rootScope.showLoading('Sincronizando con la base de datos');
				var refClientes = new Firebase(firebaseUrl).child('clientes');
				//var refUsuario = new Firebase(firebaseUrl).child('users').child($rootScope.uid).child('pedidos');
				angular.forEach(Pedidos, function(value, key){
					var pedido = value;
					var cliente = value.cliente;
					var clienteId = value.cliente.$id;

					var clientePedidos= $firebaseArray(refClientes.child(clienteId).child('pedidos'));
					clientePedidos.$add(pedido).then(function(ref){
						$rootScope.pedido = {};
						$localStorage.pedidos = new Array();
						$rootScope.hideLoading();
						ionicToast.show('Los pedidos se han enviado correctamente al servidor', 'middle', true, 2500);
					}).catch(function(error){
						ionicToast.show('Lo sentimos. No se pudo establecer contacto con el servidor. Intente nuevamente cuando haya conexión.', 'middle', true, 2500);
						$rootScope.hideLoading();
					})
				});
			}
		}
	}
]);