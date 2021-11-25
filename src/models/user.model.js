const mongoose = require('mongoose');
const mongo_conn = require('../config/mongo_config');
const schema = mongoose.Schema;

const user = new schema({
    user_id: {
        type: String,
        unique: true,
        required: [true, 'user_id required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email required']
    },
    password: {
        type: String,
        required: [true, 'password required']
    },
    rjwt: {
        type: String
    },
    timestamp: {
        type: Date,
        default: new Date
    }
});

module.exports = mongo_conn.model('user_profile', user, 'user_profile');