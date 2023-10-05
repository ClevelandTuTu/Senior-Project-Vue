<template>
    <div class="row">
        <div class="col-1">
            <SideBar />
        </div>
        <div class="col-11">
            <DailyLog />
        </div>
        
    </div>
</template>

<script>
import SideBar from "./SideBar.vue"
import DailyLog from "./DailyLog.vue";

export default {
    name : 'LogModule',
    components: {
        SideBar,
        DailyLog
    }
}
</script>