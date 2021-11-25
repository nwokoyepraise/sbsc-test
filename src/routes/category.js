const category_controller = require('../controller/category.controller');
const base_response = require('./base_response');
const router = require('express').Router();

module.exports.create = router.post('', async (req, res) => {
    try {

        let data = await category_controller.create_category(req.body);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});

module.exports.update = router.put('', async (req, res) => {
    try {

        let data = await category_controller.update_category(req.body);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});

module.exports.delete = router.delete('', async (req, res) => {
    try {
        let data = await category_controller.delete_category(req.body);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});

module.exports.view = router.get('', async (req, res) => {
    try {
        let data = await category_controller.view_categories(req.query, req.header('Authorization'));
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});

