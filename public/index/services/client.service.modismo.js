// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
angular.module('modismoApp').factory('ModismoResource', ['$resource', function($resource) {
  // Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/modismos/:diccionarioId', {
	      diccionarioId: '@diccionarioId'
        }, {
        update: {
            method: 'PUT'
        }
    });
}]);