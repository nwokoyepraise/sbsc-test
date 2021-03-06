const token_handle = require('../utils/token_handle');
const check_for_null = require('../utils/null_undefined_checker');
const fs = require('fs/promises');
const product = require('../models/product');
const crypt_gen = require('../utils/crypt_gen');
const { AsyncParser } = require('json2csv');
let path = require('path');

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

        //check jwt
        let auth = await token_handle.chk_jwt(user_id, jwt);
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

        //check jwt
        let auth = await token_handle.chk_jwt(user_id, jwt);
        if (!auth.status) { return auth }

        let res0 = await product.get_product_details('product_id', product_id);

        if (!res0) {
            return { status: false, status_code: 404, message: "Product not found" }
        }

        if (res0?.user_id !== user_id) {
            return { status: false, status_code: 406, message: "User is not owner of product" }
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

module.exports.delete_product = async function (body) {
    try {
        let user_id = body.user_id,
            product_id = body.product_id,
            jwt = body.jwt;

        //check jwt
        let auth = await token_handle.chk_jwt(user_id, jwt);
        if (!auth.status) { return auth }

        if (!product_id) { return { status: false, status_code: 400, message: "product_id cannot be null" } }

        let res0 = await product.get_product_details('product_id', product_id);

        if (!res0) {
            return { status: false, status_code: 404, message: "Product not found" }
        }

        if (res0?.user_id !== user_id) {
            return { status: false, status_code: 406, message: "User  is not owner of product" }
        }

        //delete product
        let res1 = await product.delete_product('product_id', product_id);

        if (res1 && res1.deletedCount == 1) {
            return { status: true, data: "Product deleted successfully" };
        } else { return { status: false, status_code: 500, message: "Unable to delete product, please try again later!" } }

    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}

module.exports.view_products = async function (query, header) {
    try {
        let user_id = query.user_id,
            page = query.page,
            jwt = token_handle.get_auth(header);

        //check jwt
        let auth = await token_handle.chk_jwt(user_id, jwt);
        if (!auth.status) { return auth }

        let res0 = await product.view_products(page);

        return { status: true, data: res0 };

    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}

module.exports.create_random = async function (body) {
    try {
        let user_id = body.user_id,
            store_id = body.store_id,
            jwt = body.jwt;

        //check jwt
        let auth = await token_handle.chk_jwt(user_id, jwt);
        if (!auth.status) { return auth }

        if (!store_id) { return { status: false, status_code: 400, message: "store_id cannot be null" } }

        for (let i = 0; i < 50; i++) {
            let product_id = `product-${crypt_gen.gen(20)}`;
            await product.create_product(user_id, product_id, store_id, ["content-nZVZWGyYr8tZWnymBjzt.png"], "random title", "electronics", "random description", "1000", "100", ["random colour"], ["random"], "NGN");
        }

        return { status: true, data: { message: "successful" } };

    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}

module.exports.export_csv = async function (query, header) {
    try {
        let user_id = query.user_id,
            jwt = token_handle.get_auth(header);

        //check jwt
        let auth = await token_handle.chk_jwt(user_id, jwt);
        if (!auth.status) { return auth }

        const transformOpts = { highWaterMark: 8192 };

        //fetch all products
        let data = await product.fetch_all();

        //set fields
        let fields = ["user_id", 'product_id', 'store_id', "images", "title", "currency", "categories", "description", "price", "quantity", "colours", "sizes"];
        let opts = { fields };

        const asyncParser = new AsyncParser(opts, transformOpts);

        let csv = '';
        return new Promise(function (resolve, reject) {
            asyncParser.processor
                .on('data', chunk => (csv += chunk.toString()))
                .on('end', async function () {
                    await fs.writeFile(path.join(__dirname, '../output/all_product.csv'), csv);
                    resolve(true);
                })
                .on('error', function (err) {
                    console.error(err);
                    reject(false)
                });

            asyncParser.transform
                .on('error', err => console.log(err));

            data.forEach(function (chunk) {
               asyncParser.input.push(JSON.stringify(chunk));
            });
            asyncParser.input.push(null); // Sending `null` to a stream signal that no more data is expected and ends it.
        });
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}