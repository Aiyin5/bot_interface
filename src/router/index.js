import { createRouter, createWebHashHistory } from "vue-router"
/*import {useCounterStore} from "@/store/token.js"*/
import RoutesConfig from './config'
import store from '../store/index'
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
        path: '/mainbox',
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

/*router.beforeEach((to,from,next)=>{
    if(to.matched.some(r=>r.meta?.requiresAuth)){
        const store = useCounterStore()
        console.log(store.token)
        if (!store.token.access_token)
        {
            next({ name:"login", query:{redirect: to.fullPath}})
        }
    }
    next()
})*/

router.beforeEach((to, from, next) => {
    if (to.name === "login") {
        next()
    } else {
        //如果授权(已经登录过了) next()
        //未授权, 重定向到login
        if (!localStorage.getItem("token")) {
            next({
                path: "/login"
            })
        } else {
            if (!store.state.isGetterRouter) {

                //删除所有的嵌套路由
                //mainbox
                router.removeRoute("mainbox")

                ConfigRouter()
                next({
                    path: to.fullPath
                })
            }else{
                next()
            }
        }
    }
})

const ConfigRouter = () => {

    if(!router.hasRoute("mainbox")){
        router.addRoute(  {
            path: "/mainbox",
            name: "mainbox",
            component: () => import('../components/Home/homePage.vue')
        })
    }

    RoutesConfig.forEach(item => {
        checkPermission(item) && router.addRoute("mainbox", item)
    })

    //改变isGetterRouter =  true

    store.commit("changeGetterRouter",true)
}

const checkPermission = (item)=>{
    if(item.requireAdmin){
        return store.state.userInfo.role===1
    }
    return true
}
export default router
