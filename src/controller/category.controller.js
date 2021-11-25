const token_handle = require('../utils/token_handle');
const check_for_null = require('../utils/null_undefined_checker');
const category = require('../models/category');
const crypt_gen = require('../utils/crypt_gen');

module.exports.create_category = async function (body) {
    try {
        let user_id = body.user_id,
            jwt = body.jwt,
            category_id = `category-${crypt_gen.gen(20)}`,
            title = body.title,
            description = body.description;

        let obj = {
            user_id: user_id, title: title, description: description
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
        if (!auth.status) { return auth }

        //create category
        let res1 = await category.create_category(user_id, category_id, title, description);

        if (res1 && res1._id) {
            return { status: true, data: { category: res1 } };

        } else { return { status: false, status_code: 500, message: "Unable to create category, please try again later!" } }

    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}