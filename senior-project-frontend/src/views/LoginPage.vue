<template>
    <div class="login-container">
        <el-card shadow="never" class="box-card" :body-style="{ padding: 20 }">
        <div class="m-8 text-center">
            <el-text type="primary" :style="{ fontSize: '25px' }" class="my-3">Mindful Journey Website</el-text>

            <el-text tag="h2" class="my-3">Log in</el-text>
            <el-text tag="p" class="text-[#868e96]">
                Don't have an account?
                <el-link type="primary" @click="toSignUp()">Sign up (CWRU students)</el-link>
            </el-text>
            </div>
            <el-form label-position="top">
                <el-form-item label="Case ID">
                    <el-input v-model="user.email" size="large" />
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="user.password" size="large" show-password />
                </el-form-item>
                <div class="flex justify-between mb-2" style="text-align: right;">
                    <el-link type="primary" @click="toResetPassword">Forgot password?</el-link>
                </div>
                <el-button type="primary" size="large" style="width: 100%;" @click="login()">Sign in</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import RSA from '../utils/rsa.js';
import AES from '../utils/aes.js';

export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        login() {
            const toTransmit = this.GetAESkeyAndCipherText();
            axios.post("http://70.42.212.64:8080/login", toTransmit)
            .then(res => {
                console.log(res.data);
                if (res.data == 1) {
                    localStorage.setItem("user_login", JSON.stringify(this.user));
                    const loadingInstance = ElLoading.service({
                        lock: true,
                        text: 'Loading',
                        background: 'rgba(0, 0, 0, 0.7)',
                    });
                    setTimeout(() => {
                        // 模拟加载完成后的操作
                        loadingInstance.close() // 关闭加载状态
                        this.$nextTick(() => {
                            // 在DOM更新后执行操作
                            this.$router.push('/main')
                        })
                    }, 500)
                }
                else if (res.data == -1) {
                    ElMessage.error("This Case email is not registered");
                }
                else if (res.data == -2) {
                    ElMessage.error("Incorrect password")
                }
                
            })
            .catch(error => {
                console.error(error);
                ElMessage.error("Login failed. Please check your email and password!");
            })
        },
        toSignUp() {
            this.$router.push('/signup');
        },
        toResetPassword() {
            this.$router.push('/resetpassword');
        },
        GetAESkeyAndCipherText() {
            //先生成一串随机16位字符串作为AES的秘钥(C)
            const AESkey = AES.generateRandomKey(16);
            console.log("original AES key: " + AESkey);
            //然后使用A使用RSA算法对C进行加密，得到加密后的AES秘钥（D）
            const encryptedAESkey = RSA.encrypt(AESkey);
            console.log("encrpted AES key by RSA public key using encryptlong: " + encryptedAESkey);

            const encryptedAESkey1 = RSA.rsaPublicData(AESkey);
            console.log("encrpted AES key by RSA public key using jsencrypt: " + encryptedAESkey1);
            //将要发送的数据（E）用C使用AES加密，得到密文（F）
            const userString = JSON.stringify(this.user);
            const cipherText = AES.encryptAes(userString, AESkey);
            console.log("original text: " + userString);
            console.log("cipher text: " + cipherText);
            return {encryptedAESkey : encryptedAESkey, cipherText: cipherText}
        },
    },
    mounted() {
        
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
html {
    height: 100%;
}
body {
    height: 100%;
}
.login-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.login-wrapper {
    background-color: #fff;
    width: 358px;
    height: 588px;
    border-radius: 15px;
    padding: 0 50px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.box-card {
    width: 480px;
    background-color: #fff;
    border-radius: 20px;
    height: 410px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.header {
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
}
.input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
}
.input-item:placeholder {
    text-transform: uppercase;
}
.btn {
    text-align: center;
    padding: 10px;
    width: 100%;
    margin-top: 40px;
    background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
    color: #fff;
}
.msg {
    text-align: center;
    line-height: 88px;
}
a {
    text-decoration-line: none;
    color: #abc1ee;
}
</style>