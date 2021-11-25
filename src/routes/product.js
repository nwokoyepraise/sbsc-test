const product_controller = require('../controller/product.controller');
const base_response = require('./base_response');
const router = require('express').Router();
const multer_helper = require('../utils/multer_helper');
const uploads = multer_helper.multi_upload();


module.exports.create = router.post('/create', uploads.array('product_images',  4), async (req, res) => {
 
    try {

        let data = await product_controller.create_product(req.body, req.files);
        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});