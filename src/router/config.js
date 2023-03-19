import botData from "@/components/chatModel/botData.vue";
import unstandChat from "@/components/questionColletion/unstandChat.vue";
import questionNormal from "@/components/questionColletion/questionNormal.vue";
import tableShow from "@/components/tableShow.vue";
import botAction from "@/components/botActions/botAction.vue";
import NotFound from '../view/notfound/NotFound.vue'
import Center from "@/view/user/Center.vue";
const  routes = [
/*    {
        path:"/index",
        component:Home
    },*/
    {
        path:"/center",
        component:Center
    },
    {
        path:"/question/ylhub",
        component:botData,
        requireAdmin:false
    },
    {
        path:"/question/translate",
        component:unstandChat,
        requireAdmin:false
    },

    {
        path:"/question/stquestion",
        component:questionNormal
    },
    {
        path:"/question/qshub",
        component:tableShow
    },

/*    {
        path:"/product-manage/addproduct",
        component:ProductAdd
    },*/
    {
        path:"/bot/setup",
        component:botAction
    },
    {
        path:"/",
        redirect:"/index"
    },
    { 
        path:"/:pathMatch(.*)*",
        name:"Notfound",
        component:NotFound
    }
]

export default routes