"use strict";

const controller = require("./controller");

module.exports = function (app) {
    app.route("/about").get(controller.about);
    app.route("/dice").get(controller.dice);
};
