const token_handle = require('../utils/token_handle');

module.exports = async function (body) {
    try {
        let user_id = body.user_id,
            jwt = body.jwt,
            target_value = body.target_value,
            numbers = body.numbers || [];

        //check jwt
        let auth = await token_handle.chk_jwt(user_id, jwt);
        if (!auth.status) { return auth }

        let value_exists;

        //check if number exists in array
        if (numbers.indexOf(target_value) == -1) {
            numbers = [...numbers, target_value];
            value_exists = false;
        }

        value_exists = true;

        //sort numbers
        numbers.sort(function (a, b) {
            return a - b;
        });

        let position = numbers.indexOf(target_value);

        return { status: true, data: { postion: position }, value_exists: value_exists };
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}