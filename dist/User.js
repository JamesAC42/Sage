"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, username, password, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.creationDate = Date.now();
    }
    return User;
}());
exports.default = User;
