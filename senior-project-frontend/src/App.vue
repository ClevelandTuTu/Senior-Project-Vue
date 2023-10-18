<template>
    <div>
        <!--
        <router-link to="/login">Go to Login</router-link>
        <router-link to="/main">Go to Main Page</router-link>
        -->
        <router-view></router-view>
    </div>
</template>

<script>
// import boostrap javascript -- Jing
import 'bootstrap/dist/js/bootstrap.js';
// import components starting from here -- Jing
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App'
}
</script>

<style>
/* import bootstrap css*/
@import 'bootstrap/dist/css/bootstrap.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
