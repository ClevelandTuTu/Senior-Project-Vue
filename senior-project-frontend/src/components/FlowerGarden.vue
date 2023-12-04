<template>
<div class="body1">

    <div class="flower" v-for="(flower, index) in flowers" :key="index" @mouseenter="bloomFlower(index)" :class="{ bloomed: flowers[index] }">
    </div>
</div>
</template>
    
    
<script>
export default {
    data() {
        return {
        flowers: null,
        };
    },
    mounted() {
        this.flowers = Array.from({ length: 150 }, () => false);
    },
    methods: {
        bloomFlower(index) {
            this.flowers[index] = true;

            setTimeout(() => {
                this.flowers[index] = false;
            }, 3000);
        },
    },
};
</script>
    
<style scoped>
.body1 {
    margin: 0;
    overflow: hidden;
    background: url('../assets/garden.png') repeat;
    background-size: cover;
    height: 100vh;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
}

.flower {
    width: 100px;
    height: 100px;
    background-image: url('../assets/unbloomed-flower.png');
    background-size: cover;
    transition: background-image 0.3s ease-in-out;
}

.flower.bloomed {
    background-image: url('../assets/bloomed-flower.png');
}
</style>