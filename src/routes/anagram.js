const anagram_controller = require('../controller/anagram.controller');
const router = require('express').Router();
const base_response = require('./base_response');

module.exports = router.post('', async (req, res) => {
    try {
        let data = await anagram_controller(req.body); console.log(data)
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});