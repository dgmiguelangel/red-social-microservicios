//const store = require('../../../store/dummy');
const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore, injectedCache) {
    let store = injectedStore;
    let cache = injectedCache;

    if (!store) {
        store = require('../../../store/dummy');
    }
    if (!cache) {
        cache = require('../../../store/dummy');
    }

    async function list() {
        let users = await cache.list(TABLA);

        if (!users) {
            console.log('No estaba en cache. Buscado en DB')
            users = await store.list(TABLA);
            cache.upsert(TABLA, users);
        } else {
            console.log('Nos traemos datos de cache');
        }
        
        return users;
    }

    /*
    function list() {
        return store.list(TABLA);
    }
    */

    function get(id) {
        return store.get(TABLA, id);
    }

    async function insert(body) {
        const user = {
            id: nanoid(),
            name: body.name,
            username: body.username,            
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            }, 'insert')
        }
            
        return store.insert(TABLA, user);
    }   
    
    async function update(body) {
        const user = {
            id: body.id,
            name: body.name,
            username: body.username           
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            }, 'update')
        }
            
        return store.update(TABLA, user);
    }   

    async function remove(id) {
        await auth.remove(id);
        return store.remove(TABLA, id);
    }

    function follow(from, to) {
        return store.insert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }

    async function following(user) {
        const join = {}
        join[TABLA] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: user };
		
		return await store.query(TABLA + '_follow', query, join);
	}

    return {
        list,
        get,        
        insert,
        update,
        remove,
        follow,
        following
    };
}

/*
function upsert(body) {       
    return store.upsert(TABLA, body);
} 

function upsert(id, name) {
    return store.upsert(TABLA, { id, name });
}
*/
