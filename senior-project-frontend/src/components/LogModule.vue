<template>
    <div class="row">
        <div class="col-2">
            <SideBar @openRecord="openRecord()" @openDailyLog="openDailyLog()" />
        </div>
        <div class="col-10">
            <DailyLog v-if="show == 'dailyLog'" />
            <DailyLogRecord v-else-if="show == 'dailyLogRecord'" />
        </div>
        
    </div>
</template>

<script>
import SideBar from "./SideBar.vue"
import DailyLog from "./DailyLog.vue";
import DailyLogRecord from "./DailyLogRecord.vue";

export default {
    name : 'LogModule',
    components: {
        SideBar,
        DailyLog,
        DailyLogRecord
    },
    data() {
        return {
            show: 'dailyLogRecord'
        }
    },
    methods: {
        openRecord() {
            this.show = 'dailyLogRecord'
        },
        openDailyLog() {
            this.show = 'dailyLog'
        }
    }
}
</script>