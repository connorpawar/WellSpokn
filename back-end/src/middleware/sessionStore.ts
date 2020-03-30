//TODO: Is this the best place to put this?
const config = require('config');

export default function getSessionStore(session){
    switch(config.get('SESSION_STORE')){
        case "redis":
            const redisClient = require('redis').createClient({
                password : "redisPassword98765678765676567890987654323456789abc"
            })
            let RedisStore = require('connect-redis')(session)
            return new RedisStore({ client : redisClient });
        case "memory":
            return null; //The default In-Memory one.
    }
}   