const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const pg = require('pg');

import login from './controllers/login';
import register  from './controllers/register';
import getSession from './controllers/getSession';
import destroySession from './controllers/destroySession';

const auth = require('../auth.json');
const conString = `postgres://${auth.username}:${auth.password}@localhost:5432/sage`;
const client = new pg.Client(conString);
client.connect();

const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

const app = express();
const port = 3500;

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

app.get('/api/getSession', getSession);

app.get('/api/destroySession', destroySession);

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
