const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const pg = require('pg');

import login from './controllers/login';
import register  from './controllers/register';
import getSession from './controllers/getSession';
import destroySession from './controllers/destroySession';

import User from './User';

const conString = "postgres://postgres:admin@localhost:5432/holocoin";
const client = new pg.Client(conString);
client.connect();

const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

const app = express();
const port = 3500;

let users: Array<User> = new Array<User>();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'rpi1824',
    resave: true,
    name: 'sage_session',
    saveUninitialized: true,
    cookie: { },
    store: new RedisStore({ client: redisClient })
}));

app.post('/api/login', (req: any, res: any) => {
    login(req, res, users);
});

app.post('/api/register', (req: any, res: any) => {
    register(req, res, users);
});

app.get('/api/getSession', (req: any, res: any) => {
    getSession(req, res);
});

app.get('/api/destroySession', (req: any, res: any) => {
    destroySession(req, res);
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
