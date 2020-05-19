const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('./../../config');

const auth = (req, res, next) => {
	let token = req.header("token");
	let username = req.header("username");
	var decode;	
	try{
		decode = jwt.verify(token, config.tokenKey);
	}catch(ex){
		decode = false;
	}
	
	//Crear el log
	let linea = Date().toString() + " - " + username + " - " + req.path + "\r\n";
	fs.appendFile('./files/audits.log', linea, (err) => {
		if(err){
			console.log("Error en escritura de Archivo");
		}
	});
	
	if(!!decode){
		next();
	} else {
		res
		.status(500)
		.send('Usuario no autorizado');	
	}	
}

module.exports = auth;