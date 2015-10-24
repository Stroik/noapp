angular.module('noapp.services')

.factory('Storage', ["$localStorage", "$rootScope", "Clientes", "Pedidos", "Marcas", "Zonas", 
	function($localStorage, $rootScope, Clientes, Pedidos, Marcas, Zonas){
		var clientes = Clientes.all();
		var pedidos = Pedidos.all();
		var marcas = Marcas.all();
		var zonas = Zonas.all();

		return{
			clientes: function(){
				if (typeof clientes[0] !== 'undefined' && clientes[0] !== null) {
					console.log(clientes);
					return $localStorage.clientes.push(clientes);
				}
			},
			pedidos: function(){
				if (typeof pedidos[0] !== 'undefined' && pedidos[0] !== null) {
					return pedidos;
				}	
			},
			marcas: function(){
				if (typeof marcas[0] !== 'undefined' && marcas[0] !== null) {
					return marcas;
				}
			},
			zonas: function(){
				if (typeof zonas[0] !== 'undefined' && zonas[0] !== null) {
					return zonas;
				}
			}
		}
	}
]);