const factorial_controller = require('../controller/factorial.controller');
const router = require('express').Router();
const base_response = require('./base_response');

module.exports = router.post('', async (req, res) => {
    try {
        let data = await factorial_controller(req.body);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});