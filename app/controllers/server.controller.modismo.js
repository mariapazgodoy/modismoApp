// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Modismo = mongoose.model('Modismo');

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

// Crear un nuevo método controller para crear nuevos modismos
exports.create = function(req, res) {
	// Crear un nuevo objeto modismo
	var modismo = new Modismo(req.body);
	// Intentar salvar el modismo
	modismo.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del modismo
			res.json(modismo);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de modismos
exports.list = function(req, res) {
	Modismo.find() 
	.populate('pais', 'nombre')
	.exec(function(err, modismos){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(modismos);
		}
	});
};

// Crear un nuevo método controller que devuelve un modismo existente
exports.read = function(req, res) {
	res.json(req.modismo);
};

// Crear un nuevo método controller que actualiza un modismo existente
exports.update = function(req, res) {
	// Obtener el modismo usando el objeto 'request'
	var modismo = req.modismo;

	// Actualizar los campos modismo
	modismo.nombre = req.body.nombre;
	modismo.descuento = req.body.descuento;

	// Intentar salvar el modismo actualizado
	modismo.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del modismo 
			res.json(modismo);
		}
	});
};

// método controller que borre un modismo existente
exports.delete = function(req, res) {
	// Obtener el modismo usando el objeto 'request'
	var modismo = req.modismo;

	// Usar el método model 'remove' para borrar el modismo
	modismo.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del modismo
			res.json(modismo);
		}
	});
};


exports.modismoByNombre = function(req, res, next, _modismo){
	console.log('encontrar id de modismo: '+ _modismo);
	Modismo.findOne({
		modismo: _modismo
	}, function(err, modismo){
		if (err){
			return next(err);
		}
		if (!modismo) {
			req.modismoNombre = _modismo;
		}else{
			// Si un modismo es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
			req.modismo = modismo;
		}
		// Llamar al siguiente middleware
		next();
	});
};
