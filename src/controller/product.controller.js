const token_handle = require('../utils/token_handle');
const check_for_null = require('../utils/null_undefined_checker');
const fs = require('fs/promises');
const product = require('../models/product');
const crypt_gen = require('../utils/crypt_gen');
const user = require('../models/user');

function delete_files(files) {
    files.forEach(async (element) => {
        await fs.unlink(element.path);
    })
}

function get_file_names(files) {
    let product_tag = [];
    files.forEach(element => {
        product_tag.push(element.filename);
    });
    return product_tag;
}

module.exports.create_product = async function (body, files) {
    try {
        let user_id = body.user_id,
            product_id = `product-${crypt_gen.gen(20)}`,
            jwt = body.jwt,
            store_id = body.store_id,
            title = body.title,
            description = body.description,
            categories = body.categories,
            price = body.price,
            quantity = body.quantity,
            colours = body.colours,
            sizes = body.sizes,
            currency = body.currency;

        let obj = {
            user_id: user_id, store: store_id, title: title, categories: categories, price: price, description: description, quantity: quantity, colours: colours, sizes: sizes, currency: currency
        };
        //check for nullity
        let valid = check_for_null(obj);

        //return if any field is null
        if (!valid[0] == true) {
            delete_files(files);
            return { status: false, status_code: 400, message: `'${valid[1]}' field cannot be null!` }
        }

        let auth = await token_handle.chk_jwt(user_id, jwt);
        //check jwt
        if (!auth.status) { delete_files(files); return auth }

        let images = get_file_names(files)

        //create product
        let res1 = await product.create_product(user_id, product_id, store_id, images, title, categories, description, price, quantity, colours, sizes, currency);

        if (res1 && res1._id) {

            return { status: true, data: { product: res1 } };

        } else { return { status: false, status_code: 500, message: "Unable to create product, please try again later!" } }

    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}


module.exports.update_product = async function (body) {
    try {
        let user_id = body.user_id,
            product_id = body.product_id,
            jwt = body.jwt,
            title = body.title,
            description = body.description,
            categories = body.categories,
            price = body.price,
            quantity = body.quantity,
            colours = body.colours,
            sizes = body.sizes,
            currency = body.currency;

        let obj = {
            user_id: user_id, product_id: product_id, jwt: jwt, title: title, categories: categories, price: price, description: description, quantity: quantity, colours: colours, sizes: sizes, currency: currency
        };
        //check for nullity
        let valid = check_for_null(obj);

        //return if any field is null
        if (!valid[0] == true) {
            return { status: false, status_code: 400, message: `'${valid[1]}' field cannot be null!` }
        }

        let auth = await token_handle.chk_jwt(user_id, jwt);

        //check jwt
        if (!auth.status) { return auth }

        let res0 = await product.get_product_details('product_id', product_id);

        if (!res0) {
            return { status: false, status_code: 404, message: "Product not found" }
        }

        if (res0?.user_id !== user_id) {
            return { status: false, status_code: 406, message: "User not owner of product" }
        }

        //update product
        let res1 = await product.update_product(product_id, title, categories, description, price, quantity, colours, sizes, currency);

        if (res1 && res1._id) {
            return { status: true, data: res1 };
        } else { return { status: false, status_code: 500, message: "Unable to update product, please try again later!" } }

    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}