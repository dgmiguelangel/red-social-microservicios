const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    url: `redis://${config.redis.username}:${config.redis.password}@${config.redis.host}:${config.redis.port}`
});

client.on('error', (err) => console.error('Redis Client Error: ', err));


let connected = false;

async function connectIfNeeded(){
    if(!connected){
        await client.connect();
        connected = true;
    }
}

async function list(table){
    await connectIfNeeded();
    const data = await client.get(table);
    return data ? JSON.stringify(data) : null;
}

async function upsert(table, data){
    let key = table;
    if(data && data.id){
        key = `${table}_${data.id}`;
    }
    await connectIfNeeded();
    await client.setEx(key, 10, JSON.stringify(data));
    return true;
}

module.exports = {
    list,
    upsert
};