"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../User"));
var validateEmail_1 = __importDefault(require("../validateEmail"));
var bcrypt = require('bcrypt');
var Register = function (req, res, users, userCount) {
    console.log("register");
    var _a = req.body, username = _a.username, email = _a.email, password = _a.password, passwordConfirm = _a.passwordConfirm;
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
    if (users.find(function (user) { return user.email === email; })) {
        res.send({
            success: false,
            error: 'Account with that email already exists'
        });
        return;
    }
    if (users.find(function (user) { return user.username === username; })) {
        res.send({
            success: false,
            error: 'Account with that username already exists'
        });
        return;
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            var user = new User_1.default(userCount.toString(), username, hash, email);
            users.push(user);
            userCount++;
            res.send({
                success: true
            });
            console.log(users);
        });
    });
};
exports.default = Register;
