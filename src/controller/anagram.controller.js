const token_handle = require('../utils/token_handle');

module.exports = async function (body) {
    try {
        let user_id = body.user_id,
            jwt = body.jwt,
            words = body.words;
        //check jwt
        let auth = await token_handle.chk_jwt(user_id, jwt);
        if (!auth.status) { return auth }

        let anagrams = {}
        let data = []

        // iterate through words 

        words.forEach(element => {

            // alphabetize letters
            let letters = element.split('').sort().join('')

            // create key-value pair of alphabetized letters if not exist
            anagrams[letters] = anagrams[letters] || []

            // add word to value of the key which matches its letters
            anagrams[letters].push(element)
        });

        // iterate through anagrams hash keys
        for (let key in anagrams) {
            // add their values as subarrays of the collectedAnagrams array
            data.push(anagrams[key])
        }
        return {status: true, data: data};
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 400, message: "Bad Request" }
    }
}