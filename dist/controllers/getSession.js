"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSession(req, res) {
    console.log("sessionID: " + req.session.id);
    console.log("key: " + req.session.key);
    var loggedout = req.session.key === undefined;
    res.send({ loggedout: loggedout });
}
exports.default = getSession;
