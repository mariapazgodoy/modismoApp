// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Idioma = mongoose.model('Idioma');

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

// Crear un nuevo método controller para crear nuevos idiomas
exports.create = function(req, res) {
	// Crear un nuevo objeto idioma
	var idioma = new Idioma(req.body);
	// Intentar salvar el idioma
	idioma.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del idioma
			res.json(idioma);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de idiomaes
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de idiomaes
	Idioma.find({}, function(err, idiomas){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(idiomas);
		}
	});
};

// Crear un nuevo método controller que devuelve un idioma existente
exports.read = function(req, res) {
	res.json(req.idioma);
};

// Crear un nuevo método controller que actualiza un idioma existente
exports.update = function(req, res) {
	// Obtener el idioma usando el objeto 'request'
	var idioma = req.idioma;
	// Actualizar los campos idioma
	idioma.nombre = req.body.nombre;

	// Intentar salvar el idioma actualizado
	idioma.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del idioma 
			res.json(idioma);
		}
	});
};

// método controller que borre un idioma existente
exports.delete = function(req, res) {
	// Obtener el idioma usando el objeto 'request'
	var idioma = req.idioma;

	// Usar el método model 'remove' para borrar el idioma
	idioma.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del idioma
			res.json(idioma);
		}
	});
};


exports.idiomaByID = function(req, res, next, id){
	Idioma.findOne({
		_id: id
	}, function(err, idioma){
		if (err) return next(err);
		if (!idioma) return next(new Error('Fallo al cargar el idioma ' + id));
		// Si un idioma es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.idioma = idioma;
		// Llamar al siguiente middleware
		next();
	});
};

