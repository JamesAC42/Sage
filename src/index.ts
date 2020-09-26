const express = require('express');
const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

import validateEmail from './validateEmail';

const app = express();
const port = 3500;

import User from './User';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let users: Array<User> = new Array<User>();
let userCount:number = 0;

let login = require("./controllers/login");
app.post('/login', (req: any, res: any) => {
    login(req, res)
});

let register = require("./controllers/register");
app.post('/register', (req: any, res: any) => {
    register(req, res)
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
