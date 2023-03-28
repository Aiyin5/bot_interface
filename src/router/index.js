import { createRouter, createWebHashHistory } from "vue-router"
/*import {useCounterStore} from "@/store/token.js"*/
import RoutesConfig from './config'
import store from '../store/index'
import botData from "@/components/chatModel/botData.vue";
import MainBox from "@/view/MainBox.vue";
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
        component: MainBox,
        children:[
            {
                path: '/index',
                component: botData,
            },
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
    if (to.name === "login" || to.name === "register" || to.name === "testimage") {
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
            component: MainBox
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
        return store.state.userInfo.bot_id!="0"
    }
    return true
}
export default router
