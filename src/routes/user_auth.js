const user_auth_controller = require('../controller/user_auth.controller');
const base_response = require('./base_response');
const router = require('express').Router();


module.exports.user_login = router.post('', async (req, res) => {
    try {

        let data = await user_auth_controller.user_login(req.body);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});