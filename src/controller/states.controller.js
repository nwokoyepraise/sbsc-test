const token_handle = require('../utils/token_handle');

module.exports = async function (body) {
    try {
        let user_id = body.user_id,
            jwt = body.jwt,
            states = body.states;

        //check jwt
        let auth = await token_handle.chk_jwt(user_id, jwt);
        if (!auth.status) { return auth }

        //sort states
        states.sort(function (a, b) {
            return b.length - a.length || b.localeCompare(a);  //sort by length, if equal sort by dictionary order
        });

        return { status: true, data: { states: states, state_at_pos: states[14] } };
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}