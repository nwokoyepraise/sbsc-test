
module.exports = function check_for_null(obj) {
    let obj_entries = Object.entries(obj);
    
    for (let i = 0; i < obj_entries.length; i++) {
        if (!obj_entries[i] || !obj_entries[i][1] || obj_entries[i].length < 2) { return [false, obj_entries[i]] }
    }
    return [true];
}