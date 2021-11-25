const router = require('express').Router();
const base_response = require('./base_response');
const user_profile_controller = require('../controller/user_reg.controller');

module.exports = router.post('', async function (req, res) {
    try {
        let body = req.body;

        let data = await user_profile_controller(body);

        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});
