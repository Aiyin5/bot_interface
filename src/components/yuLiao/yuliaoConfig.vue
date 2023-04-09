<template>
  <div>
    <el-checkbox v-model="qianZhi" label="前置拦截" size="large" />
    <el-checkbox v-model="oldYuliao" label="旧版本语料" size="large" />
    <el-checkbox v-model="usePdf" label="Pdf语料" size="large" />
    <el-checkbox v-model="useText" label="文本语料" size="large" />
    <el-checkbox v-model="useNotion" label="Notion语料" size="large" />
  </div>
  <el-button  @click="UpdteConfig" >
    更新
  </el-button>
</template>

<script>
import { ref } from 'vue'
import {useStore } from 'vuex'
import {ElMessage} from "element-plus";
import {botInfo, updateBotInfo} from "@/api";
export default {
  name: "yuliaoConfig",
  mounted() {
    this.getInfo();
  },
  setup() {
    const qianZhi = ref(true)
    const oldYuliao = ref(true)
    const usePdf = ref(true)
    const useText = ref(true)
    const useNotion= ref(true)
    const store = useStore()

    const UpdteConfig = async ()=>{
      let str="";
      str+=qianZhi.value?"1":"0";
      str+=oldYuliao.value?"1":"0";
      str+=usePdf.value?"1":"0";
      str+=useText.value?"1":"0";
      str+=useNotion.value?"1":"0";
      let data= {"data":{
          "status":str
        },
        "where":{
          "bot_id":store.state.userInfo.bot_id
        }}
      try {
        const response=await updateBotInfo(data);
        if(!response.data.ActionType===1){
          ElMessage.error('更新失败.请重试')
          return;
        }
        ElMessage.success("更新成功")
      }
      catch (err){
        ElMessage.error('更新失败.请重试')
      }
    }

    const getInfo= async ()=>{
      try {
        let res=await botInfo({"bot_id":store.state.userInfo.bot_id});
        if(!res.data.ActionType==="OK"){
          ElMessage("信息获取失败")
        }
        else {
          let items=res.data.data;
          let status = items.status;
          qianZhi.value=status.at(0)==="0"?false:true;
          oldYuliao.value=status.at(1)==="0"?false:true;
          usePdf.value=status.at(2)==="0"?false:true;
          useText.value=status.at(3)==="0"?false:true;
          useNotion.value=status.at(4)==="0"?false:true;
        }
      }
      catch (err){
        console.log(err)
      }
    }
    return {
      qianZhi,
      oldYuliao,
      usePdf,
      useText,
      useNotion,
      getInfo,
      UpdteConfig
    }
  }
}

</script>