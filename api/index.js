const express = require('express'); // importamos express para crear el servidor
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/post/network');

const errors = require('../network/errors');

const app = express(); // creamos el servidor
app.use(bodyParser.json()); // para que el servidor pueda entender el formato json

// ROUTER
app.use('/api/user', user); // cada vez que se haga una petición a /api/user, se va a ejecutar el router que se encuentra en ./components/user/network.js
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errors); // middleware para manejar los errores

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});