<template>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            style="position: relative;"
            mode="horizontal"
            @select="handleSelect"
            v-if="show != 2"
        >
            <el-menu-item index="0"><b>Mindful Journey Website</b></el-menu-item>
            <div class="flex-grow" />
            <el-menu-item @click="toMoodLog" index="1">Mood Log</el-menu-item>
            <el-menu-item @click="toChatroom" index="2">Chat Room</el-menu-item>
            <el-sub-menu index="3">
            <template #title>Game Space</template>
            <el-menu-item @click="toSpinTheWheel" index="3-1">Spin The Wheel</el-menu-item>
            <el-menu-item @click="toColoringBook" index="3-2">Coloring Book</el-menu-item>
            <el-menu-item @click="toFlowerGarden" index="3-3">Flower Garden</el-menu-item>
            </el-sub-menu>
            <el-menu-item @click="toLogOut" index="4">Log Out</el-menu-item>
            <el-menu-item index="5">New Feature Developing</el-menu-item>
        </el-menu>
    <div>
        <LogModule v-if="show == 1" />
        <ChatroomPublic v-else-if="show == 2" @leaveRoom="toMoodLog" />
        <SpinTheWheel v-else-if="show == 3.1" />
        <ColoringBook v-else-if="show == 3.2" />
        <FlowerGarden v-else-if="show == 3.3" />
        
    </div>
</template>

<script>
import LogModule from '../components/LogModule.vue';
//import NavigationBar from '../components/NavigationBar.vue';
import ChatroomPublic from '@/components/ChatroomPublic.vue';
import SpinTheWheel from '@/components/SpinTheWheel.vue';
import ColoringBook from '@/components/ColoringBook.vue';
import FlowerGarden from '@/components/FlowerGarden.vue';

export default {
    name: 'App',
    components: {
        LogModule,
        ChatroomPublic,
        SpinTheWheel,
        ColoringBook,
        FlowerGarden,
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
        toFlowerGarden() {
            this.show = 3.3;
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