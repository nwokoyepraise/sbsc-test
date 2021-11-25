
const mongoose = require('mongoose');

module.exports = mongoose.createConnection('mongodb://localhost/sbscdb',
    function (err, res) {
        if (!err) {
            console.log('connected to mongo!');
        } else {
            console.log(err);
        }
    });