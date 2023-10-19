<template>
    <NavigationBar />
    <div class="row">
        <div class="col-2">
            <SideBar />
        </div>
        <div class="col-10">
            <DailyLog />
        </div>
        </div>
</template>

<script>
import DailyLog from '../components/DailyLog.vue';
import NavigationBar from '../components/NavigationBar.vue';
import SideBar from '../components/SideBar.vue';

export default {
    name: 'App',
    components: {
        DailyLog,
        NavigationBar,
        SideBar
    }
}
</script>