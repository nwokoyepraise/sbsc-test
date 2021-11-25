const category_controller = require('../controller/category.controller');
const base_response = require('./base_response');
const router = require('express').Router();

module.exports.create = router.post('',  async (req, res) => {
    try {

        let data = await category_controller.create_category(req.body);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});
