<template>
      <el-aside width="18%">
        <el-scrollbar>
          <el-menu class="el-menu"
                    :default-openeds="['/question']"
                   :collapse="false"
                   :router="true"
                   :default-active="route.fullPath">
            <el-sub-menu index="/question" >
              <template #title >
                <el-icon><message /></el-icon>问答更新
              </template>
              <el-menu-item index="/question/ylhub" >语料库</el-menu-item>
              <el-menu-item index="/question/translate" >非标问答转换</el-menu-item>
              <el-menu-item index="/question/stquestion" >标准问答</el-menu-item>
              <el-menu-item index="/question/cmquestion" >命令问答</el-menu-item>
              <el-menu-item index="/question/qshub" >问答库</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/model">
              <template #title>
                <el-icon><Edit  /></el-icon>模型相关
              </template>
              <el-menu-item index="/model/setup" >模型配置</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/bot">
              <template #title>
                <el-icon><setting /></el-icon>机器人控制
              </template>
              <el-menu-item index="/bot/setup" >机器人配置</el-menu-item>
              <el-menu-item index="/bot/other">其他</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/center">
              <el-icon>
                <avatar />
              </el-icon>
              <span>个人中心</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {useStore } from 'vuex'
const route = useRoute()
// console.log()
const store = useStore()
/*const vAdmin = {
  mounted(el){
    // console.log(el)
    if(store.state.userInfo.role!==1){
      el.parentNode.removeChild(el)
    }
  }
}*/
</script>


<style scoped>
.el-menu {
  border-right: none;
}
</style>
