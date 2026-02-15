//const store = require('../../../store/dummy');
//const store = require('../../../store/mysql');
//const store = require('../../../store/remote-mysql');
const config = require('../../../config');

let store, cache;
if (config.remoteDB === true) {
    store = require('../../../store/remote-mysql');
    cache = require('../../../store/remote-cache');
} else {
    store = require('../../../store/mysql');
    cache = require('../../../store/redis');
}

const ctrl = require('./controller');

module.exports = ctrl(store, cache);// el controller es una función que recibe el store como parámetro, esto nos permite inyectar el store que queramos, en este caso el dummy, pero en un futuro podríamos inyectar un store real, como una base de datos, esto nos permite tener una arquitectura más flexible y escalable, ya que no estamos acoplados a un store específico, sino que podemos cambiarlo fácilmente sin tener que modificar el código del controller.