<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
        <el-menu-item index="0"><b>Mindful Journey Website</b></el-menu-item>
        <div class="flex-grow" />
        <el-menu-item @click="toMoodLog" index="1">Mood Log</el-menu-item>
        <el-menu-item @click="toChatroom" index="2">Chat Room</el-menu-item>
        <el-sub-menu index="3">
        <template #title>Game Space</template>
        <el-menu-item @click="toSpinTheWheel" index="3-1">Spin The Wheel</el-menu-item>
        <el-menu-item @click="toColoringBook" index="3-2">Coloring Book</el-menu-item>
        <el-menu-item index="3-3">Game Three</el-menu-item>
        </el-sub-menu>
        <el-menu-item @click="toLogOut" index="4">Log Out</el-menu-item>
        <el-menu-item index="5">Credits</el-menu-item>
    </el-menu>
    <LogModule v-if="show == 1" />
    <ChatroomPublic v-else-if="show == 2" />
    <SpinTheWheel v-else-if="show == 3.1" />
    <ColoringBook v-else-if="show == 3.2" />
</template>

<script>
import LogModule from '../components/LogModule.vue';
//import NavigationBar from '../components/NavigationBar.vue';
import ChatroomPublic from '@/components/ChatroomPublic.vue';
import SpinTheWheel from '@/components/SpinTheWheel.vue';
import ColoringBook from '@/components/ColoringBook.vue';

export default {
    name: 'App',
    components: {
        LogModule,
        ChatroomPublic,
        SpinTheWheel,
        ColoringBook,
    },
    data() {
        return {
            show: 1
        }
    },
    methods: {
        toMoodLog() {
            this.show = 1;
        },
        toChatroom() {
            this.show = 2;
        },
        toSpinTheWheel() {
            this.show = 3.1;
        },
        toColoringBook() {
            this.show = 3.2;
        },
        toLogOut() {
            this.$router.push('/');
        }
    }
}
</script>

<style>
.flex-grow {
flex-grow: 1;
}
</style>