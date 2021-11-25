const states_controller = require('../controller/states.controller');
const router = require('express').Router();
const base_response = require('./base_response');

module.exports = router.post('', async (req, res) => {
    try {
        let data = await states_controller(req.body);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});