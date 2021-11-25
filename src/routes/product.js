const product_controller = require('../controller/product.controller');
const base_response = require('./base_response');
const router = require('express').Router();
const multer_helper = require('../utils/multer_helper');
const uploads = multer_helper.multi_upload();


module.exports.create = router.post('', uploads.array('product_images', 4), async (req, res) => {
    try {

        let data = await product_controller.create_product(req.body, req.files);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});

module.exports.update = router.put('', async (req, res) => {
    try {

        let data = await product_controller.update_product(req.body);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});

module.exports.delete = router.delete('', async (req, res) => {
    try {
        let data = await product_controller.delete_product(req.body);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});

module.exports.view = router.get('', async (req, res) => {
    try {
        let data = await product_controller.view_products(req.query, req.header('Authorization'));
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});

module.exports.create_random = router.post('/auto_gen', async (req, res) => {
    try {
        let data = await product_controller.create_random(req.body);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});