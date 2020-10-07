"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userQueries = {
    createUser: "INSERT INTO users(id, username, password, email, created_on, verified) VALUES ($1, $2, $3, $4, $5, $6)",
    findUser: "SELECT id, password FROM users WHERE username = $1",
    findEmail: "SELECT id FROM users WHERE email = $1"
};
exports.default = userQueries;
