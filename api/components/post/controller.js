const { nanoid } = require('nanoid');

const TABLA = 'post';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    async function insert(body) {
        const post = {
            id: nanoid(),
            title: body.title,
            body: body.body,  
            author_id: body.author_id          
        }
            
        return store.insert(TABLA, post);
    } 

    return {
        list,
        insert
    };
}