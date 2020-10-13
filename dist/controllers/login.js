"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcrypt');
var userQueries_1 = __importDefault(require("../queries/userQueries"));
var Login = function (req, res, db) {
    var _a = req.body, username = _a.username, password = _a.password;
    var query = {
        name: 'find-user',
        text: userQueries_1.default.findUser,
        values: [username]
    };
    db.query(query)
        .then(function (r) {
        if (r.rows.length === 0) {
            console.log(r.rows);
            res.send({
                success: false,
                error: 'User does not exist'
            });
        }
        else {
            var pw = r.rows[0].password;
            bcrypt.compare(password, pw, function (err, result) {
                if (result) {
                    req.session.key = r.rows[0].id;
                    res.send({
                        success: true
                    });
                }
                else {
                    res.send({
                        success: false,
                        error: 'Password was incorrect'
                    });
                }
            });
        }
    })
        .catch(function (e) {
        console.log(e);
        res.send({
            success: false,
            error: 'User does not exist'
        });
    });
};
exports.default = Login;
