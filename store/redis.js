const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    //url: `redis://${config.redis.username}:${config.redis.password}@${config.redis.host}:${config.redis.port}`
    url: `redis://${config.redis_local.username}:${config.redis_local.password}@${config.redis_local.host}:${config.redis_local.port}`
});

(async () => {
  await client.connect();
  console.log('Conectado a REDIS');
})();

async function list(table){
    const values = await client.get(table);
    return values ? JSON.parse(values) : null;
}

async function get(table, id) {
    const value = await client.get(`${table}_${id}`);
    return JSON.parse(value);
}

async function upsert(table, data){
    let key = table;

    if(data && data.id){
        key = `${table}_${data.id}`;
    }

    await client.setEx(key, 30, JSON.stringify(data));
    return true;
}

module.exports = {
    list,
    get,
    upsert
};