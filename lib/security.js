const CryptoJS = require('crypto-js');
const AesUtil = require('./aes-util.js');
const Config = require('./server-config.js');
var crypto = function () {

    

    encrypt = function( plainText ){

        var keys = Config.getKeys();

        var aesUtil = new AesUtil(keys.keySize, keys.iterationCount);
        var cipherText = aesUtil.encrypt(keys.salt, keys.iv, keys.passphrase, plainText);
        return cipherText;
        
    },
    decrypt = function(notPlainText){

        var keys = Config.getKeys();

        var aesUtil = new AesUtil(keys.keySize, keys.iterationCount);
        var text = aesUtil.decrypt(keys.salt, keys.iv, keys.passphrase, notPlainText);
        return text;
    }


    return {
        encrypt: encrypt,
        decrypt : decrypt
}
}();

exports.crypto = crypto;


