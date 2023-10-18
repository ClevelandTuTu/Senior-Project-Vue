// router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import MainPage from './views/MainPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import ChatroomPage from './views/ChatroomPage.vue';
import SpinTheWheelPage from './views/SpinTheWheelPage.vue';
import ColoringBook from './views/ColoringBookPage.vue';
import GameSelection from './views/GameSelection.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'login', component: LoginPage },
    { path: '/signup', name: 'signup', component: RegisterPage },
    { path: '/main', name: 'main', component: MainPage },
    { path: '/chatroom', name: 'chatroom', component: ChatroomPage },
    { path: '/spinthewheel', name: 'spinthewheel', component: SpinTheWheelPage },
    { path: '/coloringbook', name: 'coloringbook', component: ColoringBook },
    { path: '/gameselection', name: 'gameselection', component: GameSelection },
  ],
});

export default router;