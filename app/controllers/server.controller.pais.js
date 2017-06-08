// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Pais = mongoose.model('Pais');

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Error de servidor desconocido';
	}
};

// Crear un nuevo método controller para crear nuevos paiss
exports.create = function(req, res) {
	// Crear un nuevo objeto pais
	var pais = new Pais(req.body);
	// Intentar salvar el pais
	pais.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del pais
			res.json(pais);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de paises
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de paises
	Pais.find({}, function(err, paises){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(paises);
		}
	});
};

// Crear un nuevo método controller que devuelve un pais existente
exports.read = function(req, res) {
	res.json(req.pais);
};

// Crear un nuevo método controller que actualiza un pais existente
exports.update = function(req, res) {
	// Obtener el pais usando el objeto 'request'
	var pais = req.pais;
	// Actualizar los campos pais
	pais.nombre = req.body.nombre;

	// Intentar salvar el pais actualizado
	pais.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del pais 
			res.json(pais);
		}
	});
};

// método controller que borre un pais existente
exports.delete = function(req, res) {
	// Obtener el pais usando el objeto 'request'
	var pais = req.pais;

	// Usar el método model 'remove' para borrar el pais
	pais.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del pais
			res.json(pais);
		}
	});
};


exports.paisByID = function(req, res, next, id){
	Pais.findOne({
		_id: id
	}, function(err, pais){
		if (err) return next(err);
		if (!pais) return next(new Error('Fallo al cargar el pais ' + id));
		// Si un pais es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.pais = pais;
		// Llamar al siguiente middleware
		next();
	});
};

