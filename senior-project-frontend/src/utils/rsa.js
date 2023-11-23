/* 产引入jsencrypt实现数据RSA加密 */
import JSEncrypt from 'jsencrypt' // 处理长文本数据时报错 jsencrypt.js Message too long for RSA
/* 产引入encryptlong实现数据RSA加密 */
import Encrypt from 'encryptlong' // encryptlong是基于jsencrypt扩展的长文本分段加解密功能。
 
// 密钥对生成 http://web.chacuo.net/netrsakeypair

/*
// 公钥key
const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD\n' +
  '2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ=='
// 私钥key
const privateKey = 'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA0vfvyTdGJkdbHkB8\n' +
  'mp0f3FE0GYP3AYPaJF7jUd1M0XxFSE2ceK3k2kw20YvQ09NJKk+OMjWQl9WitG9p\n' +
  'B6tSCQIDAQABAkA2SimBrWC2/wvauBuYqjCFwLvYiRYqZKThUS3MZlebXJiLB+Ue\n' +
  '/gUifAAKIg1avttUZsHBHrop4qfJCwAI0+YRAiEA+W3NK/RaXtnRqmoUUkb59zsZ\n' +
  'UBLpvZgQPfj1MhyHDz0CIQDYhsAhPJ3mgS64NbUZmGWuuNKp5coY2GIj/zYDMJp6\n' +
  'vQIgUueLFXv/eZ1ekgz2Oi67MNCk5jeTF2BurZqNLR3MSmUCIFT3Q6uHMtsB9Eha\n' +
  '4u7hS31tj1UWE+D+ADzp59MGnoftAiBeHT7gDMuqeJHPL4b+kC+gzV4FGTfhR9q3\n' +
  'tTbklZkD2A=='
*/
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmyViHY' +
    'Q2Ejv4yxTigRQ26Y6kZ4gzWnVcMaE3EvEQs5pKqxuYWY4Tz8CNB7Wh5kIdPuDsPG' +
    '25xwY9gh7JjqxcnzFTp5udFEbmOPafPSk5U6/PvEtlj3AEQ8jZ3+USwuhj+k9w2/' +
    '5gHELDgAdVV/TLRq9U47f8V34JGfKfby9C/+DsonQf+h+z43XdwSEZy2Oa0EEpn8' +
    'YMAEZl5s5wwyHJgAumMrkNiyQ/7BOv8a8G69iUqw8h+vthnatkRguWMF4Z/EzG3p' +
    'TU2Rfpm6bdxQTi3cGoiaEY93tJpQd2FBxk3H26dP04Ks03CwWWx+2+eDF8tnz5dm' +
    'yNfiFn98yLNw4cvQIDAQAB'

const privateKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBA' +
    'QCbJWIdhDYSO/jLFOKBFDbpjqRniDNadVwxoTcS8RCzmkqrG5hZjhPPwI0HtaHmQ' +
    'h0+4Ow8bbnHBj2CHsmOrFyfMVOnm50URuY49p89KTlTr8+8S2WPcARDyNnf5RLC6' +
    'GP6T3Db/mAcQsOAB1VX9MtGr1Tjt/xXfgkZ8p9vL0L/4OyidB/6H7Pjdd3BIRnLY' +
    '5rQQSmfxgwARmXmznDDIcmAC6YyuQ2LJD/sE6/xrwbr2JSrDyH6+2Gdq2RGC5YwX' +
    'hn8TMbelNTZF+mbpt3FBOLdwaiJoRj3e0mlB3YUHGTcfbp0/TgqzTcLBZbH7b54M' + 
    'Xy2fPl2bI1+IWf3zIs3Dhy9AgMBAAECggEAANZVJDb4GmXBHvTFkCVtcm829elnQ' +
    'DVil6X4vR0Ylk+JLZ6K1kONBHxT29cgFjUEdrgSA6AioNn+GlCo4nXi/hJEaE16W' +
    'IdVa2NGqAwr51wLMUdFjLOcYkfth7wdu3gzlJXkfwYYEK76N8ZSWz99RVa24jpg8' +
    'zvr4qb2M0xm/n3UbMl3ZzZ+dxOHwReLcv1MgFun3yaLS5h0vZsf6uiLJKqKMrRxK' +
    '5e397kLsb+MYDu6bjb0VB952nqWufYylx8eeKLNplGADm7+zaSjBCQ1Y1BGisZLs' +
    'M1Sbf2GyPRg44752vTvmx7703EswzyFaeKBWi9sAyQ9IrQ367D1CVjcwQKBgQDAq' + 
    '0t3vGBZyDZ4lCMiuk4XHFTIyhG4XNI7/jUwyOIGiwqOwLfQY81/4YMnA5nPEveWA' +
    'w6QY80eVptWewhiOf7URuvhwLX5ksLzmpuvo7ueTmz7fRPcHIk805GPuyo65y7Yf' +
    'E+fYL6Ze6ObwWOJz+RYzqY74S7raD9lXLOI25v7cQKBgQDOJJkyulLEVxa9wiEKt' +
    'NsCn8iAlTjzRBYPzie1svp58CqwuTPB1WIq2dDlfXhLjI72Au2YxeO5TA0CiXBYZ' +
    '/wosNYxRg5b7QUqn7rWtIv2AbNc6DxQFkqsj90W+rpMv5mfL1vgpmc0S1c3SiJ3c' +
    'J+6cr1DU+m1MCroXxtguCvYDQKBgDJ/cvtCA1rkz+oQoZjjjb4e7dXmqHhS08Nno' + 
    'FdV/2/Jl43M0yCqV90xpSdfmTud9Ah8ap/LmKJf/rzO6GaeXr0SjZaQ5OEx5yjkF' + 
    '/QUDQOz+Hp90Ou7CvlHVnp+itX/a9bP1iqmt64QqtQS/tzLAUWJfCZrodmPbDZL8' + 
    'r5nGN3xAoGBAMafSOUx1hHL/+NyqzePrv5GSoBqR2dNkRxFfMl73A+lstx4dkArg' +
    '9zZ5odYb5ILqqurgpcTBSpC9r4dAxyLhNEIIjlz0N4N8E5zfSjm6Xxtgw7fzU01T' + 
    'Vobe+FqUBsm+bQBg7tfWk1u0mg5jCAdainR6D55GdQ0xwMCsHRuv//5AoGBALRVM' +
    'dSsvPUr+okzxfUgeemiRSDmXxgpZSjkpGrYoqwQRuExUOBG0RA/d+RMUXFsQxHUO' +
    'gM0XikJ1QpGYca+KndxytxeH87y4s4FSBdOu8nHYKoVS8BBT68W6PftvH7Pv6XGN' +
    'CgnJP/4IjEO/pIFsOsikKfMg1aInS4nO0Wx7Ljw'
 
export default {
    getPublicKey() {
        return publicKey;
    },
    /* JSEncrypt加密 */
    rsaPublicData(data) {
        var jsencrypt = new JSEncrypt()
        jsencrypt.setPublicKey(publicKey)
        // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
        var result = jsencrypt.encrypt(data)
        return result
    },
    /* JSEncrypt解密 */
    rsaPrivateData(data) {
        var jsencrypt = new JSEncrypt()
        jsencrypt.setPrivateKey(privateKey)
        // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
        var result = jsencrypt.decrypt(data)
        return result
    },
    /* 加密 */
    encrypt(data) {
        var encryptor = new Encrypt()
        encryptor.setPublicKey(publicKey)
        // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
        const result = encryptor.encryptLong(data)
        return result
    },
    /* 解密 - PRIVATE_KEY - 验证 */
    decrypt(data) {
        var encryptor = new Encrypt()
        encryptor.setPrivateKey(privateKey)
        // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
        var result = encryptor.decryptLong(data)
        return result
    }
}