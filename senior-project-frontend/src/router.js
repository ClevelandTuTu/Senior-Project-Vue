// router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import MainPage from './views/MainPage.vue';
import RegisterPage from './views/RegisterPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'login', component: LoginPage },
    { path: '/signup', name: 'signup', component: RegisterPage },
    { path: '/main', name: 'main', component: MainPage },
    // You can add more routes as needed
  ],
});

export default router;