'use strict';
const Handler = require('./handler');
const fs = require('fs');

module.exports.devtest = function () {
    let req = require('./POKE.json');
    let res = Handler.handler(req);
    console.log("The results are in!", res);
};