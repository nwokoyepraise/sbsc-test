const multer = require('multer');
const crypt_gen = require('../utils/crypt_gen');
const homedir = require('os').homedir();


module.exports.multi_upload = function () {
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            //set dir
            let mdir;
            switch (file.fieldname) {
                case 'product_images':
                    mdir = `/sbscob/product_images`;
                    break;
            }
            
            cb(null, `${homedir}${mdir}`);
        },
        filename: function (req, file, cb) {
            let filetype;
            //set file type
            switch (file.mimetype) {
                case 'image/png':
                    filetype = '.png'
                    break;
                case 'image/jpeg':
                    filetype = '.jpeg'
                    break;
            }
            cb(null, 'content-' + crypt_gen.gen(20) + filetype);
        }

    });
    let uploads = multer({
        storage: storage, fileFilter: function (req, file, cb) {
            switch (file.fieldname) {
                case 'product_images':
                    if (file.mimetype != 'image/png' && file.mimetype != 'image/jpeg') { return cb(new Error('Wrong file type')); }
                    break;
            }

            cb(null, true);
        }, limits: { fileSize: 1024 * 2000 }
    });
    return uploads;
}

