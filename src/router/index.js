import { createRouter, createWebHashHistory } from "vue-router"

export const constantRoutes = [
    {
        path: '/',
        component: () => import('../components/login/loginPage.vue'),
    },
    {
        path: '/homePage',
        component: () => import('../components/Home/homePage.vue'),
    },
    {
        path: '/file',
        component: () => import('../components/fileUpdate.vue'),
    },
    {
        path: '/index',
        component: () => import('../components/Home/indexPage.vue'),
    },
    {
        path: '/table',
        component: () => import('../components/tableShow.vue'),
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})
export default router
