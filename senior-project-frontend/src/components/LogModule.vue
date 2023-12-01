<template>
    <el-row :gutter="0">
        <el-col :span="3">
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
                                <span>Mood Map</span>
                            </el-menu-item>
                            <el-menu-item @click="openMoodPie" index="2-3">
                                <font-awesome-icon icon="fa-solid fa-chart-pie" style="font-size: 1.7em; margin-right: 10px" />
                                <span>Mood Pie</span>
                            </el-menu-item>
                            <el-menu-item @click="openActivityMoodMap" index="2-2">
                                <font-awesome-icon icon="fa-solid fa-chart-column" style="font-size: 1.7em; margin-right: 10px" />
                                <span>Activity Map</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-col>
            </div>
        </el-col>
        <el-col :span="20">
            <DailyLogRecord v-if="show == 'dailyLogRecord'" />
            <MonthlyMood v-else-if="show == 'monthly mood'" />
            <MoodPie v-else-if="show == 'mood pie'" />
            <ActivityMap v-else-if="show == 'activity mood map'" />
        </el-col>
        
    </el-row>
</template>

<script>
import DailyLogRecord from "./DailyLogRecord.vue";
import MonthlyMood from "./MonthlyMood.vue";
import MoodPie from './MoodPie.vue';
import ActivityMap from "./ActivityMap.vue";
import { ElLoading } from 'element-plus';

export default {
    name : 'LogModule',
    components: {
        DailyLogRecord,
        MonthlyMood,
        MoodPie,
        ActivityMap,
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
        async openMoodPie() {
            await this.loadingItem('mood pie');
        },
        async openActivityMoodMap() {
            await this.loadingItem('activity mood map')
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