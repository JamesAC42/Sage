"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var cookieParse = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
var app = express();
var port = 3500;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var users = new Array();
var userCount = 0;
var login = require("./controllers/login");
app.post('/login', function (req, res) {
    login(req, res);
});
var register = require("./controllers/register");
app.post('/register', function (req, res) {
    register(req, res);
});
app.listen(port, function () {
    console.log("Listening at port " + port);
});
