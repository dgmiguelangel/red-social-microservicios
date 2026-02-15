module.exports = {
    remoteDB: process.env.REMOTE_DB || true,
    api: {
        port: process.env.API_PORT || 3000,        
    },
    post: {
        port: process.env.POST_PORT || 3002,        
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'red_social',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    cacheService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3003,
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-15106.c83.us-east-1-2.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || 15106,
        username: process.env.REDIS_USERNAME || 'default',
        password: process.env.REDIS_PASSWORD || 'MSsRq3BlCZD9eCuCryqDbfOLr3L0buSf',
    }
}