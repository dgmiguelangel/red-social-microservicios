const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.post('/login', login);
router.get('/', list)
router.delete('/:id', remove);

function login(req, res) {
    controller.login(req.body.username, req.body.password)
        .then((token) => {
            response.success(req, res, token, 200);
        })
        .catch( e => {
            response.error(req, res, 'Informacion invalida', 400);
        });
}

function list(req, res) {
    controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });    
}

function remove(req, res) {
    controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, `Auth ${req.params.id} eliminado`, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

module.exports = router;