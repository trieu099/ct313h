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
    {
        path: "/books",
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),
      },
      {
        path: "/accs",
        name: "acc.add",
        component: () => import("@/views/Register.vue"),
      },
      {
        path: "/customer",
        name: "cus.add",
        component: () => import("@/views/CusAdd.vue"),
      },
      {
        path: '/books/:bookCode',
        name: 'book.edit',
        component: () => import('@/views/BookEdit.vue'),
        props: (route) => ({ BookCode: route.params.bookCode })
    },
    {
        path: '/customer/:listId',
        name: 'cus.edit',
        component: () => import('@/views/CusEdit.vue'),
        props: (route) => ({ listId: route.params.listId })
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
      },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
},

);
export default router;