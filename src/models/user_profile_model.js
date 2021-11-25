const user_model = require('./user_model');

module.exports.create_user = async function (user_id, email, password, rjwt_hash) {
    try {
        return await user_model.create({ user_id: user_id, email: email, password: password, rjwt: rjwt_hash });
    } catch (error) {
        console.error(error);
    }
}

module.exports.get_profile_data = async function (field, value) {
    try {
        //retrieve data from DB
        return await user_model.
            findOne({ [field]: value }).
            select({ email: 1, password: 1, username: 1, user_id: 1, timestamp: 1 }).
            lean();
    } catch (error) {
        console.log(error);
    }
}

module.exports.update_profile_data = async function (field, field_data, key, value) {
    try {
        return await user_model.updateOne({[key]: value}, {[field]: field_data}, {runValidators: true});
    } catch (error) {
        console.log(error);

    }
}