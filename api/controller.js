"use strict";

var properties = require("../package.json");
var dice = require("../service/dice.js");

var controllers = {
    about: function (req, res) {
        var aboutInfo = {
            name: properties.name,
            version: properties.version,
        };
        res.json(aboutInfo);
    },
    dice: function (req, res) {
        dice.getNumber(req, res, function (err, dist) {
            if (err) res.send(err);
            res.json(dist);
        });
    },
};

module.exports = controllers;
