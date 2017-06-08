// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Diccionario = mongoose.model('Diccionario');

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

// Crear un nuevo método controller para crear nuevos diccionarios
exports.create = function(req, res) {
	// Crear un nuevo objeto diccionario
	var diccionario = new Diccionario(req.body);
	// Intentar salvar el diccionario
	diccionario.save(function(err) {
		if (err) {
			console.log(err);
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del diccionario
			res.json(diccionario);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de diccionarios
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de diccionarios
	Diccionario.find() 
	.populate('modismo', 'modismo')
	.populate('idioma', 'nombre')
	.exec(function(err, diccionarios){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(diccionarios);
		}
	});
};

// Crear un nuevo método controller que devuelve un diccionario existente
exports.read = function(req, res) {
	res.json(req.diccionario);
};

// Crear un nuevo método controller que actualiza un diccionario existente
exports.update = function(req, res) {
	// Obtener el diccionario usando el objeto 'request'
	var diccionario = req.diccionario;
	// Actualizar los campos diccionario
	diccionario.cantidadRecibida = req.body.cantidadRecibida;
	// Intentar salvar el diccionario actualizado
	diccionario.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del diccionario 
			res.json(diccionario);
		}
	});
};

// método controller que borre un diccionario existente
exports.delete = function(req, res) {
	// Obtener el diccionario usando el objeto 'request'
	var diccionario = req.diccionario;

	// Usar el método model 'remove' para borrar el diccionario
	diccionario.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del diccionario
			res.json(diccionario);
		}
	});
};

// middleware para obtener un documento por su id
// usado en las funciones read, update y delete
exports.diccionarioByID = function(req, res, next, id){
	Diccionario.findOne({
		_id: id
	}, function(err, diccionario){
		if (err) return next(err);
		if (!diccionario) return next(new Error('Fallo al cargar el diccionario ' + id));
		// Si un diccionario es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.diccionario = diccionario;
		// Llamar al siguiente middleware
		next();
	});
};



exports.getTraduccionByIdioma = function(req, res, next){
	console.log('traducir '+req.modismo.modismo+' al '+req.idioma.nombre);
	Diccionario.findOne({
		idioma:  req.idioma._id,
		modismo: req.modismo._id
	}, function(err, diccionario){
		if (err) return next(err);
		if (!diccionario) return next(new Error('Fallo al traducir '+req.modismo.modismo+' al '+req.idioma.nombre));
		// Si un diccionario es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.diccionario = diccionario;
		// Llamar al siguiente middleware
		next();
	});
};

