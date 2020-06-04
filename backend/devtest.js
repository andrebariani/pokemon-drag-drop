'use strict';
const Handler = require('./handler');
const fs = require('fs');

module.exports.devtest = function () {
    let req = require('./POKE.json');
    Handler.handler(req).then((res) => {
        fs.appendFileSync('resources/result.JSON', JSON.stringify(res));
    });
};