<template>
    <!--
    <p>email:</p>
    <input v-model="user.email" placeholder="Type in your email please" />
    <p>password:</p>
    <input v-model="user.password" placeholder="Type in your password please" />
    <button @click="login()">Log in</button>
-->
    <div class="login-container">
        <div class="login-wrapper">
            <div class="header">Login</div>
            <div class="form-wrapper">
                <input v-model="user.email" type="text" name="username" placeholder="email" class="input-item">
                <input v-model="user.password" type="password" name="password" placeholder="password" class="input-item">
                <div class="btn" @click="login()" >Login</div>
            </div>
            <div class="msg">
                Don't have account?
                <a href="#" @click="toSignUp()">Sign up</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
                connection: null
            }
        }
    },
    methods: {
        login() {
            axios.post("http://localhost:8080/login", this.user)
            .then(res => {
                console.log(res.data);
                localStorage.setItem("user_login", JSON.stringify(res.data))
                this.$router.push('/main')
            })
            .catch(error => {
                console.error(error);
                alert("Login failed. Please check your email and password!")
            })
        },
        toSignUp() {
            this.$router.push('/signup')
        }
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