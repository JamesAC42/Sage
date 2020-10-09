"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var redis = require('redis');
//const pg = require('pg');
var login_1 = __importDefault(require("./controllers/login"));
var register_1 = __importDefault(require("./controllers/register"));
var getSession_1 = __importDefault(require("./controllers/getSession"));
var destroySession_1 = __importDefault(require("./controllers/destroySession"));
var auth = require('../auth.json');
var conString = "postgres://" + auth.username + ":" + auth.password + "@localhost:5432/sage";
var client = new pg.Client(conString);
client.connect();
var RedisStore = require('connect-redis')(session);
var redisClient = redis.createClient();
var app = express();
var port = 3500;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Note: cookie must have attribute { secure: true }
// in production
app.use(session({
    secret: 'rpi1824',
    resave: true,
    name: 'sage_session',
    saveUninitialized: true,
    cookie: {},
    store: new RedisStore({ client: redisClient })
}));
app.post('/api/login', function (req, res) {
    login_1.default(req, res, client);
});
app.post('/api/register', function (req, res) {
    register_1.default(req, res, client);
});
app.get('/api/getSession', getSession_1.default);
app.get('/api/destroySession', destroySession_1.default);
app.listen(port, function () {
    console.log("Listening at port " + port);
});
