const product_model = require('./product.model');


module.exports.create_product = async function (user_id, product_id, store_id, images, title, categories, description, price, quantity, colours, sizes, currency) {
    try {
        return await product_model
            .create({ user_id: user_id, product_id: product_id, store_id: store_id, images: images, title: title, categories: categories, description: description, price: price, quantity: quantity, colours: colours, sizes: sizes, currency: currency });
    } catch (error) {
        console.error(error);
    }
}

module.exports.update_product = async function (product_id, title, categories, description, price, quantity, colours, sizes, currency) {
    try {
        return await product_model
            .findOneAndUpdate({ product_id: product_id }, { title: title, categories: categories, description: description, price: price, quantity: quantity, colours: colours, sizes: sizes, currrency: currency }, {new: true});
    } catch (error) {
        console.error(error);
    }
}

module.exports.get_product_details = async function (field, value) {
    try {
        //retrieve data from DB
        return await product_model.
            findOne({ [field]: value })
            .lean();
    } catch (error) {
        console.error(error);
    }
}