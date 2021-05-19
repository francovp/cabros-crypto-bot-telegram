const express = require('express');
const bodyParser = require('body-parser');
const { getRoutes } = require('./src/routes');

const app = express();

// Tell express to use body-parser's urlencoded parsing
app.use(bodyParser.urlencoded({	extended:false }));
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());

// Configurar Cabeseras y CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/healthcheck', require('express-healthcheck')());
app.use('/api', getRoutes());

module.exports = app;
