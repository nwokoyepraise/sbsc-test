const mongoose = require('mongoose');
const mongo_conn = require('../config/mongo_config');
const schema = mongoose.Schema;

const product = new schema({
    user_id: {
        type: String,
        required: true,
        ref: "User",
    },
    product_id: {
        type: String,
        required: true,
        ref: "Product",
    },
    store_id: {
        type: String,
        required: true,
        ref: "Store",
    },
    images: {
        type: [Object],
        required: true,
        default: []
    },
    title: {
        type: String,
        required: true,
        default: ""
    },
    currency: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true,
        default: []
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    colours: {
        type: [String],
        required: true,
        default: []
    },
    sizes: {
        type: [String],
        required: true,
        default: []
    }

}, {
    timestamps: true,
});

module.exports = mongo_conn.model("product", product, "product");