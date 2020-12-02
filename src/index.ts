const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const pg = require('pg');

import login from './controllers/login';
import register  from './controllers/register';
import getSession from './controllers/getSession';
import destroySession from './controllers/destroySession';
import createDashboard from './controllers/createDashboard';
import deleteDashboard from './controllers/deleteDashboard';
import getDashboard from './controllers/getDashboard';
import getDashboards from './controllers/getDashboards';
import getData from './controllers/getData';
import getUser from './controllers/getUser';

const auth = require('../auth.json');
const conString = `postgres://${auth.username}:${auth.password}@localhost:5432/sage`;
const client = new pg.Client(conString);
client.connect();

const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
const redisIO = redis.createClient();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
const port = 3500;

import { handleConnection, pushData } from './socket';

io.on('connection', handleConnection);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Note: cookie must have attribute { secure: true }
// in production
app.use(session({
    secret: 'rpi1824',
    resave: true,
    name: 'sage_session',
    saveUninitialized: true,
    cookie: { },
    store: new RedisStore({ client: redisClient })
}));

app.post('/api/login', (req: any, res: any) => {
    login(req, res, client);
});

app.post('/api/register', (req: any, res: any) => {
    register(req, res, client);
});

app.post('/api/createDashboard', (req: any, res: any) => {
    createDashboard(req, res, client, redisClient);
});

app.post('/api/deleteDashboard', (req: any, res: any) => {
    deleteDashboard(req, res, client, redisClient);
});

app.get('/api/getUser', (req: any, res: any) => {
    getUser(req, res, client);
})

app.get('/api/getSession', getSession);

app.get('/api/destroySession', destroySession);

app.get('/api/getDashboards', (req: any, res: any) => {
    getDashboards(req, res, client);
});

app.get('/api/getDashboard', (req: any, res: any) => {
    getDashboard(req, res, client, redisClient);
});

app.get('/api/getData', (req: any, res: any) => {
    getData(req, res, redisClient);
});

redisIO.on("message", (channel:string, message: string) => {
    switch(channel) {
        case "pushData":
            pushData(message, io);
            break;
        default:
    }
});

redisIO.subscribe("pushData");

server.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
