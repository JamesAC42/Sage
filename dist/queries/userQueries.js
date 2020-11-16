"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userQueries = {
    createUser: "INSERT INTO users(id, first_name, last_name, username, password, email, created_on, verified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    findUser: "SELECT id, password FROM users WHERE username = $1",
    findEmail: "SELECT id FROM users WHERE email = $1",
    findUsername: "SELECT username FROM users WHERE id = $1",
    getUser: "SELECT first_name, last_name, username, email, created_on, verified FROM users WHERE id = $1"
};
exports.default = userQueries;
