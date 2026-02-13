const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    // Middleware para validar el token
    function middleware(req, res, next) {
        switch(action) {
            case 'update':
                const owner = req.body.id;
                auth.check.own(req, owner);
                next();
                break;
                
           case 'follow':
                auth.check.logged(req);
                next();
                break;

            default:
                // Next es para que continue con el siguiente middleware o controlador
                next();
        }
    }

    return middleware;
}