const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.post('/', insert);

// functions
function list(req, res, next) {
    controller.list()
        .then(data => {
            response.success(req, res, data, 200);
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

module.exports = router;