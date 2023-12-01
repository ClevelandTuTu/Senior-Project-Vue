// router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import MainPage from './views/MainPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import ColoringBook from './views/ColoringBookPage.vue';
import ResetPage from './views/ResetPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'login', component: LoginPage },
    { path: '/signup', name: 'signup', component: RegisterPage },
    { path: '/resetpassword', name: 'resetpassword', component: ResetPage },
    { path: '/main', name: 'main', component: MainPage },
    { path: '/coloringbook', name: 'coloringbook', component: ColoringBook },
  ],
});

export default router;