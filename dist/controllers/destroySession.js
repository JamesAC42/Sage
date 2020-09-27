"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var destroySession = function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.send({ success: false });
            console.log("Error destroying session: " + req.session.key);
        }
    });
    res.send({ success: true });
};
exports.default = destroySession;
