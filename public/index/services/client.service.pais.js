// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('modismoApp').factory('PaisResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/paises/:paisId', {
            paisId: '@_id',
        }, {
        update: {
            method: 'PUT'
        }
    });
}]);