// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('modismoApp').factory('IdiomaResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/idiomas/:idiomaId', {
            idiomaId: '@_id',
        }, {
        update: {
            method: 'PUT'
        }
    });
}]);