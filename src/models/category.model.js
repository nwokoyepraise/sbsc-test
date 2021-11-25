const mongoose = require('mongoose');
const mongo_conn = require('../config/mongo_config');
const schema = mongoose.Schema;

const category = new schema({
    user_id: {
        type: String,
        required: true,
        ref: "User",
    },
    category_id: {
        type: String,
        required: true,
        unique: true,
        ref: "Product",
    },
    title: {
        type: String,
        required: true,
        default: ""
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    product_count: {
        type: Number,
        required: true,
        default: 0
    },

}, {
    timestamps: true,
});

module.exports = mongo_conn.model("category", category, "category");