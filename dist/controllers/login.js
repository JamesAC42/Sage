"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcrypt');
var Login = function (req, res, users) {
    var _a = req.body, username = _a.username, password = _a.password;
    var u = users.find(function (user) { return user.username === username; });
    if (u === undefined) {
        res.send({
            success: false,
            error: 'User not found'
        });
        return;
    }
    bcrypt.compare(password, u.password, function (err, result) {
        if (result) {
            req.session.key = u.id;
            res.send({
                success: true
            });
        }
        else {
            res.send({
                success: false,
                error: 'Username or password was incorrect'
            });
        }
    });
};
exports.default = Login;
