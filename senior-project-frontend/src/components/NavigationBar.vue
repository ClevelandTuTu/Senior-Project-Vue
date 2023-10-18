<template>
    <!--
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" :class="{ 'live': inPage === 1 }" href="#" @click="toDailyLog()">DailyLog</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="toChatroom()">Chatroom</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ 'live': inPage === 3, 'bold': inPage === 3 }" href="#" @click="toMiniGame()">Mini Game</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="logOut()">Log Out</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    -->
    <ul>
        <li><a href="#" @click="toDailyLog()">DailyLog</a></li>
        <li><a href="#" @click="toChatroom()">Chatroom</a></li>
        <li><a href="#" @click="toMiniGame()">Mini Game</a></li>
        <li><a href="#" @click="logOut()">Log Out</a></li>
    </ul>
    <br>
</template>

<script>
export default {
    data() {
        return {
            inPage: 1
        }
    },
    methods: {
        toDailyLog() {
            this.inPage = 1;
            this.$router.push('/main')
        },
        logOut() {
            this.inPage = 0;
            this.$router.push('/')
        },
        toChatroom() {
            this.inPage = 1; //Leave room button will lead the user to Daily Log page
            this.$router.push('/chatroom')
        },
        toMiniGame() {
            this.inPage = 3;
            this.$router.push('/gameselection')
        },
    }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e7e7e7;
  background-color: #f3f3f3;
}

li {
  float: left;
}

li a {
  display: block;
  color: #666;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #ddd;
}

li a.active {
  color: white;
  background-color: #04AA6D;
}
</style>