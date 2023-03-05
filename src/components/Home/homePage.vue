<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-header style="text-align: center; font-size: 18px">
      <div class="toolbar">
        <el-dropdown>
          <el-icon style="margin-right: 8px; margin-top: 1px"
          ><setting
          /></el-icon>
        </el-dropdown>
        <span>DisocordBot</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-openeds="['1','2','3']">
            <el-sub-menu index="1" >
              <template #title >
                <el-icon><message /></el-icon>消息和命令更新
              </template>
              <el-menu-item index="1-1"  @click="clickChangeT">前置拦截更新</el-menu-item>
              <el-menu-item index="1-2" @click="clickChangeC">命令更新</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Edit  /></el-icon>模型相关
              </template>
                <el-menu-item index="2-1" @click="clickChangeX">训练数据生成</el-menu-item>
                <el-menu-item index="2-2" @click="clickChangeM">非标问答</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><setting /></el-icon>机器人控制
              </template>
              <el-menu-item index="3-1" @click="clickChangeJ">机器人重启</el-menu-item>
              <el-menu-item index="3-2" @click="clickChangeO">其他</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
          <table-show v-if="tShow"></table-show>
          <hello-world v-if="hShow"></hello-world>
          <chat-Interaction v-if="XShow"></chat-Interaction>
          <unstand-chat v-if="FShow"></unstand-chat>
          <h v-if="OShow">"暂时没有"</h>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import TableShow from "@/components/tableShow.vue";
import HelloWorld from "@/components/fileUpdate.vue";
import {ref} from "vue";
import ChatInteraction from "@/components/chatModel/chatInteraction.vue";
import UnstandChat from "@/components/chatModel/unstandChat.vue";
export default {
  components: {UnstandChat, ChatInteraction, HelloWorld, TableShow,},
  computed: {
  },
  setup() {
    const tShow = ref(true)
    const hShow = ref(false)
    const OShow= ref(false)
    const XShow= ref(false)
    const FShow= ref(false)
    function clickChangeT(){
      tShow.value=true;
      hShow.value=false;
      OShow.value=false;
      XShow.value=false;
      FShow.value=false;
    }
    function clickChangeC(){
      tShow.value=false;
      hShow.value=true;
      OShow.value=false;
      XShow.value=false;
      FShow.value=false;
    }
    function clickChangeX(){
      tShow.value=false;
      hShow.value=false;
      OShow.value=false;
      XShow.value=true;
      FShow.value=false;
    }
    function clickChangeM(){
      tShow.value=false;
      hShow.value=false;
      OShow.value=false;
      XShow.value=false;
      FShow.value=true;
    }
    function clickChangeO(){
      tShow.value=false;
      hShow.value=false;
      OShow.value=true;
      XShow.value=false;
      FShow.value=false;
    }
    function clickChangeJ(){
      tShow.value=false;
      hShow.value=false;
      OShow.value=true;
      XShow.value=false;
      FShow.value=false;
    }
    return {
      clickChangeT,
      clickChangeO,
      clickChangeX,
      clickChangeC,
      clickChangeM,
      clickChangeJ,
      tShow,
      hShow,
      OShow,
      XShow,
      FShow,
    }
  }
}

</script>

<style scoped>
.layout-container-demo .el-header {
  padding: 0;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
