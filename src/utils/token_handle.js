require('dotenv').config({path: 'src/.env'});
const argon2 = require('argon2');
const mjwt = require('jsonwebtoken');
const crypt_gen = require('../utils/crypt_gen');
const key = process.env.JWTKEY;



module.exports.gen_rjwt = async function () {
    try {
        let rjwt = {};
        const mrjwt = crypt_gen.gen(12);
        const _mrjwt = await argon2.hash(mrjwt);

        rjwt.value = mrjwt;
        rjwt.hash = _mrjwt;

        return rjwt;
    } catch (error) {
        console.error(error);
    }
}

module.exports.hash_password = async function (password) {
    try {
        return await argon2.hash(password);
    } catch (error) {
        console.error(error);
    }
}

module.exports.chk_jwt = async function (user_id, jwt) {
    try {
        var res0 = await mjwt.verify(jwt, key);
        //if (!res0.email_verified) { return { status: false, message: 'Email not verified!' } }
        if (res0.user_id == user_id) {
            return { status: true }
        } else {
            return { status: false, status_code: 401, message: 'JWT and user_id mismatch' }
        }

    } catch (error) {
        console.error(error);
        if (error.name == 'TokenExpiredError') {
            return { status: false, status_code: 406, message: 'TokenExpiredError' }
        }
        return { status: false, status_code: 406, message: 'Not Allowed' }
    }
}

module.exports.gen_jwt = function (user) {
    return mjwt.sign(user, key, { expiresIn: '86400s' });
}

module.exports.get_auth = function (authHeader) {
    let auth;
    if (!authHeader) { return '' }
    auth = authHeader.split(' ')[1];
    return auth;
}