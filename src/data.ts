const redis = require('redis');
const redisClient = redis.createClient();

const redisCache = redis.createClient();

import { Endpoint } from './interfaces/Endpoint';
import basic from './rest_controllers/basic';

console.log("Data server waiting...");

interface updateDataSchema {
    id:string,
    endpoints: Array<Endpoint>
}

const updateData = (message:string) => {
    const payload:updateDataSchema = JSON.parse(message);
    let promises:Array<Promise<any>> = [];
    payload.endpoints.forEach(endpoint => {
        promises.push(basic(endpoint));
    });
    Promise.all(promises).then(values => {
        redisCache.set(payload.id, JSON.stringify(values), () => {
            redisCache.publish("pushData", JSON.stringify(
                {
                    id: payload.id,
                    data: values
                }
            ));
        });
    }).catch(error => {
        console.log("error: " + error);
    })
}

redisClient.on("message", (channel:string, message: string) => {
    switch(channel) {
        case "updateData":
            updateData(message);
            break;
        default:
    }
});

redisClient.subscribe("updateData");