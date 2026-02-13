const express = require('express');

const secure = require('./secure');

const response = require('../../../network/response');
const controller = require('./index');
//const controller = require('./controller');

const router = express.Router(); // el router es un objeto que nos permite manejar las rutas de nuestra aplicación, es como un mini servidor dentro de nuestro servidor principal, nos permite manejar las rutas de una manera más organizada y modularizada, cada vez que se haga una petición a /api/user, se va a ejecutar el router que se encuentra en ./components/user/network.js

// Routes
router.get('/', list)
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', following);
router.get('/:id', get);
router.post('/', insert);
router.put('/', secure('update'), update);
router.delete('/:id', remove);

// Internal functions
function list(req, res, next) {
    controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
        /*
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
        */    
}

function get(req, res, next) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);    
}

function insert(req, res, next) {
    controller.insert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);    
}

function update(req, res, next) {
    controller.update(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);    
}

function remove(req, res, next) {
    controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch(next);}

function follow(req, res, next) {
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function following(req, res, next) {
	return controller.following(req.params.id)
		.then( (data) => {
			return response.success(req, res, data, 200);
		})
		.catch(next);
}

module.exports = router;

/*
router.get('/', function (req, res) {
    controller.list()
        .then((lista) => { // el controller.list() es una función que devuelve una promesa, por eso utilizamos el .then() para manejar la respuesta de la promesa, si la promesa se resuelve correctamente, se ejecuta la función que recibe la lista de usuarios como parámetro, y si la promesa se rechaza, se ejecuta la función que recibe el error como parámetro.
            response.success(req, res, lista, 200);
        })
        .catch((err) => { // el .catch() es una función que se ejecuta cuando la promesa se rechaza, recibe el error como parámetro, y en este caso, utilizamos la función response.error() para enviar una respuesta de error al cliente, con el mensaje del error y un código de estado 500.
            response.error(req, res, err.message, 500);
        });    
});

router.get('/:id', function (req, res) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });    
});


router.get("/upsert/:id/:name", (req, res) => {
    controller.upsert(req.params.id, req.params.name)
        .then((user) => {
            response.success(req, res, user, 200)
        }).catch(err => {
            response.error(req, res, err.message, 500)
        })
})

router.get('/delete/:id', function (req, res) {
    controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
});
*/