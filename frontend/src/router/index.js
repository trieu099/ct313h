import { createWebHistory, createRouter } from 'vue-router';
import Library from '@/views/Library.vue';
const routes = [
    {
        path: "/",
        name: "library",
        component: Library, //() => import("@/views/Register.vue"),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/Login.vue"),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("@/views/Register.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
},

);
export default router;