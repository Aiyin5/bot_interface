import botData from "@/components/chatModel/botData.vue";
import unstandChat from "@/components/questionColletion/unstandChat.vue";
import questionNormal from "@/components/questionColletion/questionNormal.vue";
import tableShow from "@/components/tableShow.vue";
import botAction from "@/components/botActions/botAction.vue";
import NotFound from '../view/notfound/NotFound.vue'
import Center from "@/view/user/Center.vue";
import userControl from "@/view/user/userControl.vue";
import lateUpdate from "@/view/lateUpdate/lateUpdate.vue";
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
        path:"/userControl",
        component:userControl
    },
    {
        path:"/question/ylhub",
        component:botData,
        requireAdmin:true
    },
    {
        path:"/question/translate",
        component:unstandChat,
        requireAdmin:true
    },

    {
        path:"/question/stquestion",
        component:questionNormal,
        requireAdmin:true
    },
    {
        path:"/question/qshub",
        component:tableShow,
        requireAdmin:true
    },

    {
        path:"/bot/other",
        component:lateUpdate,
        requireAdmin:true
    },
    {
        path:"/model/setup",
        component:lateUpdate,
        requireAdmin:true
    },
    {
        path:"/question/cmquestion",
        component:lateUpdate,
        requireAdmin:true
    },
    {
        path:"/bot/setup",
        component:botAction,
        requireAdmin:true
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