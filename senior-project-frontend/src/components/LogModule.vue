<template>
    <el-row :gutter="0">
        <el-col :span="2">
            <div>
            <el-col>
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    style="margin-left: 10px;"
                >
                    <el-menu-item @click="openRecord" index="1">
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" style="font-size: 1.7em; margin-right: 15px" />
                        <template #title>Daily Log</template>
                    </el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass-chart" style="font-size: 1.7em; margin-right: 15px" />
                            <span>Analysis</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item @click="openMonthlyMood" index="2-1">
                                <font-awesome-icon icon="fa-solid fa-chart-line" style="font-size: 1.7em; margin-right: 10px" />
                                <span>Monthly Mood</span>
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <font-awesome-icon icon="fa-solid fa-chart-column" style="font-size: 1.7em; margin-right: 10px" />
                                <span>Histogram</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-col>
            </div>
        </el-col>
        <el-col :span="22">
            <DailyLogRecord v-if="show == 'dailyLogRecord'" />
            <ChartLibrary v-else-if="show == 'monthly mood'" />
        </el-col>
        
    </el-row>
</template>

<script>
//import SideBar from "./SideBar.vue"
//import DailyLog from "./DailyLog.vue";
import DailyLogRecord from "./DailyLogRecord.vue";
import ChartLibrary from "./ChartLibrary.vue";
import { ElLoading } from 'element-plus';

export default {
    name : 'LogModule',
    components: {
        DailyLogRecord,
        ChartLibrary
    },
    data() {
        return {
            show: 'dailyLogRecord'
        }
    },
    methods: {
        async openRecord() {
            await this.loadingItem('dailyLogRecord');
        },
        async openMonthlyMood() {
            await this.loadingItem('monthly mood');
        },
        async loadingItem(name) {
            const loadingInstance = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            setTimeout(() => {
                // 模拟加载完成后的操作
                this.show = name
                loadingInstance.close() // 关闭加载状态
            }, 2000)
        }
    }
}
</script>

<style scoped>
.el-menu {
    position: fixed;
    height: 100%;
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