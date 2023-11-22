<template>
    <!--
    <div @click="switchToRecord">
        <a href="#">Record</a>
    </div>
    <div @click="swtichToDailyLog">
        <a href="#">New DailyLog</a>
    </div>
    <div>
        <a href="#">Analysis (in progress)</a>
    </div>
    -->
    <div>
        <el-col>
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
                <el-menu-item index="1">
                    <!--add icon here-->
                    <span class="mx-5" size="large" >Default</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <!--add icon here-->
                    <span class="mx-5" size="large" >Chart</span>
                </el-menu-item>
                <el-menu-item index="100">

                </el-menu-item>
            </el-menu>
        </el-col>
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
.el-menu {
      border-right: 0;
      width: 200px;
}
.el-menu-item {
    text-align: center;
}
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