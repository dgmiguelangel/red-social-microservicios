const db = {
    'user': [
        { id: '1', name: 'Carlos' },
        { id: '2', name: 'Ana'},
    ],
};

async function list(tabla) { // async es una palabra reservada que se utiliza para declarar una función asíncrona, esto nos permite utilizar la palabra reservada await dentro de la función, lo que nos permite esperar a que una promesa se resuelva antes de continuar con la ejecución del código, esto es útil para evitar el callback hell y para escribir código más limpio y legible.
    return db[tabla];
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}

async function insert(tabla, data) {
    if (!db[tabla]) {
        db[tabla] = [];
    }
    db[tabla].push(data);    
    return;
}

async function update(tabla, data) {   
    const index = db[tabla].findIndex(item => item.id === data.id);
    if(index !== -1){
        db[tabla][index] = data;        
        return;
    }
}

async function remove(tabla, id) {
    let col = await list(tabla);
    db[tabla] = col.filter(item => item.id !== id);
}

async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];
    // return col.filter(item => item[username] === q[username])[0] || null;
    return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    insert,
    update,
    remove,
    query
};

/*
async function upsert(tabla, data) {
    if (!db[tabla]) {
        db[tabla] = [];
    }

    db[tabla].push(data);

    console.log(db);
}
async function upsert(tabla, data) {
    if(data.id){
        const index = db[tabla].findIndex(item => item.id === data.id);
        if(index !== -1){
            db[tabla][index] = data;
            return;
        }
    } else {
        data.id = nanoid();       
        db[tabla].push(data);
        return;
    }
}
*/