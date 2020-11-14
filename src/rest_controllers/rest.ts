import basic from "./basic"
import odata from "./basic"
import graphql from "./basic"
import rss from "./basic"
import { EndpointTypes } from "../EndpointTypes";

const redis = require('redis');
const session = require('express-session');

const RedisStore = require('connect-redis')(session);
const subscriber = redis.createClient();

const rest = (req:any, res:any, db:any, cache:any) => {
    subscriber.on("message", function(channel: string, message: any) {
        console.log("message: " + message);
        const id = message.dashboard.id;
        const URL = message.dashboard.endpoint.url;
        const type = message.dashboard.endpoint.type;

        if (type === EndpointTypes.Basic) {
            basic(URL, cache);
        }
        if (type === EndpointTypes.GraphQL) {
            graphql(URL, cache);
        }
        if (type === EndpointTypes.ODATA) {
            odata(URL, cache);
        }
        if (type === EndpointTypes.RSS) {
            rss(URL, cache);
        }
    })
    
    subscriber.subscribe("get dashboard");
}

export default rest;