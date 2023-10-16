<template>
    <NavigationBar />
    <LogModule />
</template>

<script>
import LogModule from '../components/LogModule.vue';
import NavigationBar from '../components/NavigationBar.vue';

export default {
    name: 'App',
    components: {
        LogModule,
        NavigationBar
    }
}
</script>