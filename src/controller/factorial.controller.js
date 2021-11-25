const token_handle = require('../utils/token_handle');

module.exports = async function (body) {
    try {
        let user_id = body.user_id,
            jwt = body.jwt;

        //check jwt
        let auth = await token_handle.chk_jwt(user_id, jwt);
        if (!auth.status) { return auth }

        var val = 1;

        for (var i = 2; i <= 13; i++) {
            val = val * i;
        }

        return { status: true, data: { factorial: val } };
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}