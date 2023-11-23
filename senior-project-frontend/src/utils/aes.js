import CryptoJS from 'crypto-js'
export default{
    generateRandomKey(length) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomKey = '';
        
        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomKey += charset.charAt(randomIndex);
        }
        
        return randomKey;
    },
    //AES加密
    encryptAes (data, aesKey) {
        if (aesKey && data) {
        const key = CryptoJS.enc.Utf8.parse(aesKey);
        const encrypt = CryptoJS.AES.encrypt(data, key, {
            iv : CryptoJS.enc.Utf8.parse(aesKey.substr(0, 16)),
            mode : CryptoJS.mode.ECB,
            padding : CryptoJS.pad.Pkcs7
        });
        return encrypt.toString()
        }

    },
    //AES解密
    decryptAes(data, aesKey){
        if (aesKey && data) {
        const key = CryptoJS.enc.Utf8.parse(aesKey);
        const decrypt = CryptoJS.AES.decrypt(data, key, {
            iv : CryptoJS.enc.Utf8.parse(aesKey.substr(0, 16)),
            mode : CryptoJS.mode.ECB,
            padding : CryptoJS.pad.Pkcs7
        });
        return decrypt.toString(CryptoJS.enc.Utf8)
        }
    }
}