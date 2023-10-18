<template>
    <NavigationBar />
    <h2>Choose the mini game!</h2>
    <div class="game-selection">
      <div>
        <h3>1. Spin the wheel</h3>
        <img :src="imgUrl1" alt="spinthewheel mini game" />
        <br>
        <button @click="goToSpinthewheel()">Spin the wheel</button>
      </div>
      <hr>
      <div>
        <h3>2. Coloringbook</h3>
        <img :src="imgUrl2" alt="coloringbook mini game" />
        <br>
        <button @click="goToColoringbook()">Coloring book</button>
      </div>
    </div>
</template>
  
<script>
import NavigationBar from '../components/NavigationBar.vue';
export default {
    components: {
        NavigationBar
    },
    data() {
      return {
        imgUrl1:require('../assets/spinthewheel.png'),
        imgUrl2:require('../assets/coloringbook.png'),
      };
    },
    methods: {
        goToSpinthewheel() {
            this.$router.push('/spinthewheel')
        },
        goToColoringbook() {
            this.$router.push('/coloringbook')
        }
    },
};
</script>

<style scoped>
.game-selection {
    padding: 10px;
    margin: 10px;
}
</style>