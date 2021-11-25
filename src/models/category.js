const category_model = require('./category.model');


module.exports.create_category = async function (user_id, category_id, title, description) {
    try {
        return await category_model
            .create({ user_id: user_id, category_id: category_id, title: title, description: description });
    } catch (error) {
        console.error(error);
    }
}