var filename = './config/config-api.json';
var fs = require('fs');

var getKeys = function () {

    if (fs.existsSync(filename)) {

        var configAPI = require(filename);
        var keys = {};

        keys.iterationCount = configAPI.iterationCount;
        keys.keySize = configAPI.keySize;
        keys.iv = configAPI.iv;
        keys.salt = configAPI.salt;
        keys.passphrase = configAPI.passphrase;

        return keys;

    } else {

        var keys = {};

        keys.iterationCount = process.env.ITERATON_COUNT;
        keys.keySize = process.env.KEY_SIZE;
        keys.iv = process.env.IV;
        keys.salt = process.env.SALT;
        keys.passphrase = process.env.PASSPHRASE;

        return keys;

    }


}

module.exports.getKeys = getKeys;
