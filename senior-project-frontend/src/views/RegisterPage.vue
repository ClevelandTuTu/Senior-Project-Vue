<template>
    <!--
    <div class="login-container">
        <div class="login-wrapper">
            <div class="header">Sign Up now!</div>
            <div class="form-wrapper">
                <input v-model="user.email" type="text" name="username" placeholder="email" class="input-item">
                <input v-model="user.password" type="password" name="password" placeholder="password" class="input-item">
                <div class="btn" @click="register()" >Sign Up</div>
            </div>
            <div class="msg">
                Already have an account?
                <a href="#" @click="toSignIn()">Sign in</a>
            </div>
        </div>
    </div>
-->
    <div class="login-container">
        <el-card shadow="never" class="box-card" :body-style="{ padding: 20 }">
        <div class="m-8 text-center">
            <el-text type="primary" :style="{ fontSize: '25px' }" class="my-3">Mindful Journey Website</el-text>

            <el-text tag="h2" class="my-3">Sign Up</el-text>
            <el-text tag="p" class="text-[#868e96]">
                Already has an account?
                <el-link type="primary" @click="toSignIn()">Log in (CWRU students)</el-link>
            </el-text>
            </div>
            <el-form label-position="top">
                <el-form-item label="Case ID">
                    <el-input v-model="user.email" size="large" />
                </el-form-item>
                <el-form-item label="Email Verification Code" v-if="!verified">
                    <el-input v-model="code" size="large" style="width: 70%; margin-right: 5%;" />
                    <el-button type="primary" size="large" @click="trySendCode" :disabled="isCoolDown" style="width: 25%;">
                        Send Code
                        <el-text v-if="isCoolDown" tag="i" class="text-[#868e96]">
                            ({{ coolDownSeconds }})
                        </el-text>  
                    </el-button>
                </el-form-item>
                <el-form-item label="Password" v-if="verified">
                    <el-input v-model="user.password" size="large" show-password />
                </el-form-item>
                <br>
                <el-text v-if="!verified" tag="i" class="text-[#868e96]">
                    Please enter you Case ID (ex. abc1234) then press "Send Code"
                </el-text>  
                <el-button v-if="!verified" :disabled="!emailSentOut" type="primary" size="large" style="width: 100%;" @click="VerifyCode()">Verify</el-button>
                <el-button v-if="verified" type="primary" size="large" style="width: 100%;" @click="register()">Register</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import RSA from '../utils/rsa.js';
import AES from '../utils/aes.js';

export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            code: '',
            verified: false,
            coolDownSeconds: 60,
            isCoolDown: false,
            coolDownTimer: null,
            emailSentOut: false,
        }
    },
    methods: {
        register() {
            const toTransmit = this.GetAESkeyAndCipherText(1);
            axios.post("http://70.42.212.64:8080/register", toTransmit)
            .then(res => {
                console.log(res.data);
                if (res.data == 1) {
                    ElMessage({
                        type: 'success',
                        message: 'Registered successfully, please Sign In',
                    });
                    this.$router.push('/');
                }
                else if (res.data == -1) {
                    ElMessage.error("Register failed")
                }
                
            })
            .catch(error => {
                console.error(error);
                ElMessage.error("Resgister failed, please check email address and password!");
            })
        },
        toSignIn() {
            this.$router.push('/');
        },
        trySendCode() {
            if (this.user.email.trim() === '') {
                ElMessage.error("Please enter your Case ID first");
            }
            else {
                this.SendCode();
            }
        },
        SendCode() {
            axios.get("http://70.42.212.64:8080/sendRegEmail/" + this.user.email.trim())
            .then(res => {
                console.log(res.data);
                if (res.data == 1) {
                    ElMessage({
                    type: 'success',
                    message: 'Email send out successfully, please enter the code',
                    });
                    this.emailSentOut = true;
                    // start cooling down
                    this.isCoolDown = true;
                    this.coolDownTimer = setInterval(() => {
                        if (this.coolDownSeconds > 0) {
                            this.coolDownSeconds--;
                        } else {
                            this.StopCoolDown();
                        }
                    }, 1000);
                }
                else if (res.data == -1) {
                    ElMessage.error("This email has been registered");
                }
            })
            .catch(error => {
                console.log(error);
                ElMessage.error("Cannot send out to this address, please check it and try again");
            })
        },
        StopCoolDown() {
            clearInterval(this.coolDownTimer);
            this.isCoolDown = false;
            this.coolDownSeconds = 60;
        },
        formatDateTime(date) {
            const isoString = new Date(date).toISOString(); // 转换为 ISO 格式
            const formattedDateTime = isoString.replace(/\.\d+Z$/, ''); // 格式化字符串
            return formattedDateTime;
        },
        VerifyCode() {
            const userID = this.user.email; // don't forget to change this to ID if database changes
            const originalDate = new Date(); // 使用当前日期和时间，你可以替换为任何日期对象
            const formattedDate = this.formatDateTime(originalDate);
            const verification = {
                id: userID,
                verCode: this.code,
                expiredDate: formattedDate
            };
            console.log(verification)
            axios.post("http://70.42.212.64:8080/verify", verification)
            .then(res => {
                if (res.data == 1) {
                    ElMessage({
                    type: 'success',
                    message: 'Code verified successfully, please enter your password',
                    });
                    this.verified = true;
                }
                else if (res.data == -1) {
                    ElMessage.error("Your code is incorrect");
                }
                else if (res.data == -2) {
                    ElMessage({
                        type: 'warning',
                        message: 'Warning, the code you entered is expired. Please try again',
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        GetAESkeyAndCipherText(num) {
            //先生成一串随机16位字符串作为AES的秘钥(C)
            const AESkey = AES.generateRandomKey(16);
            console.log("original AES key: " + AESkey);
            //然后使用A使用RSA算法对C进行加密，得到加密后的AES秘钥（D）
            const encryptedAESkey = RSA.encrypt(AESkey);
            console.log("encrpted AES key by RSA public key using encryptlong: " + encryptedAESkey);

            const encryptedAESkey1 = RSA.rsaPublicData(AESkey);
            console.log("encrpted AES key by RSA public key using jsencrypt: " + encryptedAESkey1);
            //将要发送的数据（E）用C使用AES加密，得到密文（F）
            let userString;
            if (num == 1) {
                userString = JSON.stringify(this.user);
            }
            else if (num == 2) {
                userString = JSON.stringify(this.user.email.trim());
            }
            const cipherText = AES.encryptAes(userString, AESkey);
            console.log("original text: " + userString);
            console.log("cipher text: " + cipherText);
            return {encryptedAESkey : encryptedAESkey, cipherText: cipherText}
        },
    },
    beforeUnmount() {
        // 组件销毁时清理计时器
        this.StopCoolDown();
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