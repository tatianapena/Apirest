const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../../../config');

let users = [];

router.post('/',(req, res)=>{
    const plainPassword = req.body.password;
	const salt = bcrypt.genSaltSync(config.saltRounds);
	const hash = bcrypt.hashSync(plainPassword, salt);
	
	let id = users.length + 1;
	
    let user = {
		id: id,
		username: req.body.username,
		password: hash
	};
	users.push(user);		
	
    res
    .status(200)
    .send('El usuario: ' + user.username + ', fue creado con el id: ' + id);
});

router.post('/login', (req, res)=>{
    let user = {
		username: req.body.username,
		password: req.body.password
	};
	
    let sw = false;
	let token = '';
	for(var i=0; i<users.length; i++){
		var obj = users[i];
		if(user.username == obj.username && bcrypt.compareSync(user.password, obj.password)){
			token = jwt.sign({username: user.username}, config.tokenKey);
			sw = true;
			break;
		}	
	}	
	
	if(sw){
		res
		.status(200)
		.send('El usuario: ' + req.body.username + ', fue asignado con el token: ' + token);			
	}else{
		res
		.status(500)
		.send('El usuario: ' + req.body.username + ' no pudo iniciar sesión');	
	}
});


module.exports = router;