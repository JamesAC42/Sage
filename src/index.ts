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

app.post('/login', (req: any, res: any) => {
    console.log("login");
    const { 
        username,
        password
    } = req.body;
    const u:User | undefined = 
        users.find(user => user.username === username);
    if(u === undefined) {
        res.send({
            success:false,
            error: 'User does not exist'
        });
        return;
    }
    bcrypt.compare(password, u.password, (err:any, result:any) => {
        if(result) {
            res.send({
                success:true
            })
        } else {
            res.send({
                success:false,
                error: 'Password was incorrect'
            })
        }
    })
});

app.post('/register', (req: any, res: any) => {
    console.log("register");
    const { 
        username,
        email,
        password,
        passwordConfirm
    } = req.body;
    if(password !== passwordConfirm) {
        res.send({
            success:false,
            error: 'Passwords do not match'
        });
        return;
    }
    if(!validateEmail(email)) {
        res.send({
            success:false,
            error: 'Invalid email address'
        });
        return;
    }
    if(users.find(user => user.email === email)) {
        res.send({
            success:false,
            error: 'Account with that email already exists'
        });
        return;
    }
    if(users.find(user => user.username === username)) {
        res.send({
            success:false,
            error: 'Account with that username already exists'
        });
        return;
    }
    bcrypt.genSalt(10, (err:any, salt:any) => {
        bcrypt.hash(password, salt, (err:any, hash:any) => {
            const user:User = new User(
                userCount.toString(),
                username,
                hash,
                email
            );
            users.push(user);
            userCount++;
            res.send({
                success:true
            });
            console.log(users);
        })
    })
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
