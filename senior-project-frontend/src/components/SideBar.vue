<template>
    <div @click="switchToRecord">
        <a href="#">Record</a>
    </div>
    <div @click="swtichToDailyLog">
        <a href="#">New DailyLog</a>
    </div>
    <div>
        <a href="#">Analysis (in progress)</a>
    </div>
</template>

<script>

export default {
    emits: ['openRecord', 'openDailyLog'],
    methods: {
        switchToRecord() {
            this.$router.push("./main")
        },
        swtichToDailyLog() {
            this.$router.push("./newdailylog")
        }
    }
}

</script>

<style scoped>
a {
    display: block;
    width: 200px;
    height: 50px;
    line-height: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    color: #000000;
    padding-left: 30px;
    text-decoration: none;
    text-indent: 2em;

}
a:hover {
    background-color: #ddd;
}
</style>