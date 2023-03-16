import { createRouter, createWebHashHistory } from "vue-router"
import {useCounterStore} from "@/store/token.js"
export const constantRoutes = [
    {
        path: '/register',
        name: 'register',
        component: () => import('../components/login/registerPage.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/login/loginPage.vue'),
    },
    {
        path: '/',
        meta:{requiresAuth:true},
        component: () => import('../components/Home/homePage.vue'),
        children:[
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
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

router.beforeEach((to,from,next)=>{
    if(to.matched.some(r=>r.meta?.requiresAuth)){
        const store = useCounterStore()
        console.log(store.token)
        if (!store.token.access_token)
        {
            next({ name:"login", query:{redirect: to.fullPath}})
        }
    }
    next()
})
export default router
