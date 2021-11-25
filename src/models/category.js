const category_model = require('./category.model');


module.exports.create_category = async function (user_id, category_id, title, description) {
    try {
        return await category_model
            .create({ user_id: user_id, category_id: category_id, title: title, description: description });
    } catch (error) {
        console.error(error);
    }
}

module.exports.get_category_details = async function (field, value) {
    try {
        //retrieve data from DB
        return await category_model.
            findOne({ [field]: value })
            .lean();
    } catch (error) {
        console.error(error);
    }
}

module.exports.update_category = async function (category_id, title, description) {
    try {
        return await category_model
            .findOneAndUpdate({ cateogry_id: category_id }, { title: title, description: description }, { new: true });
    } catch (error) {
        console.error(error);
    }
}

module.exports.delete_category = async function (field, value) {
    try {
        return await category_model.deleteOne({ [field]: value })
            .lean();
    } catch (error) {
        console.error(error);
    }
}

module.exports.view_categories = async function (page) {
    try {
        return await category_model.find({}, {}, { skip: 10 * page, limit: 10 })
            .lean();
    } catch (error) {
        console.error(error);
    }
}
