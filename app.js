const express = require('express');

const { auth } = require("express-oauth2-jwt-bearer");

const errorHandler = require('./middleware/errorHandler');

const autenticacion = auth({ 
    audience: 'http://127.0.0.1:3000/libros',
  issuerBaseURL: 'https://dev-s7l7hvi11l3056e8.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const app = express(); 
app.use(express.json());

app.get('/authorized', function (req, res) {
    res.send('API de libros');
});

// Importamos el Router de Libros 
const librosRouter = require('./routes/libros');

app.use('/libros', autenticacion, librosRouter); 
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000'); 

});
