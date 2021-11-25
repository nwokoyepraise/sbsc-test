const mongoose = require('mongoose');

const product = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
    },
    cover_image: {
        type: Object,
        default: {}
    },
    images: {
        type: [Object],
        default: []
    },
    title: {
        type: String,
        default: ""
    },
    categories: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    colours: {
        type: [String],
        default: []
    },
    sizes: {
        type: [String],
        default: []
    },
    
}, {
    timestamps: true,
});

module.exports = mongoose.model("product", product, product);