<template>
  <el-container class="layout-container-demo" style="height: 120%">
    <el-header style="position:relative;text-align:center;align:center;vertical-align:middle;">
      <div style="position:relative;text-align:center;align:center;vertical-align:middle;margin-top: 20px">AMA_Bot Backend</div>
    </el-header>
    <el-container>
      <el-aside width="18%">
        <el-scrollbar>
          <el-menu :default-openeds="['1','2','3']" default-active="1-1">
            <el-sub-menu index="1" >
              <template #title >
                <el-icon><message /></el-icon>问答更新
              </template>
              <el-menu-item index="1-1" @click="clickQueN">标准问答</el-menu-item>
              <el-menu-item index="1-2" @click="clickQueU">非标问答</el-menu-item>
              <el-menu-item index="1-3" @click="clickQueC">命令问答</el-menu-item>
              <el-menu-item index="1-4" @click="clickQueAll">问答库</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Edit  /></el-icon>模型相关
              </template>
                <el-menu-item index="2-1" @click="clickModelSet">模型配置</el-menu-item>
                <el-menu-item index="2-2" @click="clickModelTrain">模型训练</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><setting /></el-icon>机器人控制
              </template>
              <el-menu-item index="3-1" @click="clickBotSet">机器人重启</el-menu-item>
              <el-menu-item index="3-2" @click="clickBotOther">其他</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
          <question-normal v-if="QueNShow"></question-normal>
          <table-show v-if="QueAllShow"></table-show>
          <unstand-chat v-if="QueUShow"></unstand-chat>
          <h v-if="!QueNShow && !QueAllShow && !QueUShow">"暂时没有"</h>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import TableShow from "@/components/tableShow.vue";
import {ref} from "vue";
import UnstandChat from "@/components/questionColletion/unstandChat.vue";
import QuestionNormal from "@/components/questionColletion/questionNormal.vue";
export default {
  mounted() {
    this.clickQueN();
  },
  components: {QuestionNormal, UnstandChat, TableShow,},
  computed: {
  },
  setup() {
    const QueNShow = ref(true)
    const QueUShow = ref(false)
    const QueCShow= ref(false)
    const QueAllShow= ref(false)
    const ModelSetShow= ref(false)
    const ModelTrainShow = ref(false)
    const BotSetShow = ref(false)
    const BotOtherShow= ref(false)
    function setAllfalse(){
      QueNShow.value=false;
      QueUShow.value=false;
      QueCShow.value=false;
      QueAllShow.value=false;
      ModelSetShow.value=false;
      ModelTrainShow.value=false;
      BotSetShow.value=false;
      BotOtherShow.value=false;
    }
    function clickQueN(){
      setAllfalse();
      QueNShow.value=true;
    }
    function clickQueU(){
      setAllfalse();
      QueUShow.value=true;
    }
    function  clickQueC(){
      setAllfalse();
      QueCShow.value=true;
    }
    function clickQueAll(){
      setAllfalse();
      QueAllShow.value=true;
    }
    function clickModelSet(){
      setAllfalse();
      ModelSetShow.value=true;
    }
    function clickModelTrain(){
      setAllfalse();
      ModelTrainShow.value=true;
    }
    function clickBotSet(){
      setAllfalse();
      BotSetShow.value=true;
    }
    function clickBotOther(){
      setAllfalse();
      BotOtherShow.value=true;
    }
    return {
      clickQueN,
      clickQueU,
      clickQueC,
      clickQueAll,
      clickModelSet,
      clickModelTrain,
      clickBotSet,
      clickBotOther,
      QueNShow,
      QueUShow,
      QueCShow,
      QueAllShow,
      ModelSetShow,
      ModelTrainShow,
      BotSetShow,
      setAllfalse,
      BotOtherShow,
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
