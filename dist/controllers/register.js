"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcrypt');
var uuid = require('uuid').v4;
var validateEmail_1 = __importDefault(require("../validateEmail"));
var userQueries_1 = __importDefault(require("../queries/userQueries"));
var register = function (req, res, db) {
    var _a = req.body, firstname = _a.firstname, lastname = _a.lastname, username = _a.username, email = _a.email, password = _a.password, passwordConfirm = _a.passwordConfirm;
    if (password !== passwordConfirm) {
        res.send({
            success: false,
            error: 'Passwords do not match'
        });
        return;
    }
    if (!validateEmail_1.default(email)) {
        res.send({
            success: false,
            error: 'Invalid email address'
        });
        return;
    }
    var findQuery = {
        name: 'find-user',
        text: userQueries_1.default.findUser,
        values: [username]
    };
    var findEmailQuery = {
        name: 'find-email',
        text: userQueries_1.default.findEmail,
        values: [email]
    };
    db.query(findQuery)
        .then(function (r) {
        if (r.rows.length > 0) {
            res.send({
                success: false,
                error: 'Account with that username already exists.'
            });
            return;
        }
        db.query(findEmailQuery)
            .then(function (r) {
            if (r.rows.length > 0) {
                res.send({
                    success: false,
                    error: 'Account with that email already exists.'
                });
                return;
            }
        })
            .catch(function (err) {
            console.log('FIND EMAIL');
            console.log(err);
            res.send({
                success: false,
                error: 'Error processing input'
            });
            return;
        });
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                var id = uuid();
                var insertQuery = {
                    name: 'create-user',
                    text: userQueries_1.default.createUser,
                    values: [
                        id,
                        firstname,
                        lastname,
                        username,
                        hash,
                        email,
                        new Date(),
                        0
                    ]
                };
                db.query(insertQuery)
                    .then(function (r) {
                    req.session.key = id;
                    res.send({
                        success: true
                    });
                    return;
                })
                    .catch(function (err) {
                    console.log(err);
                    res.send({
                        success: false,
                        error: 'Error creating user'
                    });
                    return;
                });
            });
        });
    })
        .catch(function (err) {
        console.log('FIND USER');
        console.log(err);
        res.send({
            success: false,
            error: 'Error processing input'
        });
        return;
    });
};
exports.default = register;
