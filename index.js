const express = require('express');
const api = require('./api');
const config = require('./config');
const app = express();


app.use(express.json());
app.use('/api',api);


app.listen(config.port, ()=>{
    console.log("Servidor Iniciado...")
});

