const user_profile_model = require('../models/user_profile_model');
const argon2 = require('argon2');
const token_handle = require('../utils/token_handle');

module.exports.user_login = async function (body) {
    try {
        let email = body.email?.toLowerCase(),
            password = body.password;

        //return if any credential is null
        if (!email || !password) { return { status: false, status_code: 400, message: "Null values not allowed!" } }

        //retrieve credential from DB
        let res0 = await user_profile_model.get_profile_data('email', email);

        //return if user record is not found
        if (!res0 || !res0.email) { return { status: false, status_code: 404, message: "User does not exist" } }

        //unhash and verify password
        if (!(await argon2.verify(res0.password, password))) { return { status: false, status_code: 401, message: "Invalid Credentials!" } }

        //generate new user tokens
        const mrjwt = await token_handle.gen_rjwt();
        const jwt = token_handle.gen_jwt({ user_id: res0.user_id, user_type: 0, email_verified: false });

        let res1 = await user_profile_model.update_profile_data('rjwt', mrjwt.hash, 'user_id', res0.user_id);

        //if successful, return new credentials
        if (res1 && res1.modifiedCount == 1) { return { status: true, data: { user_id: res0.user_id, rjwt: mrjwt.value, jwt: jwt, email_verified: false } } }
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }
}