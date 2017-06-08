// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('modismoApp').factory('DiccionarioResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/diccionario/:idiomaId/:modismoNombre', {
            idiomaId:  '@idiomaId',
            modismoNombre: '@modismoNombre'
        }, {
        update: {
            method: 'PUT'
        }
    });
}]);