const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const user = require('../user');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        //const data = await store.query(TABLA, { username: username }); 
        const data = await store.query(TABLA, username); 
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    // Generar token;
                    return auth.sign(data)
                } else {
                    throw new Error('Informacion invalida');
                }
            });       
    }

    function list() {
        return store.list(TABLA);
    }

    async function upsert(data, operation) {
        console.log('operation', operation);
        console.log('data', data);

        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        if (operation === 'insert') {
            return store.insert(TABLA, authData);

        } else if (operation === 'update') {
            return store.update(TABLA, authData);
        }   
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }

    return {
        login,
        list,
        upsert,
        remove
    };
};