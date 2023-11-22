import CryptoJS from 'crypto-js'
export default{
    //AES加密
    encryptAes (data) {
        const aesKey = 'Oet1IsRCFQ57g0uZ';
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
    decryptAes(data){
        const aesKey = 'Oet1IsRCFQ57g0uZ';
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