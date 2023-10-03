<template>
  <NavigationBar />
  <DailyLog />
</template>

<script>
// import boostrap javascript -- Jing
import 'bootstrap/dist/js/bootstrap.js';
// import components starting from here -- Jing
//import HelloWorld from './components/HelloWorld.vue'
import DailyLog from './components/DailyLog.vue'
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    DailyLog,
    NavigationBar
  }
}
</script>

<style>
/* import bootstrap css*/
@import 'bootstrap/dist/css/bootstrap.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
