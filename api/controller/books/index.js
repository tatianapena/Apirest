const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const router = express.Router();

//Variables
let books = [];
let accessLogStream = fs.createWriteStream('./files/access.log', { flags: 'a' })

const auth = require('./../../middleware/auth');

router.use(morgan('combined', { stream: accessLogStream }))



router.get('/', (req, res)=>{    
	res
	.status(200)
	.send(books);
});

router.post('/', auth, (req, res)=>{   
	let id = books.length + 1;
	
    let book = {
		id: id,
		name: req.body.name,
		author: req.body.author
	};
	books.push(book);		
	
    res
    .status(200)
    .send('El libro: ' + book.name + ', fue creado con el id: ' + id);
});

module.exports = router;