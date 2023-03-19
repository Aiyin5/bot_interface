<template>
    <el-container class="layout-container-demo">
      <el-header style="position:relative;text-align:center;align:center;vertical-align:middle;">
        <div style="position:relative;text-align:center;align:center;vertical-align:middle;margin-top: 20px">AMA_Bot Backend</div>
      </el-header>
        <el-container >
          <SideMenu class="el-aside"/>
            <el-main class="el-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import SideMenu from '../components/mainbox/SideMenu'
</script>

<style scoped>
.layout-container-demo .el-header {
  padding: 0;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  /*background: var(--el-color-primary-light-8);*/
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